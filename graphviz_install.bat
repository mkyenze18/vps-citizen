@REM https://pygraphviz.github.io/documentation/stable/install.html#manual-download

@REM Download and install 2.46.0 for Windows 10 (64-bit):
@REM stable_windows_10_cmake_Release_x64_graphviz-install-2.46.0-win64.exe.
@REM https://gitlab.com/graphviz/graphviz/-/package_files/6164164/download

@REM Install PyGraphviz via
@REM PS C:\> python -m pip install --global-option=build_ext `
@REM               --global-option="-IC:\Program Files\Graphviz\include" `
@REM               --global-option="-LC:\Program Files\Graphviz\lib" `
@REM               pygraphviz

@REM In the case of custom installation note your installation location and 
@REM adjust the command-line script accordingly
python -m pip install --global-option=build_ext^
    --global-option="-ID:\Program Files\Graphviz\include"^
    --global-option="-LD:\Program Files\Graphviz\lib"^
    pygraphviz