@echo off
title VELA - Demo local
cd /d "%~dp0web"

if not exist node_modules (
  echo Instalando dependencias, espera un momento...
  call npm install --no-audit --no-fund
)

powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort 3100 -State Listen -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }"
if %errorlevel%==0 goto abrir

echo Iniciando VELA en http://localhost:3100 ...
start "VELA dev" cmd /k "npm run dev"
timeout /t 7 /nobreak >nul

:abrir
start "" http://localhost:3100
exit
