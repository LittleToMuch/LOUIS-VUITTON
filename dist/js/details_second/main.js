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

(function request_data() {
  $('#home').css({
    cursor: "pointer",
    userSelect: "none"
  });
  $('#home').on("click", function () {
    window.location.href = "http://localhost/LV/dist/index.html";
  });
  $.ajax({
    url: "/LV/dist/assets/api/shoes.php",
    method: "get",
    success: function success(res) {
      var data = JSON.parse(res);
      console.log(data);

      if (data.status === 1) {
        var shoes = data.data;
        var arr = shoes.map(function (shoe) {
          return "\n                        <li>\n                            <a href=\"/LV/dist/html/details_third.html?id=".concat(shoe.id, "\">\n                                <img src=").concat(shoe.pic, " alt=\"\">\n                                <h3>").concat(shoe.name, "</h3>\n                                <p>$").concat(shoe.price, "</p>\n                            </a>\n                        </li>\n                    ");
        });
        $('main ul').html(arr);
      }
    }
  });
})();