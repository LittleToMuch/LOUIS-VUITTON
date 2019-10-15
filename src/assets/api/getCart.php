<?php
session_start();
include './base.php';
$userid=$_SESSION["userid"];
$sql="select * from cart where cart.userid='$userid'";
$res=$Db->query($sql);
if ($res->num_rows>0){
    $data=array();
    $row=$res->fetch_assoc();
    while ($row!=null){
        $data[]=$row;
        $row=$res->fetch_assoc();
    }
    $result=array("status"=>1,"data"=>$data);
    echo json_encode($result);
}else{
    $result=array("status"=>0);
    echo json_encode($result);
}
$Db->close();