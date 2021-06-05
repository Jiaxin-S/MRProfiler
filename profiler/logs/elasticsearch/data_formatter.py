import json
import requests
import datetime
import time

# COLLECTING DATA FROM HIVE
# TO-DO: FINISH THIS


# INSERTING DATA...
# data_file_name = "diagram_1mb.txt"
# count = 0
#
# data_file = open(data_file_name, 'r')
# lines = data_file.readlines()
#
# for l in lines:
#
#     count += 1
#     # if count == 1:
#     data = json.loads(l)
#     current_time = datetime.datetime.now()
#     current_timestamp = current_time.strftime('%Y-%m-%dT%H:%M:%S.%f')
#     current_timestamp = current_timestamp[:-3] + 'Z'
#
#     directory_count = data['ContentSummary']['directoryCount']
#     file_count = data['ContentSummary']['fileCount']
#     length = data['ContentSummary']['length']
#     space_consumed = data['ContentSummary']['spaceConsumed']
#     # print("Line {}: {} {} {} {} {}".format(count,
#     #                                        current_timestamp,
#     #                                        directory_count,
#     #                                        file_count,
#     #                                        length,
#     #                                        space_consumed))
#
#     url = 'https://i-o-optimized-deployment-9946ba.es.us-west-1.aws.found.io:9243/logs-my_app-default/_doc?pretty'
#     payload = '{{ ' \
#               '"@timestamp": "{}", ' \
#               '"event": {{ ' \
#               '"directoryCount": {}, ' \
#               '"fileCount": {}, ' \
#               '"length": {}, ' \
#               '"spaceConsumed": {} }}}}'.format(str(current_timestamp), directory_count, file_count, length,
#                                                 space_consumed)
#
#     print(payload)
#     headers = {'Content-Type': 'application/json'}
#     r = requests.post(url, auth=('elastic', 'ndtPHQNndwjmBiCMRHE5FYAD'), headers=headers, data=payload)
#     print(count)
#     print(r.json())
#     time.sleep(1)

# QUERY LATEST QUICK LOOK STATS
quick_look_url = 'https://i-o-optimized-deployment-9946ba.es.us-west-1.aws.found.io:9243/logs-my_app-default/_search?size=1'
query = '{' \
        '"query": { ' \
        '"range": { ' \
        '"@timestamp": { ' \
        '"gte": "2021-05-05", ' \
        '"lt": "2021-07-08" ' \
        '}' \
        '}' \
        '}, ' \
        '"fields": [ ' \
        '"@timestamp",' \
        ' "event.directoryCount", ' \
        '"event.fileCount", ' \
        '"event.length", ' \
        '"event.spaceConsumed" ' \
        '], ' \
        '"_source": false, ' \
        '"sort": [ { ' \
        '"@timestamp": "desc" ' \
        '} ] ' \
        '}'

print(query)
headers = {'Content-Type': 'application/json'}
quick_look_r = requests.get(quick_look_url, auth=('elastic', 'ndtPHQNndwjmBiCMRHE5FYAD'), headers=headers, data=query)
print(quick_look_r.json()['hits']['hits'][0]['fields']['event.fileCount'][0])
print(quick_look_r.json()['hits']['hits'][0]['fields']['event.directoryCount'][0])
print(quick_look_r.json()['hits']['hits'][0]['fields']['event.length'][0])
print(quick_look_r.json()['hits']['hits'][0]['fields']['event.spaceConsumed'][0])



# Working CURL Call Example:
# curl -u elastic:ndtPHQNndwjmBiCMRHE5FYAD -X POST "https://i-o-optimized-deployment-9946ba.es.us-west-1.aws.found.io:9243/logs-my_app-default/_doc?pretty" -H 'Content-Type: application/json' -d'
# {
#  "@timestamp": "2099-05-06T16:21:20.000Z",
#  "event": {
#    "directoryCount": 9,
#    "fileCount": 4,
#    "length": 202201,
#    "spaceConsumed": 202201
#  }
# }
# '
