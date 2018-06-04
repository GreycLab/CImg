REM ----------------------------------------------------------------
REM
REM Script to compile CImg examples, using Microsoft Visual C++.
REM
REM Copy this script into 'CImg/examples/' and run it to compile
REM all examples.
REM
REM ----------------------------------------------------------------

CD ..\examples\
SET CPPFILE=CImg_demo captcha curve_editor2d dtmri_view3d edge_explorer2d fade_images gaussian_fit1d generate_loop_macros hough_transform2d image2ascii image_registration2d image_surface3d jawbreaker mcf_levelsets2d mcf_levelsets3d odykill pde_heatflow2d pde_TschumperleDeriche2d plotter1d radon_transform2d scene3d spherical_function3d tetris tron tutorial wavelet_atrous use_chlpca use_draw_gradient use_nlmeans use_RGBclass use_skeleton
FOR %%F IN (%CPPFILE%) DO (
  cl /W4 /wd"4127" /wd"4311" /wd"4312" /wd"4512" /wd"4571" /wd"4640" /wd"4706" /wd"4710" /wd"4800" /wd"4804" /wd"4820" /wd"4996" /Ox /Ob2 /Oi /Ot /c /EHsc /D "_CRT_SECURE_NO_WARNINGS" /I"%SDKPATH%\Include" /I"..\\" %%F.cpp
  link /LIBPATH:"%SDKPATH%\Lib" %%F.obj user32.lib gdi32.lib shell32.lib
)
