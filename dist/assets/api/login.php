<?php
include "./base.php";
session_start();
$username=$_POST['tel'];
$password=$_POST['password'];
$password=md5($password);
$sql="select id from users where users.tel='$username' and users.password='$password'";
$res=$Db->query($sql);
if ($res->num_rows>0){
    $userid=$res->fetch_assoc()["id"];
    $_SESSION["userid"]=$userid;
    $result=array("status"=>1);
    echo json_encode($result);
//    header("Location:http://localhost/LV/dist/html/myLv.html");
}else{
    $result=array("status"=>0);
    echo json_encode($result);
}

$Db->close();