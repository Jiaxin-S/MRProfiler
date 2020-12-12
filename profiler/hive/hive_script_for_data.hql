CREATE DATABASE IF NOT EXISTS tutorial_db ;

USE tutorial_db;

CREATE TABLE IF NOT EXISTS  tutorial_db.order_json
(  id INT,
   description String,
   type String
)
ROW FORMAT delimited
FIELDS TERMINATED BY ','
STORED AS textfile;

LOAD DATA LOCAL inpath '/Users/jiaxinsu/Desktop/order.txt' OVERWRITE INTO TABLE tutorial_db.order_json;

INSERT OVERWRITE DIRECTORY 'hdfs://localhost:8020/user/hive/test' (SELECT * FROM order_json);
