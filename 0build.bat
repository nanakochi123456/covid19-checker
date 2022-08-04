@echo off

echo on

wsl make -f Makefile -j 16
pause
git commit -a
git push
