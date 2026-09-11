@echo off
title CLICKER - Neon Idle Lab
cd /d "%~dp0"

echo.
echo  ==========================================
echo       CLICKER - NEON IDLE LAB
echo  ==========================================
echo.
echo  Starting local server...
echo  The game will open in your browser.
echo.
echo  Keep this window open while playing.
echo  Press Ctrl+C here to stop the server.
echo.

where py >nul 2>nul
if %errorlevel%==0 (
    start "" http://localhost:8000
    py -m http.server 8000
    goto :end
)

where python >nul 2>nul
if %errorlevel%==0 (
    start "" http://localhost:8000
    python -m http.server 8000
    goto :end
)

echo ERROR: Python was not found.
echo.
echo Install Python from https://www.python.org/downloads/
echo Then run START.bat again.
echo.
pause

:end
