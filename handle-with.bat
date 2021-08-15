echo off

set act= %1 -split '://',0
set url= %1 -split '://',2

IF "%ACT%" == "youtube-dl" #REM execute any script/programm you like with the url as its argument
