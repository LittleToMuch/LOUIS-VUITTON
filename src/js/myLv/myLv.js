$.ajax({
    url:'/LV/dist/assets/api/myLv.php',
    method:'post',
    success:function (res) {
        let result=JSON.parse(res);
        $('.username').html(`账号:${result.data.username}`);
        $('.tel').html(`手机号码:${result.data.tel}`);
    }
});

$('#name').on("click",function () {
    console.log(1);
    $.ajax({
        url:'/LV/dist/assets/api/logout.php',
        method: 'post',
        success:function (res) {
            let result=JSON.parse(res);
            if (result.status===1){
                window.location.href="http://localhost/LV/dist/index.html";
            }
        }
    })
});

$('#index').on("click",function () {
    window.location.href="http://localhost/LV/dist/index.html"
});