#
#  File            : pycimg.py
#                    ( Python file )
#
#  Description     : Show how to import .cimg and .cimgz files into python (numpy).
#                    This file is a part of the CImg Library project.
#                    ( http://cimg.eu )
#
#  Copyright       : Antonio Albiol, Universidad Politecnica Valencia (SPAIN)
#
#                    In case of issues or comments contact Antonio Albiol at:
#                    aalbiol (at) dcom.upv.es
#
#  Licenses        : This file is 'dual-licensed', you have to choose one
#                    of the two licenses below to apply.
#
#                    CeCILL-C
#                    The CeCILL-C license is close to the GNU LGPL.
#                    ( http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html )
#
#                or  CeCILL v2.1
#                    The CeCILL license is compatible with the GNU GPL.
#                    ( http://www.cecill.info/licences/Licence_CeCILL_V2.1-en.html )
#
#  This software is governed either by the CeCILL or the CeCILL-C license
#  under French law and abiding by the rules of distribution of free software.
#  You can  use, modify and or redistribute the software under the terms of
#  the CeCILL or CeCILL-C licenses as circulated by CEA, CNRS and INRIA
#  at the following URL: "http://www.cecill.info".
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
#  knowledge of the CeCILL and CeCILL-C licenses and that you accept its terms.
#

import numpy as np
import zlib
import os

typesDict={'float':'float32' ,'double':'float64',
'unsigned_short':'uint16','unsigned_char':'uint8',
'int':'int32', 'short':'int16'}

def cimgread( filename ):
    """ USAGE: a= cimgread(filename)
    For CImg Images:
        * returns a npy array in the case of cimg
        * Supports compression
        * It squeezes singleton dimensions. If a CImg image has dimensions (w,h,1,c)
            the returned python object will have shape
                a.shape --> (h,w,c)
        * a(y,x,z,c) to access one element
    For CImgList:
        * returns a list of npy arrays
        * if original CImgList has nimages, then
             len(a) --> nimages
        * To access one pixel of the j-th image use a[j](y,x,z,c)

        """

    basename, file_extension = os.path.splitext(filename)
    fa = open(filename, 'rb')

    out =[]
    line0 = fa.readline() #Endiannes
    tiposdato=line0.split()
    number_of_images=int(tiposdato[0])
    datatypecimg=tiposdato[1].decode()
    endiannes = tiposdato[2]

    datatype = typesDict[datatypecimg];

    for n in range(number_of_images):
        line1 = fa.readline() # Dimensions
        dimensiones = line1.split()
        width = int(dimensiones[0]);
        height = int(dimensiones[1]);
        depth = int(dimensiones[2]);
        spectrum = int(dimensiones[3]);

        if file_extension == '.cimgz':
            csize= int(dimensiones[4].decode()[1:])
            data = fa.read(csize)
            data = zlib.decompress(data)
        else:
            data = fa.read(width*height*depth*spectrum*dtype(datatype).itemsize)

        flattened = np.frombuffer(data,dtype=datatype)

        cimg=flattened.reshape((spectrum,depth,height,width))
        cimg=np.squeeze(np.transpose(cimg,(2,3,1,0)))
        out.append(cimg)

    fa.close()
    if len(out)==1:
        return out[0]
    return out
