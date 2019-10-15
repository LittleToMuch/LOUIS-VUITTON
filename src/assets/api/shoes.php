<?php
include "./base.php";

$start=$_POST["start"];
$end=$_POST["end"];
$sql="select * from shoes limit $start,$end";

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