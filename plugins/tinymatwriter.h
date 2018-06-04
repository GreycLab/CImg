/*
#
#  File        : tinymatwriter.h
#                ( C++ header file - CImg plug-in )
#
#  Description : This CImg plug-in provide functions to write image as 
#                Matlab MAT files
#                ( http://cimg.eu )
#
#  Copyright   : Jan W. Krieger
#                ( j.krieger(at)dkfz.de   jan(at)jkrieger.de )
#
#  License     : CeCILL v2.0
#                ( http://www.cecill.info/licences/Licence_CeCILL_V2-en.html )
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

/*-----------------------------------------------------------------------------------

IMPORTANT NOTE :

You *need* to compile tinymatwriter.cpp and link the result to your project and
include "tinymatwriter.h" berfore inclusing CIMg or this plugin!

This library is available from:
    https://github.com/jkriege2/TinyMAT
------------------------------------------------------------------------------------*/



#ifndef cimg_plugin_tinymatwriter
#define cimg_plugin_tinymatwriter

#include<cstdint>

/////////////////////////////////////////////////////////////////
//
//    Define main CImg plugin functions.
//    (you should use these functions only in your own code)
//
/////////////////////////////////////////////////////////////////

//! Save image as a MAT file.
/**
   \param filename filename of the output file
   \note TinyMATWriter supports signed/unsigned int with 8/16/32/64 bits, double, float and bool as pixel types!
**/
const CImg& save_tinymat(const char *filename) const {

  TinyMATWriterFile* mat=TinyMATWriter_open(filename);
  if (mat) {
      int32_t size_x=width();
      int32_t size_y=height();
      int32_t size_z=depth();
      int32_t size_c=spectrum();
      
      int32_t sizes[4]={size_x, size_y, size_z, size_c};
      uint32_t dims=4;
      if (size_c==1) {
          dims=3;
          if (size_z==1) {
              dims=2;
			  if (size_y==1) {
                  dims=1;
			  }
          }
      }
	  
	  TinyMATWriter_writeMatrixND_rowmajor(mat, "CImg_image", data(), sizes, dims);
      TinyMATWriter_close(mat);
  } else {
      throw CImgIOException(_cimg_instance
                            "save_tinymat(): Failed to open file.",
                            cimg_instance);
  }

  return *this;
}


// End of the plug-in
//-------------------
#endif /* cimg_plugin_tinymatwriter */
