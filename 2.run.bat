@echo off
echo ================================
echo   🚗 Iniciando aplicación...
echo ================================

REM Abrir backend (C# API)
echo 🔧 Backend (.NET) iniciando...
start cmd /k "cd VehicleAppointmentsApi && dotnet run"

REM Abrir frontend (React con Vite)
echo 💻 Frontend (Vite + React) iniciando...
start cmd /k "cd frontend && npm run dev"

REM Esperar y abrir navegador
timeout /t 5 /nobreak > NUL
start http://localhost:5173

echo ✅ Todo listo. Navegador abierto.
pause
