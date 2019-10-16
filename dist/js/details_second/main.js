"use strict";

(function cart() {
  var getCookie = function getCookie(name) {
    var cookie = document.cookie;
    var array = cookie.split("; ");
    var key_value;

    for (var i = 0; i < array.length; i++) {
      key_value = array[i].split("=");

      if (key_value[0] === name) {
        return key_value[1];
      }
    }

    return null;
  };

  var cart = $('#cart');
  var body = $('body');
  $('#cart-in').on("click", function () {
    cart.removeClass("slidebar");
    body.addClass("mask");
    $.ajax({
      url: "http://localhost/LV/dist/assets/api/getCart.php",
      method: "get",
      success: function success(res) {
        var result = JSON.parse(res);
        console.log(result);
        var data = result.data;
        var count = 0;
        data.forEach(function (d) {
          count += parseInt(d.count);
        });
        var dataArr = data.map(function (d) {
          return "\n                    <div class=\"commodity\">\n                        <button class=\"deleteShop\">x</button>\n                        <input type=\"hidden\" value=".concat(d.shopid, " class=\"hidden\">\n                        <img src=").concat(d.pic, " alt=\"\">\n                        <p class=\"infor\">").concat(d.shopname, "\xD7").concat(d.count, "</p>\n                        <button class=\"add\">+</button>\n                        <button class=\"sub\">-</button>\n                        <span class=\"unitPrice\">$").concat(parseInt(d.price) * parseInt(d.count), "</span>\n                    </div>\n                    ");
        });
        var dataStr = dataArr.join("").trim();
        var totalPrice = 0;
        data.forEach(function (d) {
          totalPrice += parseInt(d.price) * parseInt(d.count);
        });
        document.querySelector('.commodity-content').innerHTML = dataStr;
        document.querySelector('.content h2 span').innerHTML = count;
        document.querySelector('.totalPrice').innerHTML = "$".concat(totalPrice);
        var _ref = [document.querySelectorAll('.commodity .add'), document.querySelectorAll('.commodity .sub'), document.querySelectorAll('.commodity .deleteShop')],
            add = _ref[0],
            sub = _ref[1],
            del = _ref[2];
        console.log(add);

        for (var i = 0; i < add.length; i++) {
          add[i].addEventListener('click', function () {
            var inforHTML = this.parentElement.querySelector('.infor').innerHTML;
            var unitPriceHTML = this.parentElement.querySelector('.unitPrice').innerHTML;
            var shopid = this.parentElement.querySelector('.hidden').value;
            var num = inforHTML.split("×");
            var price = unitPriceHTML.split("$");
            var newPrice = parseInt(price[1]) + parseInt(price[1]) / parseInt(num[1]);
            var newNum = parseInt(num[1]) + 1;
            this.parentElement.querySelector('.infor').innerHTML = "".concat(num[0], "\xD7").concat(newNum);
            this.parentElement.querySelector('.unitPrice').innerHTML = "$".concat(newPrice);
            $.ajax({
              url: "http://localhost/LV/dist/assets/api/setCart.php",
              method: "post",
              data: {
                shopid: shopid,
                handle: "add"
              },
              success: function success(res) {
                console.log(res);
              }
            });
          });
        }

        for (var _i = 0; _i < sub.length; _i++) {
          sub[_i].addEventListener('click', function () {
            var inforHTML = this.parentElement.querySelector('.infor').innerHTML;
            var unitPriceHTML = this.parentElement.querySelector('.unitPrice').innerHTML;
            var shopid = this.parentElement.querySelector('.hidden').value;
            var num = inforHTML.split("×");
            var price = unitPriceHTML.split("$");
            var newPrice = parseInt(num[1]) <= 1 ? parseInt(price[1]) : parseInt(price[1]) - parseInt(price[1]) / parseInt(num[1]);
            var newNum = parseInt(num[1]) <= 1 ? 1 : parseInt(num[1]) - 1;
            this.parentElement.querySelector('.infor').innerHTML = "".concat(num[0], "\xD7").concat(newNum);
            this.parentElement.querySelector('.unitPrice').innerHTML = "$".concat(newPrice);
            $.ajax({
              url: "http://localhost/LV/dist/assets/api/setCart.php",
              method: "post",
              data: {
                shopid: shopid,
                handle: "sub"
              },
              success: function success(res) {
                console.log(res);
              }
            });
          });
        }

        for (var _i2 = 0; _i2 < del.length; _i2++) {
          del[_i2].addEventListener('click', function () {
            this.parentElement.remove();
            var shopid = this.parentElement.querySelector('.hidden').value;
            $.ajax({
              url: "http://localhost/LV/dist/assets/api/setCart.php",
              method: "post",
              data: {
                shopid: shopid,
                handle: "del"
              },
              success: function success(res) {
                console.log(res);
              }
            });
          });
        }
      }
    });
  });
  $('#guanbi').on('click', function () {
    cart.addClass("slidebar");
    body.removeClass("mask");
  });

  if (getCookie("PHPSESSID") === null) {
    console.log("没有获取到userid的cookie");
    $('#cart-in').unbind();
    $('#cart-in').css({
      cursor: "default"
    });
  } else {
    var login = document.querySelector('#login-in');

    login.onclick = function () {
      window.location.href = "http://localhost/LV/dist/html/myLv.html";
    };
  }
})();

(function login() {
  var login = $('#login');
  var body = $('body');
  $('#login-in').on('click', function () {
    login.removeClass("slidebar");
    body.addClass("mask");
  });
  $('#close').on('click', function () {
    login.addClass("slidebar");
    body.removeClass("mask");
  });
  $('#btn-login').on('click', function () {
    var _ref2 = [$('#username').val(), $('#password').val()],
        username = _ref2[0],
        password = _ref2[1];
    console.log(1);
    $.ajax({
      url: '/LV/dist/assets/api/login.php',
      method: 'post',
      data: {
        tel: username,
        password: password
      },
      success: function success(res) {
        //成功时调用
        var data = JSON.parse(res);

        if (data.status === 1) {
          window.location.href = "http://localhost/LV/dist/html/myLv.html";
        }
      },
      error: function error() {
        //失败时调用
        console.log(1112345);
      }
    });
  });
})();

(function request_data() {
  $('#home').css({
    cursor: "pointer",
    userSelect: "none"
  });
  $('#home').on("click", function () {
    window.location.href = "http://localhost/LV/dist/index.html";
  });

  window.onscroll = function () {
    if (needLoad()) {
      loadData();
    }
  };

  function needLoad() {
    var lastLi = document.querySelector('main ul li:last-of-type');
    var dist = lastLi.getBoundingClientRect().y;
    return dist <= window.innerHeight;
  }

  var startTime,
      start = 6,
      end = 6;

  function loadData() {
    var now = new Date();

    if (!startTime || now - startTime > 1000) {
      startTime = now;
      ajax(start, end);
      start += end;
    }
  }

  function ajax(start, end) {
    $.ajax({
      url: "/LV/dist/assets/api/shoes.php",
      method: "post",
      data: {
        start: start,
        end: end
      },
      success: function success(res) {
        var data = JSON.parse(res);

        if (data.status === 1) {
          var shoes = data.data;
          console.log(shoes);
          var arr = shoes.map(function (shoe) {
            return "\n                        <li>\n                            <a href=\"/LV/dist/html/details_third.html?id=".concat(shoe.id, "\">\n                                <img src=").concat(shoe.pic, " alt=\"\">\n                                <h3>").concat(shoe.name, "</h3>\n                                <p>$").concat(shoe.price, "</p>\n                            </a>\n                        </li>\n                    ");
          });
          arr = arr.join("");
          $('main ul')[0].innerHTML += arr;
        }
      }
    });
  }

  ajax(0, 6); // $.ajax({
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