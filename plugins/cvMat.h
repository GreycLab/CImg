/*
#
#  File        : cvMat.h
#                ( C++ header file - CImg plug-in )
#
#  Description : CImg plug-in providing the CImg->cvMat and cvMat->CImg
#                conversions for generic image types
#                ( IPL = Intel Performance Library )
#                This file is a part of the CImg Library project.
#                ( http://cimg.eu )
#
#  Copyright   : Alberto Albiol
#                alalbiol@iteam.upv.es
#
#  How to use  : In the main program include:
#   OPENCV 2.4.x
#        #include "cv.h"
#        #include "highgui.h"
#        #define cimg_plugin1 "cvMat.h"
#        #include "CImg.h"
#
#   OPENCV 3.x.x
#        #include <opencv2/core.hpp>
#        #define cimg_plugin1 "cvMat.h"
#        #include "CImg.h"

*/
#ifndef cimg_plugin_cvMat
#define cimg_plugin_cvMat

// Conversion IPL -> CImg (constructor)
CImg(const cv::Mat& src):_width(0),_height(0),_depth(0),_spectrum(0),_is_shared(false),_data(0) {
  assign(src);
}

// Conversion IPL -> CImg (in-place constructor)
CImg<T>& assign(const cv::Mat & src) {
  if (src.isContinuous()) {
    switch (src.depth()) {
        // case CV_1U: { // 1-bit int.
        //    IplImage *src1 = cvCreateImage(cvGetSize(src),CV_8U,1);
        //    cvConvert(src,src1);
        //    CImg<ucharT>((unsigned char*)src1->imageData,src1->nChannels,src1.cols,src1.rows,1,true).
        //      get_permute_axes("yzcx").move_to(*this);
        //    cvReleaseImage(&src1);
        //  } break;
    case CV_8U: // 8-bit unsigned int.
      if (src.channels()==1) {
        CImg<ucharT>((unsigned char*)src.ptr(),src.cols,src.rows,true).move_to(*this);
      } else {
        std::vector<cv::Mat> channels;
        cv::split(src,channels);
        CImg<ucharT>
          tmp(src.cols,src.rows,1,3),
          R = tmp.get_shared_channel(2),
          G = tmp.get_shared_channel(1),
          B = tmp.get_shared_channel(0);
        std::memcpy(R.data(),channels[0].ptr(),src.cols*src.rows*sizeof(uchar));
        std::memcpy(G.data(),channels[1].ptr(),src.cols*src.rows*sizeof(uchar));
        std::memcpy(B.data(),channels[2].ptr(),src.cols*src.rows*sizeof(uchar));
        tmp.move_to(*this);
      }
      break;
    case CV_8S: // 8-bit signed int.
      if (src.channels()==1) {
        CImg<charT>((char*)src.ptr(),src.cols,src.rows,true).move_to(*this);
      } else {
        std::vector<cv::Mat> channels;
        cv::split(src,channels);
        CImg<ucharT>
          tmp(src.cols,src.rows,1,3),
          R = tmp.get_shared_channel(2),
          G = tmp.get_shared_channel(1),
          B = tmp.get_shared_channel(0);
        std::memcpy(R.data(),channels[0].ptr(),src.cols*src.rows*sizeof(char));
        std::memcpy(G.data(),channels[1].ptr(),src.cols*src.rows*sizeof(char));
        std::memcpy(B.data(),channels[2].ptr(),src.cols*src.rows*sizeof(char));
        tmp.move_to(*this);
      }
      break;
    case CV_16U: // 16-bit unsigned int.
      if (src.channels()==1) {
        CImg<ushortT>((unsigned short*)src.ptr(),src.cols,src.rows,true).move_to(*this);
      } else {
        std::vector<cv::Mat> channels;
        cv::split(src,channels);
        CImg<ushortT>
          tmp(src.cols,src.rows,1,3),
          R = tmp.get_shared_channel(2),
          G = tmp.get_shared_channel(1),
          B = tmp.get_shared_channel(0);
        std::memcpy(R.data(),channels[0].ptr(),src.cols*src.rows*sizeof(unsigned short));
        std::memcpy(G.data(),channels[1].ptr(),src.cols*src.rows*sizeof(unsigned short));
        std::memcpy(B.data(),channels[2].ptr(),src.cols*src.rows*sizeof(unsigned short));
        tmp.move_to(*this);
      }
      break;
    case CV_16S: // 16-bit signed int.
      if (src.channels()==1) {
        CImg<shortT>((short*)src.ptr(),src.cols,src.rows,true).move_to(*this);
      } else {
        std::vector<cv::Mat> channels;
        cv::split(src,channels);
        CImg<shortT>
          tmp(src.cols,src.rows,1,3),
          R = tmp.get_shared_channel(2),
          G = tmp.get_shared_channel(1),
          B = tmp.get_shared_channel(0);
        std::memcpy(R.data(),channels[0].ptr(),src.cols*src.rows*sizeof(short));
        std::memcpy(G.data(),channels[1].ptr(),src.cols*src.rows*sizeof(short));
        std::memcpy(B.data(),channels[2].ptr(),src.cols*src.rows*sizeof(short));
        tmp.move_to(*this);
      }
      break;
    case CV_32S: // 32-bit signed int.
      if (src.channels()==1) {
        CImg<intT>((int*)src.ptr(),src.cols,src.rows,true).move_to(*this);
      } else {
        std::vector<cv::Mat> channels;
        cv::split(src,channels);
        CImg<intT>
          tmp(src.cols,src.rows,1,3),
          R = tmp.get_shared_channel(2),
          G = tmp.get_shared_channel(1),
          B = tmp.get_shared_channel(0);
        std::memcpy(R.data(),channels[0].ptr(),src.cols*src.rows*sizeof(int));
        std::memcpy(G.data(),channels[1].ptr(),src.cols*src.rows*sizeof(int));
        std::memcpy(B.data(),channels[2].ptr(),src.cols*src.rows*sizeof(int));
        tmp.move_to(*this);
      }
      break;
    case CV_32F: // 32-bit float.
      if (src.channels()==1) {
        CImg<floatT>((float*)src.ptr(),src.cols,src.rows,true).move_to(*this);
      } else {
        std::vector<cv::Mat> channels;
        cv::split(src,channels);
        CImg<floatT>
          tmp(src.cols,src.rows,1,3),
          R = tmp.get_shared_channel(2),
          G = tmp.get_shared_channel(1),
          B = tmp.get_shared_channel(0);
        std::memcpy(R.data(),channels[0].ptr(),src.cols*src.rows*sizeof(float));
        std::memcpy(G.data(),channels[1].ptr(),src.cols*src.rows*sizeof(float));
        std::memcpy(B.data(),channels[2].ptr(),src.cols*src.rows*sizeof(float));
        tmp.move_to(*this);
      }
      break;
    case CV_64F: // 64-bit double.
      if (src.channels()==1) {
        CImg<doubleT>((double*)src.ptr(),src.cols,src.rows,true).move_to(*this);
      } else {
        std::vector<cv::Mat> channels;
        cv::split(src,channels);
        CImg<doubleT>
          tmp(src.cols,src.rows,1,3),
          R = tmp.get_shared_channel(2),
          G = tmp.get_shared_channel(1),
          B = tmp.get_shared_channel(0);
        std::memcpy(R.data(),channels[0].ptr(),src.cols*src.rows*sizeof(double));
        std::memcpy(G.data(),channels[1].ptr(),src.cols*src.rows*sizeof(double));
        std::memcpy(B.data(),channels[2].ptr(),src.cols*src.rows*sizeof(double));
        tmp.move_to(*this);
      }
      break;
    default:
      throw CImgInstanceException(_cimg_instance
                                  "assign(const cv::Mat&) : Mat depth is invalid.",
                                  cimg_instance);
      break;
    }
  } else {
    cv::Size size = src.size();
    switch (src.depth()) {
    case CV_8U: // 8-bit unsigned int.
      if (src.channels()==1) {
        CImg<ucharT> tmp(src.cols,src.rows);
        for (int i = 0; i<size.height; ++i) {
          const unsigned char* row_i = src.ptr<unsigned char>(i);
          unsigned char *row_o = tmp.data(0,i);
          std::memcpy(row_o,row_i,size.width*sizeof(unsigned char));
        }
        tmp.move_to(*this);
      } else {
        CImg<ucharT> tmp(src.cols,src.rows,1,src.channels());
        std::vector<cv::Mat> channels;
        cv::split(src,channels);
        for (int c = 0; c<src.channels(); ++c) {
          CImg<ucharT> plane = tmp.get_shared_channel(src.channels() - 1 - c);
          for (int i = 0; i<size.height; ++i) {
            const unsigned char* row_i = channels[c].ptr<unsigned char>(i);
            unsigned char *row_o = plane.data(0,i);
            std::memcpy(row_o,row_i,size.width*sizeof(unsigned char));
          }
        }
        tmp.move_to(*this);
      }
      break;
    case CV_8S: // 8-bit int.
      if (src.channels()==1) {
        CImg<charT> tmp(src.cols,src.rows);
        for (int i = 0; i<size.height; ++i) {
          const char* row_i = src.ptr<char>(i);
          char* row_o = tmp.data(0,i);
          std::memcpy(row_o,row_i,size.width*sizeof(charT));
        }
        tmp.move_to(*this);
      } else {
        CImg<charT> tmp(src.cols,src.rows,1,src.channels());
        std::vector<cv::Mat> channels;
        cv::split(src,channels);
        for (int c = 0; c<src.channels(); ++c) {
          CImg<charT> plane = tmp.get_shared_channel(src.channels() - 1 - c);
          for (int i = 0; i<size.height; ++i) {
            const char* row_i = channels[c].ptr<char>(i);
            char *row_o = plane.data(0,i);
            std::memcpy(row_o,row_i,size.width*sizeof(char));
          }
        }
        tmp.move_to(*this);
      }
      break;
    case CV_16S: // 16-bit int.
      if (src.channels()==1) {
        CImg<shortT> tmp(src.cols,src.rows);
        for (int i = 0; i<size.height; ++i) {
          const short* row_i = src.ptr<short>(i);
          short *row_o = tmp.data(0,i);
          std::memcpy(row_o,row_i,size.width*sizeof(short));
        }
        tmp.move_to(*this);
      } else {
        CImg<shortT> tmp(src.cols,src.rows,1,src.channels());
        std::vector<cv::Mat> channels;
        cv::split(src,channels);
        for (int c = 0; c<src.channels(); ++c) {
          CImg<shortT> plane = tmp.get_shared_channel(src.channels() - 1 - c);
          for (int i = 0; i<size.height; ++i) {
            const short* row_i = channels[c].ptr<short>(i);
            short *row_o = plane.data(0,i);
            std::memcpy(row_o,row_i,size.width*sizeof(short));
          }
        }
        tmp.move_to(*this);
      }
      break;
    case CV_32F: // 32-bit float.float
      if (src.channels()==1) {
        CImg<floatT> tmp(src.cols,src.rows);
        for (int i = 0; i<size.height; ++i) {
          const float* row_i = src.ptr<float>(i);
          float *row_o = tmp.data(0,i);
          std::memcpy(row_o,row_i,size.width*sizeof(float));
        }
        tmp.move_to(*this);
      } else {
        CImg<floatT> tmp(src.cols,src.rows,1,src.channels());
        std::vector<cv::Mat> channels;
        cv::split(src,channels);
        for (int c = 0; c<src.channels(); ++c) {
          CImg<floatT> plane = tmp.get_shared_channel(src.channels() - 1 - c);
          for (int i = 0; i<size.height; ++i) {
            const float* row_i = channels[c].ptr<float>(i);
            float *row_o = plane.data(0,i);
            std::memcpy(row_o,row_i,size.width*sizeof(float));
          }
        }
        tmp.move_to(*this);
      }
      break;
    case CV_64F: // 64-bit double.
      if (src.channels()==1) {
        CImg<doubleT> tmp(src.cols,src.rows);
        for (int i = 0; i<size.height; ++i) {
          const double* row_i = src.ptr<double>(i);
          double *row_o = tmp.data(0,i);
          std::memcpy(row_o,row_i,size.width*sizeof(double));
        }
        tmp.move_to(*this);
      } else {
        CImg<doubleT> tmp(src.cols,src.rows,1,src.channels());
        std::vector<cv::Mat> channels;
        cv::split(src,channels);
        for (int c = 0; c<src.channels(); ++c) {
          CImg<doubleT> plane = tmp.get_shared_channel(src.channels() - 1 - c);
          for (int i = 0; i<size.height; ++i) {
            const double* row_i = channels[c].ptr<double>(i);
            double *row_o = plane.data(0,i);
            std::memcpy(row_o,row_i,size.width*sizeof(double));
          }
        }
        tmp.move_to(*this);
      }
      break;
    default:
      throw CImgInstanceException(_cimg_instance
                                  "assign(const cv::Mat&) : Mat depth is invalid.",
                                  cimg_instance);
      break;
    }
  }

  //  if (!std::strcmp(src->channelSeq,"BGR")) mirror('v');
  //  else if (!std::strcmp(src->channelSeq,"BGRA")) get_shared_channels(0,2).mirror('v');
  return *this;
}

// Conversion CImg -> MAT
cv::Mat get_MAT(const unsigned int z=0) const {
  if (is_empty())
    throw CImgInstanceException(_cimg_instance
                                "get_MAT() : instance image is empty.",
                                cimg_instance);
  if (z>=_depth)
    throw CImgInstanceException(_cimg_instance
                                "get_MAT() : specified slice %u is out of image bounds.",
                                cimg_instance,z);
  const CImg<T>
    _slice = _depth>1?get_slice(z):CImg<T>(),
    &slice = _depth>1?_slice:*this;
  CImg<T> buf(slice,true);
  int
    cols = buf.width(),
    rows = buf.height(),
    nchannels = buf.spectrum(),
    matType=-1;

  if (!cimg::strcasecmp(buf.pixel_type(),"unsigned char")) matType = CV_8UC1;
  if (!cimg::strcasecmp(buf.pixel_type(),"char")) matType = CV_8SC1;
  if (!cimg::strcasecmp(buf.pixel_type(),"unsigned short")) matType = CV_16UC1;
  if (!cimg::strcasecmp(buf.pixel_type(),"short")) matType = CV_16SC1;
  if (!cimg::strcasecmp(buf.pixel_type(),"int")) matType = CV_32SC1;
  if (!cimg::strcasecmp(buf.pixel_type(),"float")) matType = CV_32FC1;
  if (!cimg::strcasecmp(buf.pixel_type(),"double")) matType = CV_64FC1;
  if (matType<0)
    throw CImgInstanceException(_cimg_instance
                                "get_MAT() : pixel type '%s' is not supported.",
                                cimg_instance,buf.pixel_type());
  cv::Mat out;
  std::vector<cv::Mat> channels(nchannels);
  if (nchannels>1) {
    for (int c = 0; c<nchannels; ++c) {
      channels[c] = cv::Mat(rows,cols,matType,const_cast<T*>(buf.data() + rows*cols*(nchannels - 1 - c)));
    } // for channels
    cv::merge(channels,out);
  } else out = cv::Mat(rows,cols,matType,const_cast<T*>(buf.data())).clone();
  return out;
}

#endif /* cimg_plugin_cvMat */
