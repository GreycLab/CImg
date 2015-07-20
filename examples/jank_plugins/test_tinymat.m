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
