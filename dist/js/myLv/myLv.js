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

$.ajax({
  url: '/LV/dist/assets/api/myLv.php',
  method: 'post',
  success: function success(res) {
    var result = JSON.parse(res);
    $('.username').html("\u8D26\u53F7:".concat(result.data.username));
    $('.tel').html("\u624B\u673A\u53F7\u7801:".concat(result.data.tel));
  }
});
$('#name').on("click", function () {
  $.ajax({
    url: '/LV/dist/assets/api/logout.php',
    method: 'post',
    success: function success(res) {
      var result = JSON.parse(res);

      if (result.status === 1) {
        window.location.href = "http://localhost/LV/dist/index.html";
      }
    }
  });
});
$('#home').on("click", function () {
  window.location.href = "http://localhost/LV/dist/index.html";
});