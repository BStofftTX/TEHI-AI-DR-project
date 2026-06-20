@ECHO OFF
SETLOCAL
SET BASEDIR=%~dp0
SET WRAPPER_DIR=%BASEDIR%\.mvn\wrapper
SET JAR=%WRAPPER_DIR%\maven-wrapper.jar
SET PROPS=%WRAPPER_DIR%\maven-wrapper.properties

IF NOT EXIST "%JAR%" (
  FOR /F "tokens=1,* delims==" %%A IN (%PROPS%) DO (
    IF "%%A"=="wrapperUrl" SET WRAPPER_URL=%%B
  )
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Invoke-WebRequest -UseBasicParsing -Uri '%WRAPPER_URL%' -OutFile '%JAR%'"
)

java -Dmaven.multiModuleProjectDirectory="%BASEDIR%" -cp "%JAR%" org.apache.maven.wrapper.MavenWrapperMain %*
ENDLOCAL
