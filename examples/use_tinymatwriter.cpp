/*
 #
 #  File        : use_tinymatwriter.cpp
 #                ( C++ source file )
 #
 #  Description : Example of use for the CImg plugin 'plugins/tinymatwriter.h'.
 #                This file is a part of the CImg Library project.
 #                ( http://cimg.eu )
 #
 #  Copyright  : Jan W. Krieger
 #                ( https://github.com/jkriege2 )
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

/*
  This Matlab/Octave script tests the output:
		clear all
		more off

		subplot(2,2,1)
		load("mat432.mat", "-v6")
		disp('mat432.mat:  CImg_image=')
		disp(CImg_image)
		imagesc(CImg_image(:,:,1))
		colorbar

		subplot(2,2,2)
		load("mat432i16.mat", "-v6")
		disp('mat432i16.mat:  CImg_image=')
		disp(CImg_image)
		imagesc(double(CImg_image(:,:,2)))
		colorbar

		subplot(2,2,3)
		load("matb.mat", "-v6")
		disp('matb.mat:  CImg_image=')
		disp(CImg_image)
		imagesc(CImg_image(:,:,4))
		colorbar
*/

#include <iostream>
#include <stdio.h>
#include "tinymatwriter.h"
#include <cmath>

#define cimg_plugin "plugins/tinymatwriter.h"
#include "../CImg.h"

using namespace std;
using namespace cimg_library;

int main(int argc, const char** argv) {

  double mat432[4*3*2]= {
    1,2,3,
    4,5,6,

    10,20,30,
    40,50,60,

    100,200,300,
    400,500,600,

    1000,2000,3000,
    4000,5000,6000,
  };

  int16_t mat432i16[4*3*2]= {
    1,2,3,
    4,5,6,

    10,20,30,
    40,50,60,

    100,200,300,
    400,500,600,

    1000,-2000,3000,
    -4000,5000,-6000,
  };

  // a boolean matrix
  bool matb[4*3*2] = {
    true,false,true,
    false,true,false,

    true,true,true,
    false,false,false,

    true,false,true,
    true,false,true,

    true,true,false,
    false,true,true
  };

  cimg_library::CImg<double> ciD(mat432, 3,2,4);
  cimg_library::CImg<int16_t> ciI16(mat432i16, 3,2,4);
  cimg_library::CImg<bool> ciB(matb, 3,2,4);

  ciD.save_tinymat("mat432.mat");
  ciI16.save_tinymat("mat432i16.mat");
  ciB.save_tinymat("matb.mat");
  return 0;
}
