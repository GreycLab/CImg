/*
 #
 #  File        : bayer.h
 #                ( C++ header file - CImg plug-in )
 #
 #  Description : CImg plugin that implements the conversion of a color image to a
 #                Bayer-coded matrix, and its reverse transform.
 #
 #  Copyright   : David Tschumperlé
 #                ( https://tschumperle.users.greyc.fr/ )
 #
 #  This software is governed by the CeCILL license under French law and
 #  abiding by the rules of distribution of free software. You can use,
 #  modify and/or redistribute the software under the terms of the CeCILL
 #  license as circulated by CEA, CNRS and INRIA at the following URL
 #  "http://www.cecill.info".
 #
 #  As a counterpart to the access to the source code and rights to copy,
 #  modify and redistribute granted by the license, users are provided only
 #  with a limited warranty and the software's author, the holder of the
 #  economic rights, and the successive licensors have only limited
 #  liability.
 #
 #  In this respect, the user's attention is drawn to the risks associated
 #  with loading, using, modifying and/or developing or reproducing the
 #  software by the user in light of its specific status of free software,
 #  that may mean that it is complicated to manipulate, and that also
 #  therefore means that it is reserved for developers and experienced
 #  professionals having in-depth computer knowledge. Users are therefore
 #  encouraged to load and test the software's suitability as regards their
 #  requirements in conditions enabling the security of their systems and/or
 #  data to be ensured and, more generally, to use and operate it in the
 #  same conditions as regards security.
 #
 #  The fact that you are presently reading this means that you have had
 #  knowledge of the CeCILL license and that you accept its terms.
 #
*/
#ifndef cimg_plugin_bayer
#define cimg_plugin_bayer

//! Convert RGB color image to a Bayer-coded scalar image.
/**
   \note First (upper-left) pixel if the red component of the pixel color.
**/
CImg<T>& RGBtoBayer() {
  return get_RGBtoBayer().move_to(*this);
}

//! Convert RGB color image to a Bayer-coded scalar image \newinstance.
CImg<T> get_RGBtoBayer() const {
  if (_spectrum!=3)
    throw CImgInstanceException(_cimg_instance
                                "RGBtoBayer(): Instance is not a RGB image.",
                                cimg_instance);

  CImg<T> res(_width,_height,_depth,1);
  const T *ptr_r = data(0,0,0,0), *ptr_g = data(0,0,0,1), *ptr_b = data(0,0,0,2);
  T *ptrd = res._data;
  cimg_forXYZ(*this,x,y,z) {
    if (y%2) {
      if (x%2) *(ptrd++) = *ptr_b;
      else *(ptrd++) = *ptr_g;
    } else {
      if (x%2) *(ptrd++) = *ptr_g;
      else *(ptrd++) = *ptr_r;
    }
    ++ptr_r; ++ptr_g; ++ptr_b;
  }
  return res;
}

//! Convert Bayer-coded scalar image to a RGB color image.
CImg<T>& BayertoRGB(const unsigned int interpolation_type=3) {
  return get_BayertoRGB(interpolation_type).move_to(*this);
}

//! Convert Bayer-coded scalar image to a RGB color image \newinstance.
CImg<Tuchar> get_BayertoRGB(const unsigned int interpolation_type=3) const {
  if (_spectrum!=1)
    throw CImgInstanceException(_cimg_instance
                                "BayertoRGB(): Instance is not a Bayer image.",
                                cimg_instance);

  CImg<Tuchar> res(_width,_height,_depth,3);
  CImg_3x3(I,T);
  Tuchar *ptr_r = res.data(0,0,0,0), *ptr_g = res.data(0,0,0,1), *ptr_b = res.data(0,0,0,2);
  switch (interpolation_type) {
  case 3 : { // Edge-directed
    CImg_3x3(R,T);
    CImg_3x3(G,T);
    CImg_3x3(B,T);
    cimg_forXYZ(*this,x,y,z) {
      const int _p1x = x?x - 1:1, _p1y = y?y - 1:1, _n1x = x<width() - 1?x + 1:x - 1, _n1y = y<height() - 1?y + 1:y - 1;
      cimg_get3x3(*this,x,y,z,0,I,T);
      if (y%2) {
        if (x%2) {
          const Tfloat
            alpha = cimg::sqr((Tfloat)Inc - Ipc),
            beta = cimg::sqr((Tfloat)Icn - Icp),
            cx = 1/(1 + alpha), cy = 1/(1 + beta);
          *ptr_g = (Tuchar)((cx*(Inc + Ipc) + cy*(Icn + Icp))/(2*(cx + cy)));
        } else *ptr_g = (Tuchar)Icc;
      } else {
        if (x%2) *ptr_g = (Tuchar)Icc;
        else {
          const Tfloat
            alpha = cimg::sqr((Tfloat)Inc - Ipc),
            beta = cimg::sqr((Tfloat)Icn - Icp),
            cx = 1/(1 + alpha), cy = 1/(1 + beta);
          *ptr_g = (Tuchar)((cx*(Inc + Ipc) + cy*(Icn + Icp))/(2*(cx + cy)));
        }
      }
      ++ptr_g;
    }
    cimg_forXYZ(*this,x,y,z) {
      const int _p1x = x?x - 1:1, _p1y = y?y - 1:1, _n1x = x<width() - 1?x + 1:x - 1, _n1y = y<height() - 1?y + 1:y - 1;
      cimg_get3x3(*this,x,y,z,0,I,T);
      cimg_get3x3(res,x,y,z,1,G,T);
      if (y%2) {
        if (x%2) *ptr_b = (Tuchar)Icc;
        else { *ptr_r = (Tuchar)((Icn + Icp)/2); *ptr_b = (Tuchar)((Inc + Ipc)/2); }
      } else {
        if (x%2) { *ptr_r = (Tuchar)((Inc + Ipc)/2); *ptr_b = (Tuchar)((Icn + Icp)/2); }
        else *ptr_r = (Tuchar)Icc;
      }
      ++ptr_r; ++ptr_b;
    }
    ptr_r = res.data(0,0,0,0);
    ptr_g = res.data(0,0,0,1);
    ptr_b = res.data(0,0,0,2);
    cimg_forXYZ(*this,x,y,z) {
      const int _p1x = x?x - 1:1, _p1y = y?y - 1:1, _n1x = x<width() - 1?x + 1:x - 1, _n1y = y<height() - 1?y + 1:y - 1;
      cimg_get3x3(res,x,y,z,0,R,T);
      cimg_get3x3(res,x,y,z,1,G,T);
      cimg_get3x3(res,x,y,z,2,B,T);
      if (y%2) {
        if (x%2) {
          const float
            alpha = (float)cimg::sqr(Rnc - Rpc),
            beta = (float)cimg::sqr(Rcn - Rcp),
            cx = 1/(1 + alpha), cy = 1/(1 + beta);
          *ptr_r = (Tuchar)((cx*(Rnc + Rpc) + cy*(Rcn + Rcp))/(2*(cx + cy)));
        }
      } else {
        if (!(x%2)) {
          const float
            alpha = (float)cimg::sqr(Bnc - Bpc),
            beta = (float)cimg::sqr(Bcn - Bcp),
            cx = 1/(1 + alpha), cy = 1/(1 + beta);
          *ptr_b = (Tuchar)((cx*(Bnc + Bpc) + cy*(Bcn + Bcp))/(2*(cx + cy)));
        }
      }
      ++ptr_r; ++ptr_g; ++ptr_b;
    }
  } break;
  case 2 : { // Linear interpolation
    cimg_forXYZ(*this,x,y,z) {
      const int _p1x = x?x - 1:1, _p1y = y?y - 1:1, _n1x = x<width() - 1?x + 1:x - 1, _n1y = y<height() - 1?y + 1:y - 1;
      cimg_get3x3(*this,x,y,z,0,I,T);
      if (y%2) {
        if (x%2) {
          *ptr_r = (Tuchar)((Ipp + Inn + Ipn + Inp)/4);
          *ptr_g = (Tuchar)((Inc + Ipc + Icn + Icp)/4);
          *ptr_b = (Tuchar)Icc;
        } else { *ptr_r = (Tuchar)((Icp + Icn)/2); *ptr_g = (Tuchar)Icc; *ptr_b = (Tuchar)((Inc + Ipc)/2); }
      } else {
        if (x%2) { *ptr_r = (Tuchar)((Ipc + Inc)/2); *ptr_g = (Tuchar)Icc; *ptr_b = (Tuchar)((Icn + Icp)/2); }
        else {
          *ptr_r = (Tuchar)Icc;
          *ptr_g = (Tuchar)((Inc + Ipc + Icn + Icp)/4);
          *ptr_b = (Tuchar)((Ipp + Inn + Ipn + Inp)/4);
        }
      }
      ++ptr_r; ++ptr_g; ++ptr_b;
    }
  } break;
  case 1 : { // Nearest neighbor interpolation
    cimg_forXYZ(*this,x,y,z) {
      const int _p1x = x?x - 1:1, _p1y = y?y - 1:1, _n1x = x<width() - 1?x + 1:x - 1, _n1y = y<height() - 1?y + 1:y - 1;
      cimg_get3x3(*this,x,y,z,0,I,T);
      if (y%2) {
        if (x%2) {
          *ptr_r = (Tuchar)cimg::min(Ipp,Inn,Ipn,Inp);
          *ptr_g = (Tuchar)cimg::min(Inc,Ipc,Icn,Icp);
          *ptr_b = (Tuchar)Icc;
        } else { *ptr_r = (Tuchar)cimg::min(Icn,Icp); *ptr_g = (Tuchar)Icc; *ptr_b = (Tuchar)cimg::min(Inc,Ipc); }
      } else {
        if (x%2) { *ptr_r = (Tuchar)cimg::min(Inc,Ipc); *ptr_g = (Tuchar)Icc; *ptr_b = (Tuchar)cimg::min(Icn,Icp); }
        else {
          *ptr_r = (Tuchar)Icc;
          *ptr_g = (Tuchar)cimg::min(Inc,Ipc,Icn,Icp);
          *ptr_b = (Tuchar)cimg::min(Ipp,Inn,Ipn,Inp);
        }
      }
      ++ptr_r; ++ptr_g; ++ptr_b;
    }
  } break;
  default : { // 0-filling interpolation
    const T *ptrs = _data;
    res.fill(0);
    cimg_forXYZ(*this,x,y,z) {
      const T val = *(ptrs++);
      if (y%2) { if (x%2) *ptr_b = val; else *ptr_g = val; } else { if (x%2) *ptr_g = val; else *ptr_r = val; }
      ++ptr_r; ++ptr_g; ++ptr_b;
    }
  }
  }
  return res;
}

#endif /* cimg_plugin_bayer */
