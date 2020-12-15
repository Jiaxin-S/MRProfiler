CREATE DATABASE IF NOT EXISTS profiler_db ;

USE profiler_db;

CREATE TABLE IF NOT EXISTS  profiler_db.test_100mb
(  id INT,
   description String,
   type String
)
ROW FORMAT delimited
FIELDS TERMINATED BY ','
STORED AS textfile;

LOAD DATA LOCAL inpath '/Users/jiaxinsu/Desktop/MRProfiler/profiler/hive/data/100_mb.txt' INTO TABLE profiler_db.test_100mb;
LOAD DATA LOCAL inpath '/Users/jiaxinsu/Desktop/MRProfiler/profiler/hive/data/200_mb.txt' INTO TABLE profiler_db.test_100mb;
LOAD DATA LOCAL inpath '/Users/jiaxinsu/Desktop/MRProfiler/profiler/hive/data/300_mb.txt' INTO TABLE profiler_db.test_100mb;
LOAD DATA LOCAL inpath '/Users/jiaxinsu/Desktop/MRProfiler/profiler/hive/data/400_mb.txt' INTO TABLE profiler_db.test_100mb;
LOAD DATA LOCAL inpath '/Users/jiaxinsu/Desktop/MRProfiler/profiler/hive/data/500_mb.txt' INTO TABLE profiler_db.test_100mb;
LOAD DATA LOCAL inpath '/Users/jiaxinsu/Desktop/MRProfiler/profiler/hive/data/600_mb.txt' INTO TABLE profiler_db.test_100mb;
LOAD DATA LOCAL inpath '/Users/jiaxinsu/Desktop/MRProfiler/profiler/hive/data/700_mb.txt' INTO TABLE profiler_db.test_100mb;
LOAD DATA LOCAL inpath '/Users/jiaxinsu/Desktop/MRProfiler/profiler/hive/data/800_mb.txt' INTO TABLE profiler_db.test_100mb;
LOAD DATA LOCAL inpath '/Users/jiaxinsu/Desktop/MRProfiler/profiler/hive/data/900_mb.txt' INTO TABLE profiler_db.test_100mb;
LOAD DATA LOCAL inpath '/Users/jiaxinsu/Desktop/MRProfiler/profiler/hive/data/1_gb.txt' INTO TABLE profiler_db.test_100mb;

INSERT OVERWRITE DIRECTORY 'hdfs://localhost:8020/user/hive/test' (SELECT * FROM test_100mb);
