const login = $('#login');
$('#login-in').on('click', function () {
    login.removeClass("slidebar")
});

$('#close').on('click', function () {
    login.addClass("slidebar")
});

