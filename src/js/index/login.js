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

