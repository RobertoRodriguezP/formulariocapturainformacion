@echo off
echo 🚀 Iniciando instalación del entorno .NET para el backend

:: Comprobar si dotnet ya está instalado
dotnet --version >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
    echo ✅ .NET SDK ya instalado
) ELSE (
    echo 🔧 Instalando .NET 6 SDK...
    powershell -Command "Invoke-WebRequest -Uri https://builds.dotnet.microsoft.com/dotnet/Sdk/6.0.428/dotnet-sdk-6.0.428-win-x64.exe -OutFile dotnet-sdk.exe"
    dotnet-sdk.exe /install /quiet /norestart
    del dotnet-sdk.exe
    echo ✅ .NET SDK instalado
)



:: Restaurar paquetes y compilar
echo 🔄 Restaurando paquetes NuGet...
dotnet restore

echo 🔨 Compilando proyecto...
dotnet build

echo ✅ Entorno listo. Ejecuta `dotnet run` para iniciar la API.
pause
