CREATE DATABASE IF NOT EXISTS profiler_db ;

USE profiler_db;

CREATE TABLE IF NOT EXISTS  profiler_db.test_1mb
(  id INT,
   description String,
   type String
)
ROW FORMAT delimited
FIELDS TERMINATED BY ','
STORED AS textfile;

LOAD DATA LOCAL inpath '/Users/jiaxinsu/Desktop/MRProfiler/profiler/hive/data/1_mb.txt' OVERWRITE INTO TABLE profiler_db.test_1mb;

INSERT OVERWRITE DIRECTORY 'hdfs://localhost:8020/user/hive/test' (SELECT * FROM test_1mb);
