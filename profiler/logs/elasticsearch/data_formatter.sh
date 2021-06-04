#!/bin/bash

file='diagram_1mb.txt'

echo $file

while read -r line;
do

#curl -u elastic:ndtPHQNndwjmBiCMRHE5FYAD -X POST "https://i-o-optimized-deployment-9946ba.es.us-west-1.aws.found.io:9243/logs-my_app-default/_doc?pretty" -H 'Content-Type: application/json' -d'
#{
#  "@timestamp": "2099-05-06T16:21:20.000Z",
#  "event": {
#    "directoryCount": 9,
#    "fileCount": 4,
#    "length": 202201,
#    "spaceConsumed": 202201
#  }
#}
#'
  current_timestamp=`date +"%Y-%m-%dT%H:%M:%S.000Z"`



  echo  >> data_output.txt

  # to have different timestamp at least by second
  sleep 1


done < "$file"


#curl -X PUT "localhost:9200/logs-my_app-default/_bulk?pretty" -H 'Content-Type: application/json' -d'
#{ "create": { } }
#{ "@timestamp": "2099-05-07T16:24:32.000Z", "event": { "original": "192.0.2.242 - - [07/May/2020:16:24:32 -0500] \"GET /images/hm_nbg.jpg HTTP/1.0\" 304 0" } }
#{ "create": { } }
#{ "@timestamp": "2099-05-08T16:25:42.000Z", "event": { "original": "192.0.2.255 - - [08/May/2099:16:25:42 +0000] \"GET /favicon.ico HTTP/1.0\" 200 3638" } }
#'



