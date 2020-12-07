#!/bin/bash

# Please note that this shell script should only be run in the logs diretcory
# in order to have correct file directory dependencies!

# init directory variables for tracing and testing
_cwd="$PWD"
echo "Current working directory is: $_cwd"
LOG_DIR="$_cwd/datalogs/"
echo "Current logs directory is: $LOG_DIR"

# here are the data log files for corresponding diagrams
# can add more files as we get more data and create more diagrams
DIAGRAM_LOG_FILES="diagram_1.txt diagram_2.txt"

# introduction print statement for users
echo "Start Getting Data from HDFS..."
echo "Calling corresponding APIs every 30 seconds for the coming 5 minuets..."
echo "Information will be logged into a directory named 'datalogs'..."

# clean any existing files
rm -rf ${LOG_DIR}

# recreate the datalog directory and get into the right directory
mkdir ${LOG_DIR}
cd ${LOG_DIR}

# do the following steps for each of the data log files
for FILE in ${DIAGRAM_LOG_FILES}
do
  # check if log data files exist or not,
  # if not, recreate them
  if [[ ! -e ${FILE} ]]; then
      touch ${FILE}
      echo "Creating ${FILE}"
  fi

  # create absolute path for the log files so that it will be easeir for
  # the program to append log data
  FILE_LOCATION="${LOG_DIR}${FILE}"
  echo "Handling the file at ${FILE_LOCATION}..."

  # for testing purpose, we set it to 5 so that we can have 5 data points in
  # in the diagrams. Can change this based on our progress on the diagrams
  #
  # for each round, the script calls the WebHDFS API for response and append
  # the response to the corresponding diagram log file.
  # The script will call the API every 5 seconds for now for testing purpose
  #
  for i in {1..5}
  do
    curl "http://localhost:9870/webhdfs/v1/user/hive?user.name=hadoop&op=GETCONTENTSUMMARY" >> ${FILE_LOCATION}
    echo "" >> ${FILE_LOCATION}
    sleep 5s # Waits 30 seconds.
  done

done

# ending print statement for users
echo "Done logging diagram data to log files..."
