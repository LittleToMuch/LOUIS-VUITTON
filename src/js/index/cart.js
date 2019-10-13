const cart=$('#cart');
const body=$('body');
$('#cart-in').on("click",function () {
    cart.removeClass("slidebar");
    body.addClass("mask");
})
$('#guanbi').on('click', function () {
    cart.addClass("slidebar");
    body.removeClass("mask");
});