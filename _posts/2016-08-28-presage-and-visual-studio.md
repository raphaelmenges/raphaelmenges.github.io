---
layout: post
title: Presage and Visual Studio
---
Since the documentation of how to use the word prediction library [*Presage*](http://presage.sourceforge.net/) in combination with *Visual Studio 2015* is, let's say, minimal, I decided to write down my approach.

Just to start with the system setup: MinGW is necessary, because Presage seems to link at least against libgcc_s_dw2-1.dll at runtime. That DLL can be found in the binary folder of MinGW with a complete base (mingw-developer-toolkit, mingw32-base, mingw32-gcc-g++ and msys-base) installation. Verify that the binary folder of MinGW is in your PATH variable, otherwise the DLL could not be found at application startup. If you are motivated, you can find out which DDLs are really necessary and collect them. I tested the following approach with Visual Studio 2015 and Presage for x86 under Windows 10, only.

Ok, then start with the easy part.

- [Download](https://sourceforge.net/projects/presage/files/presage/) Presage for the aimed architecture
- Install Presage to a destination of your choice and include the development files and demos at installation
  - I recommend **not** to install the Notepad++ plugin because it was not possible to uninstall it afterwards
	
Congratulations, you have installed Presage. It seems, that the C++ header part of Presage.h ist only available for MinGW on Windows and one has to use the plain C functions, as far as I interpreted this [news](http://presage.sourceforge.net/?q=node/51). After some reseach in the source code I found a [Bindings](https://sourceforge.net/p/presage/presage/ci/master/tree/bindings/c/)  folder with some instructions to get it running. 

- A .lib file for linking via Visual Studio is necessary and is created with the command line tools from a .def file
  - Fetch libpresage-1.def from the [repository](https://sourceforge.net/p/presage/presage/ci/master/tree/bindings/c/libpresage-1.def?format=raw)
  - Open Visual Studio and search for Visual Studio Command Prompt under Tools
  - Navigate with *cd* to the directory were you downloaded the .def file and do as the readme from the Bindings folder indicates:
 
```
This is done using the LIB tool that comes with Visual Studio:

  LIB /MACHINE:x86 /DEF:libpresage-1.def /OUT:libpresage-1.lib

or, for x64 builds:

  LIB /MACHINE:x64 /DEF:libpresage-1.def /OUT:libpresage-1.lib
```

  - Move the .lib file into lib folder of your Presage installation
- Copy the following DLLs from the bin folder into the folder of your executable
  - libsqlite3-0.dll
  - libstdc++-6.dll
  - libwinpthread-1.dll
  - libpresage-1.dll

Now everything should be set up and you can link your program to the now existing .lib file inside the Presage installation. Below is a minimal sample program which does not need a configuration file. The header file of Presage can be found in the include folder of your Presage installation. Alternatively, you can take a look at the official [example](https://sourceforge.net/p/presage/presage/ci/master/tree/bindings/c/presage_c_demo.c).

```
#include "presage.h"
#include <string>
#include <iostream>

// Pointer to Presage object
presage_t presage;

// Past and future input for Presage
std::string past = "Hello world, this is a ";
std::string future = "";

// Presage getter for past stream
static const char* get_past_stream(void* arg)
{
	return (char*)arg;
}

// Presage getter for future stream
static const char* get_future_stream(void* arg)
{
	return (char*)arg;
}

int main()
{
	// Initialize and set up Presage
	if (PRESAGE_OK != presage_new(
		get_past_stream,
		(void *)past.data(),
		get_future_stream,
		(void *)future.data(),
		&presage))
	{
		// Presage could not be initialized
	}
	
	// Setup for Presage. Values can be found in etc/presage.xml of your Presage installation
	presage_config_set(presage, "Presage.Selector.SUGGESTIONS", "3"); // three suggestions are enough
	presage_config_set(presage, "Presage.ContextTracker.ONLINE_LEARNING", "no"); // disable learning
	
	// Prediction
	char** prediction;
	if (PRESAGE_OK == presage_predict(presage, &prediction))
	{
			for (int i = 0; prediction[i] != 0; i++)
			{
				std::cout << prediction[i] << std::endl;
			}
			presage_free_string_array(prediction);
	}
	
	// Wait for user to type in char so console output can be viewed
	getchar();
	
	// Terminate Presage
	presage_free(presage);
}
```

I suggest to create and terminate a presage structure each time you need one. It seems that when you reuse it multiple times, it stops to give new suggestions when the past reaches a certain length.
