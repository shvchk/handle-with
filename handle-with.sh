#!/bin/bash 

LOGFILE=/tmp/handle-with.log

str=$1
act=$(echo $1 | sed 's/:\/\/.*//')
url=$(echo $1 | sed 's/^[^:\/\/]*:\/\///')

echo "act= $act, url= $url" 
echo "act= $act, url= $url" >> $LOGFILE 

case $act in  
	"youtube-dl" )
		echo "action $act executed " >> $LOGFILE
		/usr/bin/youtube-dl  "$url"
		;;
	*)
		echo "$1" >> $LOGFILE 
		;;
esac
