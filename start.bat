@echo off

echo Starting the bot
call node .

if NOT ["%errorlevel%"]==["0"] (
  pause
  exit /b %errorlevel%
)