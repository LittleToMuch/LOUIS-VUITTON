const login = $('#login');
const body=$('body');
$('#login-in').on('click', function () {
    login.removeClass("slidebar")
    body.addClass("mask")
});

$('#close').on('click', function () {
    login.addClass("slidebar")
    body.removeClass("mask")
});

$('#btn-login').on('click',function () {
    const [username,password]=[$('#username').val(),$('#password').val()];
    $.ajax({
        url:'/LV/dist/assets/api/login.php',
        method:'post',
        data:{
            username:username,
            password:password
        },
        success:function (res) {
            //成功时调用
            let data=JSON.parse(res);
            if (data.status===1){
                login.addClass("slidebar")
                body.removeClass("mask")
            }
        },
        error:function () {
            //失败时调用
        }
    })
});

