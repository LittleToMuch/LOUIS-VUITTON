(function request_data() {
    $('#home').css({
        cursor:"pointer",
        userSelect:"none"
    });
    $('#home').on("click",function () {
        window.location.href="http://localhost/LV/dist/index.html"
    });
    window.onscroll=function(){
        if (needLoad()){
            loadData();
        }
    };
    function needLoad(){
        let lastLi=document.querySelector('main ul li:last-of-type');
        let dist=lastLi.getBoundingClientRect().y;
        return dist<=window.innerHeight;
    }
    let startTime,start=6,end=6;
    function loadData(){
        let now=new Date();
        if (!startTime||now-startTime>1000){
            startTime=now;
            ajax(start,end);
            start+=end;
        }
    }
    function ajax(start,end){
        $.ajax({
            url:"/LV/dist/assets/api/shoes.php",
            method:"post",
            data:{
                start:start,
                end:end
            },
            success:function (res) {
                let data=JSON.parse(res);
                if (data.status===1){
                    let shoes=data.data;
                    console.log(shoes);
                    let arr=shoes.map(shoe=>{
                        return `
                        <li>
                            <a href="/LV/dist/html/details_third.html?id=${shoe.id}">
                                <img src=${shoe.pic} alt="">
                                <h3>${shoe.name}</h3>
                                <p>$${shoe.price}</p>
                            </a>
                        </li>
                    `
                    });
                    arr=arr.join("");
                    $('main ul')[0].innerHTML+=arr;
                }
            }
        })
    }
        ajax(0,6);


    // $.ajax({
    //     url:"/LV/dist/assets/api/shoes.php",
    //     method:"get",
    //     success:function (res) {
    //         let data=JSON.parse(res);
    //         console.log(data);
    //         if (data.status===1){
    //             let shoes=data.data;
    //             let arr=shoes.map(shoe=>{
    //                 return `
    //                     <li>
    //                         <a href="/LV/dist/html/details_third.html?id=${shoe.id}">
    //                             <img src=${shoe.pic} alt="">
    //                             <h3>${shoe.name}</h3>
    //                             <p>$${shoe.price}</p>
    //                         </a>
    //                     </li>
    //                 `
    //             });
    //             $('main ul').html(arr);
    //         }
    //     }
    // })
})();