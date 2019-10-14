(function cart() {
    let getCookie=function (name) {
        let cookie=document.cookie;
        let array=cookie.split("; ");
        let key_value;
        for (let i=0;i<array.length;i++){
            key_value=array[i].split("=");
            if (key_value[0]===name){
                return key_value[1];
            }
        }
        return null;
    };
    const cart = $('#cart');
    const body = $('body');
    $('#cart-in').on("click", function () {
        console.log(1111);
        cart.removeClass("slidebar");
        body.addClass("mask");
    })
    $('#guanbi').on('click', function () {
        cart.addClass("slidebar");
        body.removeClass("mask");
    });
    if (getCookie("PHPSESSID")===null){
        console.log("没有获取到userid的cookie");
        $('#cart-in').unbind();
        $('#cart-in').css({
            cursor:"default"
        })
    }else{
        console.log(123456)
    }

})();