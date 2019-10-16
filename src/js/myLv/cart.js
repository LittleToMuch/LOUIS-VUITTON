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
                        <button class="deleteShop">x</button>
                        <input type="hidden" value=${d.shopid} class="hidden">
                        <img src=${d.pic} alt="">
                        <p class="infor">${d.shopname}×${d.count}</p>
                        <button class="add">+</button>
                        <button class="sub">-</button>
                        <span class="unitPrice">$${parseInt(d.price)*parseInt(d.count)}</span>
                    </div>
                    `;
                });
                let dataStr=dataArr.join("").trim();
                let totalPrice=0;
                data.forEach(d=>{
                    totalPrice+=(parseInt(d.price)*parseInt(d.count))
                })
                document.querySelector('.commodity-content').innerHTML=dataStr;
                document.querySelector('.content h2 span').innerHTML=count;
                document.querySelector('.totalPrice').innerHTML=`$${totalPrice}`;

                let [add,sub,del]=[document.querySelectorAll('.commodity .add'),document.querySelectorAll('.commodity .sub'),document.querySelectorAll('.commodity .deleteShop')];
                console.log(add);
                for (let i=0;i<add.length;i++){
                    add[i].addEventListener('click',function () {
                        let inforHTML=this.parentElement.querySelector('.infor').innerHTML;
                        let unitPriceHTML=this.parentElement.querySelector('.unitPrice').innerHTML;
                        let shopid=this.parentElement.querySelector('.hidden').value;
                        let num=inforHTML.split("×");
                        let price=unitPriceHTML.split("$");
                        let newPrice=parseInt(price[1])+parseInt(price[1])/parseInt(num[1]);
                        let newNum=parseInt(num[1])+1;
                        this.parentElement.querySelector('.infor').innerHTML=`${num[0]}×${newNum}`;
                        this.parentElement.querySelector('.unitPrice').innerHTML=`$${newPrice}`;
                        $.ajax({
                            url:"http://localhost/LV/dist/assets/api/setCart.php",
                            method: "post",
                            data:{
                                shopid:shopid,
                                handle:"add"
                            },
                            success(res){
                                console.log(res)
                            }
                        })
                    });
                }
                for (let i=0;i<sub.length;i++){
                    sub[i].addEventListener('click',function () {
                        let inforHTML=this.parentElement.querySelector('.infor').innerHTML;
                        let unitPriceHTML=this.parentElement.querySelector('.unitPrice').innerHTML;
                        let shopid=this.parentElement.querySelector('.hidden').value;
                        let num=inforHTML.split("×");
                        let price=unitPriceHTML.split("$");
                        let newPrice=parseInt(num[1])<=1?parseInt(price[1]):parseInt(price[1])-parseInt(price[1])/parseInt(num[1]);
                        let newNum=parseInt(num[1])<=1?1:parseInt(num[1])-1;
                        this.parentElement.querySelector('.infor').innerHTML=`${num[0]}×${newNum}`;
                        this.parentElement.querySelector('.unitPrice').innerHTML=`$${newPrice}`;
                        $.ajax({
                            url:"http://localhost/LV/dist/assets/api/setCart.php",
                            method: "post",
                            data:{
                                shopid:shopid,
                                handle:"sub"
                            },
                            success(res){
                                console.log(res)
                            }
                        })
                    })
                }
                for (let i=0;i<del.length;i++){
                    del[i].addEventListener('click',function () {
                        this.parentElement.remove();
                        let shopid=this.parentElement.querySelector('.hidden').value;
                        $.ajax({
                            url:"http://localhost/LV/dist/assets/api/setCart.php",
                            method: "post",
                            data:{
                                shopid:shopid,
                                handle:"del"
                            },
                            success(res){
                                console.log(res)
                            }
                        })
                    })
                }

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
