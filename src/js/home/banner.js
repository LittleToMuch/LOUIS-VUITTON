(function banner() {
    let currentIndex=0;
    function slideTo(index) {
        if (index===3){
            index=currentIndex=0;
        }
        if (index===-1){
            index=currentIndex=2;
        }
        const imgs=document.querySelectorAll('#banner img');
        const content=document.querySelectorAll('#desc .content');
        $('#banner .current').removeClass('current');
        $(imgs[index]).addClass('current');

        $('#desc .current').removeClass('current');
        $(content[index]).addClass('current');
    }
    function slideNext() {
        currentIndex++;
        slideTo(currentIndex);
    }
    function slidePrev() {
        currentIndex--;
        slideTo(currentIndex);
    }
    $('#right').on('click',function () {
        slideNext();
    })
    $('#left').on('click',function () {
        slidePrev();
    })
    let id;
    function auto(time) {
        id=setInterval(()=>{
            slideNext()
        },time)
    }
    function stop() {
        clearInterval(id);
    }
    auto(7000)
})();