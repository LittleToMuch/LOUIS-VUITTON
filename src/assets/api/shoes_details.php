<?php
include "./base.php";
$id=$_GET["id"];
$sql="select * from shoes where shoes.id='$id'";
$res=$Db->query($sql);
if ($res->num_rows>0){
    $data=$res->fetch_assoc();
    $result=array("status"=>1,"data"=>$data);
    echo json_encode($result);
}else{
    $result=array("status"=>0,"data"=>"没有取到数据");
    echo json_encode($result);
}