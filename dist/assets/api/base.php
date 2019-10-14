<?php
$server_name="localhost";
$dbms_username="root";
$dbms_password="";
$db_name="lv";

$Db=new mysqli($server_name,$dbms_username,$dbms_password,$db_name);
if ($Db->connect_error){
    echo "数据库连接失败！$Db->connect_error";
    return;
}

//设定php读取数据库的编码格式
$Db->query('set names utf8');

