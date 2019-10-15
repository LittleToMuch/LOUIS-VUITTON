(function f() {
    let href=window.location.href;
    let hrefArr=href.split("?");
    let params=hrefArr[1];
    let paramsArr=params.split("&");
    let id=paramsArr.map(pA=>{
        let arr=pA.split("=");
        let key=arr[0];
        let value=arr[1];
        return {
            key:key,
            value:value
        }
    });
    $.ajax({
        url:"http://localhost/LV/dist/assets/api/shoes_details.php",
        method:"get",
        data:{
            id:id[0].value
        },
        success:function (res) {
            let result=JSON.parse(res);
            if (result.status===1){
                console.log(result.data);
                let data=result.data;
                let template=`
                <div class="left">
                    <button class="back"><span class="iconfont">&#xe625;</span></button>
                    <img src=${data.pic} alt="">
                    <p>${data.intro}</p>
                </div>
                <div class="right">
                    <div class="content">
                        <h2>${data.name}</h2>
                        <div class="size-select">
                            <label for="size">尺寸：</label>
                            <select name="size" id="size">
                                <option value="" disabled>请选择合适的尺寸</option>
                                <option value="05.0">05.0</option>
                                <option value="05.5">05.5</option>
                                <option value="06.0">06.0</option>
                                <option value="06.5">06.5</option>
                                <option value="07.0">07.0</option>
                                <option value="07.5">07.5</option>
                                <option value="08.0" selected>08.0</option>
                                <option value="08.5">08.5</option>
                                <option value="09.0">09.0</option>
                                <option value="09.5">09.5</option>
                            </select>
                        </div>
                        <p>￥${data.price}</p>
                        <button class="cart-buy">放入购物袋</button>
                        <h5>中国大陆地区尊享顺丰免费配送</h5>
                    </div>
                </div>
                `;

                $('main').html(template);
                $('.back').on('click',function () {
                    window.history.back();
                });
                $('.cart-buy').on('click',function () {
                    if (getCookie("PHPSESSID")===null){
                        $('#login').removeClass("slidebar");
                        $('body').addClass("mask")
                    }else{
                        //加入购物车
                        $.ajax({
                            url:"http://localhost/LV/dist/assets/api/setCart.php",
                            method: "post",
                            data:{
                                shopid:data.id,
                                shopName:data.name,
                                shopPic:data.pic,
                                shopPrice:data.price
                            },
                            success:function (res) {
                                console.log(res);
                                let data=JSON.parse(res);
                                if (data.status===1){
                                    let div=document.createElement('div');
                                    div.className='tishi';
                                    div.innerHTML="添加购物车成功~";
                                    div.style.position="absolute";
                                    div.style.zIndex="9999";
                                    div.style.opacity="1";
                                    div.style.top=`300px`;
                                    div.style.left=`-300px`;
                                    div.style.width=`100px`;
                                    div.style.height=`100px`;
                                    div.style.backgroundColor=`cyan`;
                                    document.querySelector('#cart').appendChild(div);
                                    setTimeout(()=>{
                                        document.querySelector('.tishi').remove();
                                    },3000)
                                }
                            }
                        })
                    }
                })
            }else{

            }
        }
    });

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

})();