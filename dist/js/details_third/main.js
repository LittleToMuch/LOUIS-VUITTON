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
          return "\n                    <div class=\"commodity\">\n                        <img src=".concat(d.pic, " alt=\"\">\n                        <p class=\"infor\">").concat(d.shopname, "\xD7").concat(d.count, "</p>\n                        <span class=\"unitPrice\">$").concat(parseInt(d.price) * parseInt(d.count), "</span>\n                    </div>\n                    ");
        });
        var dataStr = dataArr.join("").trim();
        var totalPrice = 0;
        data.forEach(function (d) {
          totalPrice += parseInt(d.price) * parseInt(d.count);
        });
        document.querySelector('.commodity-content').innerHTML = dataStr;
        document.querySelector('.content h2 span').innerHTML = count;
        document.querySelector('.totalPrice').innerHTML = "$".concat(totalPrice);
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
    var _ref = [$('#username').val(), $('#password').val()],
        username = _ref[0],
        password = _ref[1];
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

(function f() {
  var href = window.location.href;
  var hrefArr = href.split("?");
  var params = hrefArr[1];
  var paramsArr = params.split("&");
  var id = paramsArr.map(function (pA) {
    var arr = pA.split("=");
    var key = arr[0];
    var value = arr[1];
    return {
      key: key,
      value: value
    };
  });
  $.ajax({
    url: "http://localhost/LV/dist/assets/api/shoes_details.php",
    method: "get",
    data: {
      id: id[0].value
    },
    success: function success(res) {
      var result = JSON.parse(res);

      if (result.status === 1) {
        console.log(result.data);
        var data = result.data;
        var template = "\n                <div class=\"left\">\n                    <button class=\"back\"><span class=\"iconfont\">&#xe625;</span></button>\n                    <img src=".concat(data.pic, " alt=\"\">\n                    <p>").concat(data.intro, "</p>\n                </div>\n                <div class=\"right\">\n                    <div class=\"content\">\n                        <h2>").concat(data.name, "</h2>\n                        <div class=\"size-select\">\n                            <label for=\"size\">\u5C3A\u5BF8\uFF1A</label>\n                            <select name=\"size\" id=\"size\">\n                                <option value=\"\" disabled>\u8BF7\u9009\u62E9\u5408\u9002\u7684\u5C3A\u5BF8</option>\n                                <option value=\"05.0\">05.0</option>\n                                <option value=\"05.5\">05.5</option>\n                                <option value=\"06.0\">06.0</option>\n                                <option value=\"06.5\">06.5</option>\n                                <option value=\"07.0\">07.0</option>\n                                <option value=\"07.5\">07.5</option>\n                                <option value=\"08.0\" selected>08.0</option>\n                                <option value=\"08.5\">08.5</option>\n                                <option value=\"09.0\">09.0</option>\n                                <option value=\"09.5\">09.5</option>\n                            </select>\n                        </div>\n                        <p>\uFFE5").concat(data.price, "</p>\n                        <button class=\"cart-buy\">\u653E\u5165\u8D2D\u7269\u888B</button>\n                        <h5>\u4E2D\u56FD\u5927\u9646\u5730\u533A\u5C0A\u4EAB\u987A\u4E30\u514D\u8D39\u914D\u9001</h5>\n                    </div>\n                </div>\n                ");
        $('main').html(template);
        $('.back').on('click', function () {
          window.history.back();
        });
        $('.cart-buy').on('click', function () {
          if (getCookie("PHPSESSID") === null) {
            $('#login').removeClass("slidebar");
            $('body').addClass("mask");
          } else {
            //加入购物车
            $.ajax({
              url: "http://localhost/LV/dist/assets/api/setCart.php",
              method: "post",
              data: {
                shopid: data.id,
                shopName: data.name,
                shopPic: data.pic,
                shopPrice: data.price
              },
              success: function success(res) {
                console.log(res);
                var data = JSON.parse(res);

                if (data.status === 1) {
                  var div = document.createElement('div');
                  div.className = 'tishi';
                  div.innerHTML = "添加购物车成功~";
                  div.style.position = "absolute";
                  div.style.zIndex = "9999";
                  div.style.opacity = "1";
                  div.style.top = "300px";
                  div.style.left = "-300px";
                  div.style.width = "100px";
                  div.style.height = "100px";
                  div.style.backgroundColor = "cyan";
                  document.querySelector('#cart').appendChild(div);
                  setTimeout(function () {
                    document.querySelector('.tishi').remove();
                  }, 3000);
                }
              }
            });
          }
        });
      } else {}
    }
  });

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
})();