<?php
include "./base.php";
session_start();
$userid=$_SESSION["userid"];
$sql="select * from users where users.id='$userid'";
$res=$Db->query($sql);
if ($res->num_rows>0){
    $userinformation=$res->fetch_assoc();
    $result=array("status"=>1,"data"=>$userinformation);
    echo json_encode($result);
}else{
    $result=array("status"=>0);
    echo json_encode($result);
}

$Db->close();
