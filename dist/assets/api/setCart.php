<?php
include "./base.php";
session_start();
$shopid=$_POST["shopid"];
$shopName=$_POST["shopName"];
$shopPic=$_POST["shopPic"];
$shopPrice=$_POST["shopPrice"];
$userid=$_SESSION["userid"];
$sql="select count from cart where cart.id='$shopid'";
$res=$Db->query($sql);
if ($res->num_rows>0){
    $row=$res->fetch_assoc()["count"];
    $newRow=$row+1;
    $sql="UPDATE `cart` SET `count` = '$newRow' WHERE cart.id='$shopid'";
    $Db->query($sql);
    $result=array("status"=>1);
    echo json_encode($result);
}else{
    $sql="insert into cart (id,shopname,price,count,pic,userid) values (null,'$shopName','$shopPrice',1,'$shopPic','$userid')";
    $Db->query($sql);
    $result=array("status"=>1);
    echo json_encode($result);
}