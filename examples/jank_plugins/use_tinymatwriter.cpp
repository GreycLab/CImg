/*
    Copyright (c) 2008-2015 Jan W. Krieger (<jan@jkrieger.de>, <j.krieger@dkfz.de>), German Cancer Research Center (DKFZ) & IWR, University of Heidelberg

    last modification: $LastChangedDate: 2015-07-07 12:07:58 +0200 (Di, 07 Jul 2015) $  (revision $Rev: 4005 $)

    This software is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License (LGPL) as published by
    the Free Software Foundation, either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


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
#include "./TinyTIFF/tinytiffwriter.h"
#include "./TinyTIFF/tinytiffreader.h"


#include "./TinyMAT/tinymatwriter.h"
#define cimg_plugin "plugins/tinymatwriter.h"
#include "../../CImg.h"


#include <cmath>

using namespace std;
using namespace cimg_library;


int main( int argc, const char* argv[] ) {
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
