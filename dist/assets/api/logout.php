<?php
session_start();
if (isset($_COOKIE[session_name()])){
    setcookie(session_name(),"",time()-1,'/');
}
session_destroy();

$res=array("status"=>1);
echo json_encode($res);
