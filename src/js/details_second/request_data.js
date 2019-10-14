(function request_data() {
    $('#home').css({
        cursor:"pointer",
        userSelect:"none"
    })
    $('#home').on("click",function () {
        window.location.href="http://localhost/LV/dist/index.html"
    });
    // window.onscroll=function(){
    //     if (needLoad()){
    //         loadData();
    //     }
    // };
    // function needLoad(){
    //     let lastLi=document.querySelector('ul li:last-of-type');
    //     let dist=lastLi.getBoundingClientRect().y;
    //     return dist<=window.innerHeight;
    // }
    // let start;
    // function loadData(){
    //     let now=new Date();
    //     if (!start||now-start>1000){
    //         start=now;
    //         $.ajax({
    //             url:"/LV/dist/assets/api/shoes.php",
    //             method:"get",
    //             success:function (res) {
    //                 let data=JSON.parse(res);
    //                 console.log(data);
    //                 if (data.status===1){
    //                     let shoes=data.data;
    //                     let arr=shoes.map(shoe=>{
    //                         return `
    //                     <li>
    //                         <a href="/LV/dist/html/details_third.html?id=${shoe.id}">
    //                             <img src=${shoe.pic} alt="">
    //                             <h3>${shoe.name}</h3>
    //                             <p>$${shoe.price}</p>
    //                         </a>
    //                     </li>
    //                 `
    //                     });
    //                     $('main ul').html(arr);
    //                 }
    //             }
    //         })
    //
    //     }
    // }
    $.ajax({
        url:"/LV/dist/assets/api/shoes.php",
        method:"get",
        success:function (res) {
            let data=JSON.parse(res);
            console.log(data);
            if (data.status===1){
                let shoes=data.data;
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
                $('main ul').html(arr);
            }
        }
    })
})();