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
        cart.removeClass("slidebar");
        body.addClass("mask");
        $.ajax({
            url:"http://localhost/LV/dist/assets/api/getCart.php",
            method:"get",
            success:function (res) {
                let result=JSON.parse(res);
                console.log(result);
                let data=result.data;
                let count=0;
                data.forEach(d=>{
                    count+=parseInt(d.count);
                });
                let dataArr=data.map(d=>{
                    return `
                    <div class="commodity">
                        <img src=${d.pic} alt="">
                        <p class="infor">${d.shopname}×${d.count}</p>
                        <span class="unitPrice">$${parseInt(d.price)*parseInt(d.count)}</span>
                    </div>
                    `;
                })
                let dataStr=dataArr.join("").trim();
                let totalPrice=0;
                data.forEach(d=>{
                    totalPrice+=(parseInt(d.price)*parseInt(d.count))
                })
                document.querySelector('.commodity-content').innerHTML=dataStr;
                document.querySelector('.content h2 span').innerHTML=count;
                document.querySelector('.totalPrice').innerHTML=`$${totalPrice}`;
            }
        })
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
        let login=document.querySelector('#login-in');
        login.onclick=function () {
            window.location.href="http://localhost/LV/dist/html/myLv.html"
        }
    }
})();
