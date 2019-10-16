<?php
include "./base.php";
session_start();
$shopid=$_POST["shopid"];
$shopName=$_POST["shopName"];
$shopPic=$_POST["shopPic"];
$shopPrice=$_POST["shopPrice"];
$userid=$_SESSION["userid"];

$sql="select count from cart where cart.shopid='$shopid'";
$res=$Db->query($sql);
if ($res->num_rows>0){
    $handle=$_POST["handle"];
    $row=$res->fetch_assoc()["count"];
    if ($handle=="add"){
        $newRow=$row+1;
        $sql="UPDATE `cart` SET `count` = '$newRow' WHERE shopid='$shopid'";
        $Db->query($sql);
        $result=array("status"=>1);
        echo json_encode($result);
    }else if ($handle=="sub"){
        $newRow=$row-1;
        $sql="UPDATE `cart` SET `count` = '$newRow' WHERE shopid='$shopid'";
        $Db->query($sql);
        $result=array("status"=>1);
        echo json_encode($result);
    }else{
        $sql="DELETE FROM `cart` WHERE shopid = '$shopid'";
        $Db->query($sql);
        $result=array("status"=>1);
        echo json_encode($result);
    }
}else{
    $sql="insert into cart (id,shopid,shopname,price,count,pic,userid) values (null,'$shopid','$shopName','$shopPrice',1,'$shopPic','$userid')";
    $Db->query($sql);
    $result=array("status"=>1);
    echo json_encode($result);
}