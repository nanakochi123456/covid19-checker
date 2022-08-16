@echo off

echo on

wsl bash 0make.sh
pause

git commit -a
git push
