@echo off
echo 🧹 Iniciando desinstalación

:: Borrar carpeta de datos SQLite
if exist "Data" (
    rmdir /s /q Data
    echo 🗑️ Carpeta de base de datos 'Data' eliminada
)

:: Intentar desinstalar .NET 6 si fue instalado manualmente
:: NOTA: Esto funcionará solo si fue instalado por el setup.bat
echo ℹ️ Debes desinstalar .NET 6 manualmente desde Panel de Control si ya estaba instalado.

echo ✅ Limpieza completada
pause
