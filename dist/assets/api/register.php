<?php
include './base.php';

$username=$_POST['username'];
$password=$_POST['password'];
$age=$_POST['age'];
$sex=$_POST['sex'];
$tel=$_POST['tel'];
$password=md5($password);

if ($username==null||$password==null||$age==null||$sex==null||$tel==null){
    echo "<h1>注册信息不得为空!,3s返回注册页</h1>";
    header("Refresh:3;url=http://localhost/LV/dist/html/register.html");
    return;
}

//检测用户名是否存在

$sql="select id from users where users.username='$username'";
$res=$conn->query($sql);
$result=array("status"=>0);
if ($res->num_rows>0){
    echo json_encode($result);
    return;
}else{
    $sql="insert into users (id,username,password,tel,age,sex) values (null,'$username','$password','$tel','$age','$sex')";
    $res=$conn->query($sql);
    if ($res){
        echo "<h1>注册成功，3s后返回主页</h1>";
        header("Refresh:3;url=http://localhost/LV/dist/index.html");
    }else{
        echo json_encode($result);
    }
}

$conn->close();