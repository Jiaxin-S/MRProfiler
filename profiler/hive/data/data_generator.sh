#!/bin/bash

CURR_FILE="1_gb.txt"
_cwd="$PWD"
echo "Current working directory is: $_cwd"

echo "Start generating test data..."


# clean any existing files
rm -f ${CURR_FILE}

# check if log data files exist or not,
# if not, recreate them
if [[ ! -e ${CURR_FILE} ]]; then
    touch ${CURR_FILE}
    echo "Creating ${CURR_FILE}"
fi

# create absolute path for the log files so that it will be easeir for
# the program to append log data
FILE_LOCATION="${_cwd}/${CURR_FILE}"
echo "Handling the file at ${FILE_LOCATION}..."

# for testing purpose, we set it to 10 so that we can have 5 data points in
# in the diagrams. Can change this based on our progress on the diagrams
#
# for each round, the script calls the WebHDFS API for response and append
# the response to the corresponding diagram log file.
# The script will call the API every 5 seconds for now for testing purpose
#
#
#1..1015000
#1015001..2030000
#2030001..3045000
#3045001..4060000
#4060001..5075000
#5075001..6090000
#6090001..7105000
#7105001..8120000
#8120001..9135000
#9135001..10150000
#
#2020-12-14T18:47:54,849
#Time taken: 13.835 seconds on Hive
for i in {9135001..10150000}
do
  echo "$i,test_description_qwertyuiopasdfghjklruiopasdfghjklzxcvbnm,test_type_qwertyuiopasdfghjklzxcvbnm" >> ${FILE_LOCATION}
done

# ending print statement for users
echo "Done logging diagram data to log files..."
