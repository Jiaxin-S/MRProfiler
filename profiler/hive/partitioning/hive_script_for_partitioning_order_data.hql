CREATE DATABASE IF NOT EXISTS profiler_db;

USE profiler_db;

CREATE TABLE IF NOT EXISTS  profiler_db.hiveFirstPartitionedTable
(
   order_id INT,
   order_date STRING,
   cust_id INT
)
PARTITIONED BY (order_status STRING)
ROW FORMAT delimited
FIELDS TERMINATED BY  ','
STORED AS textfile;

LOAD DATA LOCAL inpath '/Users/jiaxinsu/Desktop/MRProfiler/profiler/hive/partitioning/order.txt' OVERWRITE INTO TABLE profiler_db.hiveFirstPartitionedTable;

INSERT OVERWRITE DIRECTORY 'hdfs://localhost:8020/user/hive/test/partitioning' (SELECT * FROM hiveFirstPartitionedTable);
