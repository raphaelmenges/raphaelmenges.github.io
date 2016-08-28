---
layout: post
title: Presage and Visual Studio
---
Since the documentation of how to use the word prediction library presage in combination with Visual Studio, I decided to write down my approach. It is not guaranteed to be optimal and I am not sure whether all steps are really necessary, but at least it works.

- Download Presage for the aimed architecture (https://sourceforge.net/projects/presage/files/presage/)
- Install Presage in a destination of your choice inclusive development files
- Create lib file (link to GitHub in Bindings folder)
- Fetch dlls from executables
- Copy lib into lib folder of installation
- Copy dlls to executable of your program (i used some copy algorithm in CMakeLists.txt)
- MinGW seems to be necessary (https://sourceforge.net/projects/mingw/files/latest/download) with all base packages
  - not the one from chocolatey!
	- mingw-developer-toolkit mingw32-base mingw32-gcc-g++ msys-base
	- libgcc is dynamically linked to there (remember path!) libgcc_s_dw2-1.dll