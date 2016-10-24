/*
 #
 #  File        : inpaint.h
 #                ( C++ header file - CImg plug-in )
 #
 #  Copyright   : David Tschumperlé
 #
 #  License     : CeCILL v2.0
 #                ( http://www.cecill.info/licences/Licence_CeCILL_V2-en.html )
 #
 # Description  :
 #
 # This plug-in implements the patch-based inpainting algorithm for 2d images, as
 # described in the two following publications :
 #
 # "A Smarter Examplar-based Inpainting Algorithm using Local and Global Heuristics
 #  for more Geometric Coherence."
 # (M. Daisy, P. Buyssens, D. Tschumperlé, O. Lezoray).
 # IEEE International Conference on Image Processing (ICIP'14), Paris/France, Oct. 2014
 #
 # and
 #
 # "A Fast Spatial Patch Blending Algorithm for Artefact Reduction in Pattern-based
 #  Image Inpainting."
 # (M. Daisy, D. Tschumperlé, O. Lezoray).
 # SIGGRAPH Asia 2013 Technical Briefs, Hong-Kong, November 2013.
 #
 #  This software is governed by the CeCILL  license under French law and
 #  abiding by the rules of distribution of free software.  You can  use,
 #  modify and/ or redistribute the software under the terms of the CeCILL
 #  license as circulated by CEA, CNRS and INRIA at the following URL
 #  "http://www.cecill.info".
 #
 #  As a counterpart to the access to the source code and  rights to copy,
 #  modify and redistribute granted by the license, users are provided only
 #  with a limited warranty  and the software's author,  the holder of the
 #  economic rights,  and the successive licensors  have only  limited
 #  liability.
 #
 #  In this respect, the user's attention is drawn to the risks associated
 #  with loading,  using,  modifying and/or developing or reproducing the
 #  software by the user in light of its specific status of free software,
 #  that may mean  that it is complicated to manipulate,  and  that  also
 #  therefore means  that it is reserved for developers  and  experienced
 #  professionals having in-depth computer knowledge. Users are therefore
 #  encouraged to load and test the software's suitability as regards their
 #  requirements in conditions enabling the security of their systems and/or
 #  data to be ensured and,  more generally, to use and operate it in the
 #  same conditions as regards security.
 #
 #  The fact that you are presently reading this means that you have had
 #  knowledge of the CeCILL license and that you accept its terms.
 #
*/
#ifndef cimg_plugin_inpaint
#define cimg_plugin_inpaint

template<typename t>
CImg<T>& inpaint_patch(const CImg<t>& mask, const unsigned int patch_size=11,
                       const unsigned int lookup_size=22, const float lookup_factor=1,
                       const int lookup_increment=1,
                       const unsigned int blend_size=0, const float blend_threshold=0.5f,
                       const float blend_decay=0.02, const unsigned int blend_scales=10,
                       const bool is_blend_outer=false) {
  if (depth()>1)
    throw CImgInstanceException(_cimg_instance
                                "inpaint_patch(): Instance image is volumetric (should be 2d).",
                                cimg_instance);
  if (!is_sameXYZ(mask))
    throw CImgArgumentException(_cimg_instance
                                "inpaint_patch() : Sizes of instance image and specified mask "
                                "(%u,%u,%u,%u) do not match.",
                                cimg_instance,
                                mask._width,mask._height,mask._depth,mask._spectrum);
  if (!patch_size)
    throw CImgArgumentException(_cimg_instance
                                "inpaint_patch() : Specified patch size is 0, must be strictly "
                                "positive.",
                                cimg_instance);
  if (!lookup_size)
    throw CImgArgumentException(_cimg_instance
                                "inpaint_patch() : Specified lookup size is 0, must be strictly "
                                "positive.",
                                cimg_instance);
  if (lookup_factor<0)
    throw CImgArgumentException(_cimg_instance
                                "inpaint_patch() : Specified lookup factor %g is negative, must be "
                                "positive.",
                                cimg_instance,
                                lookup_factor);
  if (!lookup_increment)
    throw CImgArgumentException(_cimg_instance
                                "inpaint_patch() : Specified lookup increment is 0, must be "
                                "strictly positive.",
                                cimg_instance);
  if (blend_decay<0)
    throw CImgArgumentException(_cimg_instance
                                "inpaint_patch() : Specified blend decay %g is negative, must be "
                                "positive.",
                                cimg_instance,
                                blend_decay);

  // Find (dilated by 2) bounding box for the inpainting mask.
  unsigned int xm0 = _width, ym0 = _height, xm1 = 0, ym1 = 0;
  bool is_mask_found = false;
  cimg_forXY(mask,x,y) if (mask(x,y)) {
    is_mask_found = true;
    if (x<(int)xm0) xm0 = (unsigned int)x;
    if (x>(int)xm1) xm1 = (unsigned int)x;
    if (y<(int)ym0) ym0 = (unsigned int)y;
    if (y>(int)ym1) ym1 = (unsigned int)y;
  }
  if (!is_mask_found) return *this;
  xm0 = xm0>2?xm0 - 2:0;
  ym0 = ym0>2?ym0 - 2:0;
  xm1 = xm1<_width - 3?xm1 + 2:_width - 1;
  ym1 = ym1<_height - 3?ym1 + 2:_height - 1;
  int ox = xm0, oy = ym0;
  unsigned int dx = xm1 - xm0 + 1U, dy = ym1 - ym0 + 1U;

  // Construct normalized version of the mask.
  CImg<ucharT> nmask(dx,dy);
  unsigned char *ptrM = nmask.data();
  cimg_for_inXY(mask,xm0,ym0,xm1,ym1,x,y) *(ptrM++) = mask(x,y)?0:1;
  xm0 = ym0 = 0; xm1 = dx - 1; ym1 = dy - 1;

  // Start patch filling algorithm.
  const int p2 = (int)patch_size/2, p1 = (int)patch_size - p2 - 1;
  const unsigned int patch_size2 = patch_size*patch_size;
  unsigned int _lookup_size = lookup_size, nb_lookups = 0, nb_fails = 0, nb_saved_patches = 0;
  bool is_strict_search = true;
  const float one = 1;

  CImg<floatT> confidences(nmask), priorities(dx,dy,1,2,-1), pC;
  CImg<unsigned int> saved_patches(4,256), is_visited(width(),height(),1,1,0);
  CImg<ucharT> pM, pN;  // Pre-declare patch variables (avoid iterative memory alloc/dealloc).
  CImg<T> pP, pbest;
  CImg<floatT> weights(patch_size,patch_size,1,1,0);
  weights.draw_gaussian((float)p1,(float)p1,patch_size/15.0f,&one)/=patch_size2;
  unsigned int target_index = 0;

  while (true) {

    // Extract mask border points and compute priorities to find target point.
    unsigned int nb_border_points = 0;
    float target_confidence = -1, target_priority = -1;
    int target_x = -1, target_y = -1;
    CImg_5x5(M,unsigned char);

    cimg_for_in5x5(nmask,xm0,ym0,xm1,ym1,x,y,0,0,M,unsigned char)
      if (!Mcc && (Mcp || Mcn || Mpc || Mnc)) { // Found mask border point.

        float confidence_term = -1, data_term = -1;
        if (priorities(x,y)>=0) { // If priority has already been computed.
          confidence_term = priorities(x,y,0);
          data_term = priorities(x,y,1);
        } else { // If priority must be computed/updated.

          // Compute smoothed normal vector.
          const float
            // N = smoothed 3x3 neighborhood of M.
            Npc = (4.0f*Mpc + 2.0f*Mbc + 2.0f*Mcc + 2.0f*Mpp + 2.0f*Mpn + Mbp + Mbn + Mcp + Mcn)/16,
            Nnc = (4.0f*Mnc + 2.0f*Mac + 2.0f*Mcc + 2.0f*Mnp + 2.0f*Mnn + Map + Man + Mcp + Mcn)/16,
            Ncp = (4.0f*Mcp + 2.0f*Mcb + 2.0f*Mcc + 2.0f*Mpp + 2.0f*Mnp + Mpb + Mnb + Mpc + Mnc)/16,
            Ncn = (4.0f*Mcn + 2.0f*Mca + 2.0f*Mcc + 2.0f*Mpn + 2.0f*Mnn + Mpa + Mna + Mpc + Mnc)/16,
            _nx = 0.5f*(Nnc - Npc),
            _ny = 0.5f*(Ncn - Ncp),
            nn = std::sqrt(1e-8f + _nx*_nx + _ny*_ny),
            nx = _nx/nn,
            ny = _ny/nn;

          // Compute confidence term.
          nmask._inpaint_patch_crop(x - p1,y - p1,x + p2,y + p2,1).move_to(pM);
          confidences._inpaint_patch_crop(x - p1,y - p1,x + p2,y + p2,1).move_to(pC);
          confidence_term = 0;
          const unsigned char *ptrM = pM.data();
          cimg_for(pC,ptrC,float) confidence_term+=*ptrC**(ptrM++);
          confidence_term/=patch_size2;
          priorities(x,y,0) = confidence_term;

          // Compute data term.
          _inpaint_patch_crop(ox + x - p1,oy + y - p1,ox + x + p2,oy + y + p2,2).move_to(pP);
          float mean_ix2 = 0, mean_ixiy = 0, mean_iy2 = 0;

          CImg_3x3(I,T);
          CImg_3x3(_M, unsigned char);
          cimg_forC(pP,c) cimg_for3x3(pP,p,q,0,c,I,T) {
            // Compute weight-mean of structure tensor inside patch.
            cimg_get3x3(pM,p,q,0,0,_M,unsigned char);
            const float
              ixf = (float)(_Mnc*_Mcc*(Inc - Icc)),
              iyf = (float)(_Mcn*_Mcc*(Icn - Icc)),
              ixb = (float)(_Mcc*_Mpc*(Icc - Ipc)),
              iyb = (float)(_Mcc*_Mcp*(Icc - Icp)),
              ix = cimg::abs(ixf)>cimg::abs(ixb)?ixf:ixb,
              iy = cimg::abs(iyf)>cimg::abs(iyb)?iyf:iyb,
              w = weights(p,q);
            mean_ix2 += w*ix*ix;
            mean_ixiy += w*ix*iy;
            mean_iy2 += w*iy*iy;
          }
          const float // Compute tensor-directed data term.
            ux = mean_ix2*(-ny) + mean_ixiy*nx,
            uy = mean_ixiy*(-ny) + mean_iy2*nx;
          data_term = std::sqrt(ux*ux + uy*uy);
          priorities(x,y,1) = data_term;
        }
        const float priority = confidence_term*data_term;
        if (priority>target_priority) {
          target_priority = priority; target_confidence = confidence_term;
          target_x = ox + x; target_y = oy + y;
        }
        ++nb_border_points;
      }
    if (!nb_border_points) break; // No more mask border points to inpaint!

    // Locate already reconstructed neighbors (if any), to get good origins for patch lookup.
    CImg<unsigned int> lookup_candidates(2,256);
    unsigned int nb_lookup_candidates = 0, *ptr_lookup_candidates = lookup_candidates.data();
    const unsigned int *ptr_saved_patches = saved_patches.data();
    const int
      x0 = target_x - (int)patch_size, y0 = target_y - (int)patch_size,
      x1 = target_x + (int)patch_size, y1 = target_y + (int)patch_size;
    for (unsigned int k = 0; k<nb_saved_patches; ++k) {
      const unsigned int
        src_x = *(ptr_saved_patches++), src_y = *(ptr_saved_patches++),
        dest_x = *(ptr_saved_patches++), dest_y = *(ptr_saved_patches++);
      if ((int)dest_x>=x0 && (int)dest_y>=y0 && (int)dest_x<=x1 && (int)dest_y<=y1) {
        const int off_x = target_x - dest_x, off_y = target_y - dest_y;
        *(ptr_lookup_candidates++) = src_x + off_x;
        *(ptr_lookup_candidates++) = src_y + off_y;
        if (++nb_lookup_candidates>=lookup_candidates._height)
          lookup_candidates.resize(2,-200,1,1,0);
      }
    }
    // Add also target point as a center for the patch lookup.
    *(ptr_lookup_candidates++) = target_x;
    *(ptr_lookup_candidates++) = target_y;
    ++nb_lookup_candidates;

    // Divide size of lookup regions if several lookup sources have been detected.
    unsigned int final_lookup_size = _lookup_size;
    if (nb_lookup_candidates>1) {
      const unsigned int
        _final_lookup_size = (unsigned int)cimg::round(_lookup_size*lookup_factor/
                                                       std::sqrt((float)nb_lookup_candidates),1,1);
      final_lookup_size = _final_lookup_size + 1 - (_final_lookup_size%2);
    }
    const int l2 = (int)final_lookup_size/2, l1 = (int)final_lookup_size - l2 - 1;

#ifdef gmic_debug
    CImg<ucharT> visu(*this,false);
    for (unsigned int C = 0; C<nb_lookup_candidates; ++C) {
      const int
        xl = lookup_candidates(0,C),
        yl = lookup_candidates(1,C);
      visu.draw_rectangle(xl - l1,yl - l1,xl + l2,yl + l2,CImg<ucharT>::vector(0,255,0).data(),0.2f);
    }
    visu.draw_rectangle(target_x - p1,target_y - p1,target_x + p2,target_y + p2,
                        CImg<ucharT>::vector(255,0,0).data(),0.5f);
    static int foo = 0;
    if (!(foo%1)) {
      //      visu.save("video.ppm",foo);
      static CImgDisplay disp_debug;
      disp_debug.display(visu).set_title("DEBUG");
    }
    ++foo;
#endif // #ifdef gmic_debug

    // Find best patch candidate to fill target point.
    _inpaint_patch_crop(target_x - p1,target_y - p1,target_x + p2,target_y + p2,0).move_to(pP);
    nmask._inpaint_patch_crop(target_x - ox - p1,target_y - oy - p1,target_x - ox + p2,target_y - oy  + p2,0).
      move_to(pM);
    ++target_index;
    const unsigned int
      _lookup_increment = (unsigned int)(lookup_increment>0?lookup_increment:
                                         nb_lookup_candidates>1?1:-lookup_increment);
    float best_ssd = cimg::type<float>::max();
    int best_x = -1, best_y = -1;
    for (unsigned int C = 0; C<nb_lookup_candidates; ++C) {
      const int
        xl = (int)lookup_candidates(0,C),
        yl = (int)lookup_candidates(1,C),
        x0 = cimg::max(p1,xl - l1), y0 = cimg::max(p1,yl - l1),
        x1 = cimg::min(width() - 1 - p2,xl + l2), y1 = cimg::min(height() - 1 - p2,yl + l2);
      for (int y = y0; y<=y1; y+=_lookup_increment)
        for (int x = x0; x<=x1; x+=_lookup_increment) if (is_visited(x,y)!=target_index) {
            if (is_strict_search) mask._inpaint_patch_crop(x - p1,y - p1,x + p2,y + p2,1).move_to(pN);
            else nmask._inpaint_patch_crop(x - ox - p1,y - oy - p1,x - ox + p2,y - oy + p2,0).move_to(pN);
            if ((is_strict_search && pN.sum()==0) || (!is_strict_search && pN.sum()==patch_size2)) {
              _inpaint_patch_crop(x - p1,y - p1,x + p2,y + p2,0).move_to(pC);
              float ssd = 0;
              const T *_pP = pP._data;
              const float *_pC = pC._data;
              cimg_for(pM,_pM,unsigned char) { if (*_pM) {
                  cimg_forC(pC,c) {
                    ssd+=cimg::sqr((Tfloat)*_pC - (Tfloat)*_pP); _pC+=patch_size2; _pP+=patch_size2;
                  }
                  if (ssd>=best_ssd) break;
                  _pC-=pC._spectrum*patch_size2;
                  _pP-=pC._spectrum*patch_size2;
                }
                ++_pC; ++_pP;
              }
              if (ssd<best_ssd) { best_ssd = ssd; best_x = x; best_y = y; }
            }
            is_visited(x,y) = target_index;
          }
    }

    if (best_x<0) { // If no best patch found.
      priorities(target_x - ox,target_y - oy,0)/=10; // Reduce its priority (lower data_term).
      if (++nb_fails>=4) { // If too much consecutive fails :
        nb_fails = 0;
        _lookup_size+=_lookup_size/2; // Try to expand the lookup size.
        if (++nb_lookups>=3) {
          if (is_strict_search) { // If still fails, switch to non-strict search mode.
            is_strict_search = false;
            _lookup_size = lookup_size;
            nb_lookups = 0;
          }
          else return *this; // Pathological case, probably a weird mask.
        }
      }
    } else { // Best patch found -> reconstruct missing part on the target patch.
      _lookup_size = lookup_size;
      nb_lookups = nb_fails = 0;
      _inpaint_patch_crop(best_x - p1,best_y - p1,best_x + p2,best_y + p2,0).move_to(pbest);
      nmask._inpaint_patch_crop(target_x - ox - p1,target_y - oy - p1,target_x - ox + p2,target_y - oy + p2,1).
        move_to(pM);
      cimg_for(pM,ptr,unsigned char) *ptr=1 - *ptr;
      draw_image(target_x - p1,target_y - p1,pbest,pM,1,1);
      confidences.draw_image(target_x - ox - p1,target_y - oy - p1,pC.fill(target_confidence),pM,1,1);
      nmask.draw_rectangle(target_x - ox - p1,target_y - oy - p1,0,0,target_x - ox + p2,target_y - oy + p2,0,0,1);
      priorities.draw_rectangle(target_x - ox - (int)patch_size,
                                target_y - oy - (int)patch_size,0,0,
                                target_x - ox + 3*p2/2,
                                target_y - oy + 3*p2/2,0,0,-1);
      // Remember patch positions.
      unsigned int *ptr_saved_patches = saved_patches.data(0,nb_saved_patches);
      *(ptr_saved_patches++) = best_x;
      *(ptr_saved_patches++) = best_y;
      *(ptr_saved_patches++) = target_x;
      *ptr_saved_patches = target_y;
      if (++nb_saved_patches>=saved_patches._height) saved_patches.resize(4,-200,1,1,0);
    }
  }
  nmask.assign();  // Free some unused memory resources.
  priorities.assign();
  confidences.assign();
  is_visited.assign();

  // Blend inpainting result (if requested), using multi-scale blending algorithm.
  if (blend_size && blend_scales) {
    const float _blend_threshold = cimg::max(0.0f,cimg::min(1.0f,blend_threshold));
    saved_patches._height = nb_saved_patches;

    // Re-crop image and mask if outer blending is activated.
    if (is_blend_outer) {
      const int
        b2 = (int)blend_size/2, b1 = (int)blend_size - b2 - 1,
        xb0 = cimg::max(0,ox - b1),
        yb0 = cimg::max(0,oy - b1),
        xb1 = cimg::min(_width - 1,xb0 + dx + b1 + b2),
        yb1 = cimg::min(_height - 1,yb0 + dy + b1 + b2);
      ox = xb0; oy = yb0; dx = xb1 - xb0 + 1U, dy = yb1 - yb0 + 1U;
    }

    // Generate map of source offsets.
    CImg<unsigned int> offsets(dx,dy,1,2);
    unsigned int *ptr = saved_patches.end();
    cimg_forY(saved_patches,i) {
      const unsigned int yd = *(--ptr), xd = *(--ptr), ys = *(--ptr), xs = *(--ptr);
      for (int l = -p1; l<=p2; ++l)
        for (int k = -p1; k<=p2; ++k) {
          const int xdk = xd + k, ydl = yd + l;
          if (xdk>=0 && xdk<=width() - 1 && ydl>=0 && ydl<=height() - 1 && mask(xd + k,yd + l)) {
            offsets(xd - ox + k,yd - oy + l,0) = xs + k;
            offsets(xd - ox + k,yd - oy + l,1) = ys + l;
          }
        }
    }
    unsigned int *ptrx = offsets.data(0,0,0,0), *ptry = offsets.data(0,0,0,1);
    cimg_forXY(offsets,x,y) {
      if (!mask(x + ox,y + oy)) { *ptrx = x + ox; *ptry = y + oy; }
      ++ptrx; ++ptry;
    }

    // Generate map of local blending amplitudes.
    CImg<floatT> blend_map(dx,dy,1,1,0);
    CImg_3x3(I,float);
    cimg_for3XY(offsets,x,y) if (mask(x + ox,y + oy)) {
      const float
        iox = cimg::max((float)offsets(_n1x,y,0) - offsets(x,y,0),
                        (float)offsets(x,y,0) - offsets(_p1x,y,0)),
        ioy = cimg::max((float)offsets(x,_n1y,1) - offsets(x,y,1),
                        (float)offsets(x,y,1) - offsets(x,_p1y,1)),
        ion = std::sqrt(iox*iox + ioy*ioy);
      float iin = 0;
      cimg_forC(*this,c) {
        cimg_get3x3(*this,x,y,0,c,I,float);
        const float
          iix = (float)cimg::max(Inc - Icc,Icc - Ipc),
          iiy = (float)cimg::max(Icn - Icc,Icc - Icp);
        iin+=std::log(1 + iix*iix + iiy*iiy);
      }
      iin/=_spectrum;
      blend_map(x,y) = ion*iin;
    }
    blend_map.threshold(blend_map.max()*_blend_threshold).distance(1);
    cimg_forXY(blend_map,x,y) blend_map(x,y) = 1/(1 + blend_decay*blend_map(x,y));
    blend_map.quantize(blend_scales + 1,false);
    float bm, bM = blend_map.max_min(bm);
    if (bm==bM) blend_map.fill((float)blend_scales);

    // Generate blending scales.
    CImg<T> result = _inpaint_patch_crop(ox,oy,ox + dx - 1,oy + dy - 1,0);
    for (unsigned int blend_iter = 1; blend_iter<=blend_scales; ++blend_iter) {
      const unsigned int
        _blend_width = blend_iter*blend_size/blend_scales,
        blend_width = _blend_width?_blend_width + 1 - (_blend_width%2):0;
      if (!blend_width) continue;
      const int b2 = (int)blend_width/2, b1 = (int)blend_width - b2 - 1;
      CImg<floatT>
        blended = _inpaint_patch_crop(ox,oy,ox + dx - 1,oy + dy - 1,0),
        cumul(dx,dy,1,1);
      weights.assign(blend_width,blend_width,1,1,0).
        draw_gaussian((float)b1,(float)b1,blend_width/4.0f,&one);
      cimg_forXY(cumul,x,y) cumul(x,y) = mask(x + ox,y + oy)?0.0f:1.0f;
      blended.mul(cumul);

      cimg_forY(saved_patches,l) {
        const unsigned int *ptr = saved_patches.data(0,l);
        const int
          xs = (int)*(ptr++),
          ys = (int)*(ptr++),
          xd = (int)*(ptr++),
          yd = (int)*(ptr++);
        if (xs - b1<0 || ys - b1<0 || xs + b2>=width() || ys + b2>=height()) { // Blend with partial patch.
          const int
            xs0 = cimg::max(0,xs - b1),
            ys0 = cimg::max(0,ys - b1),
            xs1 = cimg::min(width() - 1,xs + b2),
            ys1 = cimg::min(height() - 1,ys + b2);
          _inpaint_patch_crop(xs0,ys0,xs1,ys1,0).move_to(pP);
          weights._inpaint_patch_crop(xs0 - xs + b1,ys0 - ys + b1,xs1 - xs + b1,ys1 - ys + b1,0).move_to(pC);
          blended.draw_image(xd + xs0 - xs - ox,yd + ys0 - ys - oy,pP,pC,-1);
          cumul.draw_image(xd + xs0 - xs - ox,yd + ys0 - ys - oy,pC,-1);
        } else { // Blend with full-size patch.
          _inpaint_patch_crop(xs - b1,ys - b1,xs + b2,ys + b2,0).move_to(pP);
          blended.draw_image(xd - b1 - ox,yd - b1 - oy,pP,weights,-1);
          cumul.draw_image(xd - b1 - ox,yd - b1 - oy,weights,-1);
        }
      }

      if (is_blend_outer) {
        cimg_forXY(blended,x,y) if (blend_map(x,y)==blend_iter) {
          const float cum = cumul(x,y);
          if (cum>0) cimg_forC(*this,c) result(x,y,c) = (T)(blended(x,y,c)/cum);
        }
      } else { cimg_forXY(blended,x,y) if (mask(x + ox,y + oy) && blend_map(x,y)==blend_iter) {
          const float cum = cumul(x,y);
          if (cum>0) cimg_forC(*this,c) result(x,y,c) = (T)(blended(x,y,c)/cum);
        }
      }
    }
    if (is_blend_outer) draw_image(ox,oy,result);
    else cimg_forXY(result,x,y) if (mask(x + ox,y + oy))
           cimg_forC(*this,c) (*this)(x + ox,y + oy,c) = (T)result(x,y,c);
  }
  return *this;
}

// Special crop function that supports more boundary conditions :
// 0=dirichlet (with value 0), 1=dirichlet (with value 1) and 2=neumann.
CImg<T> _inpaint_patch_crop(const int x0, const int y0, const int x1, const int y1,
                            const unsigned int boundary=0) const {
  const int
    nx0 = x0<x1?x0:x1, nx1 = x0^x1^nx0,
    ny0 = y0<y1?y0:y1, ny1 = y0^y1^ny0;
  CImg<T> res(1U + nx1 - nx0,1U + ny1 - ny0,1,_spectrum);
  if (nx0<0 || nx1>=width() || ny0<0 || ny1>=height()) {
    if (boundary>=2) cimg_forXYZC(res,x,y,z,c) res(x,y,z,c) = _atXY(nx0 + x,ny0 + y,z,c);
    else res.fill((T)boundary).draw_image(-nx0,-ny0,*this);
  } else res.draw_image(-nx0,-ny0,*this);
  return res;
}

template<typename t>
CImg<T> get_inpaint_patch(const CImg<t>& mask, const unsigned int patch_size=11,
                          const unsigned int lookup_size=22, const float lookup_factor=1,
                          const int lookup_increment=1,
                          const unsigned int blend_size=0, const float blend_threshold=0.5,
                          const float blend_decay=0.02f, const unsigned int blend_scales=10,
                          const bool is_blend_outer=false) const {
  return (+*this).inpaint_patch(mask,patch_size,lookup_size,lookup_factor,lookup_increment,
                                blend_size,blend_threshold,blend_decay,blend_scales,is_blend_outer);
}

#endif /* cimg_plugin_inpaint */
