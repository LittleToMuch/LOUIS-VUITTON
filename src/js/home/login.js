(function login() {
    const login = $('#login');
    const body = $('body');
    $('#login-in').on('click', function () {
        login.removeClass("slidebar")
        body.addClass("mask")
    });

    $('#close').on('click', function () {
        login.addClass("slidebar")
        body.removeClass("mask")
    });

    $('#btn-login').on('click', function () {
        const [username, password] = [$('#username').val(), $('#password').val()];
        console.log(1);
        $.ajax({
            url: '/LV/dist/assets/api/login.php',
            method: 'post',
            data: {
                tel: username,
                password: password
            },
            success: function (res) {
                //成功时调用
                let data = JSON.parse(res);
                if (data.status === 1) {
                    window.location.href = "http://localhost/LV/dist/html/myLv.html";
                }
            },
            error: function () {
                //失败时调用
                console.log(1112345)
            }
        })
    });
})()






