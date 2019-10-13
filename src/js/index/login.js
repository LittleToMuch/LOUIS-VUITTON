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
    console.log(1);
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
                window.location.href="http://localhost/LV/dist/html/myLv.html";
            }
        },
        error:function () {
            //失败时调用
            console.log(1112345)
        }
    })
});

// let num=1;
// $('#right').on('click',function () {
//     if (i<4){
//         $('#bannerPic').attr("src",`./assets/img/banner${++num}.jpg`);
//     }else{
//         $('#bannerPic').attr("src","./assets/img/banner1.jpg")
//         i=1;
//     }
//
// });
// $('#left').on('click',function () {
//     if (i>0){
//         $('#bannerPic').attr("src",`./assets/img/banner${--num}.jpg`)
//     }else{
//         $('#bannerPic').attr("src","./assets/img/banner3.jpg");
//         i=3;
//     }
// });



