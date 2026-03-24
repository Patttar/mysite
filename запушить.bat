@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo === Загрузка изменений на GitHub ===
echo.
set "msg="
set /p "msg=Опиши изменения (Enter для пропуска): "
if not defined msg set "msg=update"

git add -A
git commit -m "%msg%"
git push
echo.
echo === Готово! ===
pause
