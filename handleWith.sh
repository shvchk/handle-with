#!/bin/bash 

str=$1
act=$(echo $1 | sed 's/:\/\/.*//')
url=$(echo $1 | sed 's/^[^:\/\/]*:\/\///')

echo "act= $act, url= $url" 
echo "act= $act, url= $url" >> /tmp/handleWith.log

case $act in  
	"youtube-dl" )
		echo "action $act executed " >> /tmp/handleWith.log
		/usr/bin/youtube-dl  "$url"
		;;
	*)
		echo "$1" >> /tmp/handleWith.log
		;;
esac
