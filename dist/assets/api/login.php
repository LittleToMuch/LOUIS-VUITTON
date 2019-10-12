<?php
include "./base.php";

$username=$_POST['username'];
$password=$_POST['password'];
$password=md5($password);
$sql="select id from users where users.username='$username' and users.password='$password'";
$res=$conn->query($sql);
if ($res->num_rows>0){
    $userid=$res->fetch_assoc()["id"];
    header("set-cookie:userid=$userid;path=/");
    $result=array("status"=>1);
    echo json_encode($result);
}else{
    $result=array("status"=>0);
    echo json_encode($result);
}

$conn->close();