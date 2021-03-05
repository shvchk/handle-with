#!/bin/bash 

str=$1
act=$(echo $1 | sed 's/:\/\/.*//')
url=$(echo $1 | sed 's/^[^:\/\/]*:\/\///')

echo "act= $act, url= $url" 
echo "act= $act, url= $url" >> /tmp/handle_with.log

case $act in  
	"youtube-dl" )
		echo "action $act executed " >> ~/handle_with.log
		/usr/bin/youtube-dl  "$url"
		;;
	*)
		echo "$1" >> ~/handle_with.log
		;;
esac
