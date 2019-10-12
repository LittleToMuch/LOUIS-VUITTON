<?php
include "./base.php";

$username=$_GET['username'];
$result=array("status"=>0);
$sql="select id from users where users.username='$username'";
$res=$conn->query($sql);

if ($res->num_rows>0){
    //用户名存在，不可用
    echo json_encode($result);
}else{
    $result["status"]=1;
    echo json_encode($result);
}




$conn->close();