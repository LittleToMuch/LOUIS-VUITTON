"use strict";

(function banner() {
  var currentIndex = 0;

  function slideTo(index) {
    if (index === 3) {
      index = currentIndex = 0;
    }

    if (index === -1) {
      index = currentIndex = 2;
    }

    var imgs = document.querySelectorAll('#banner img');
    var content = document.querySelectorAll('#desc .content');
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

  $('#right').on('click', function () {
    slideNext();
  });
  $('#left').on('click', function () {
    slidePrev();
  });
  var id;

  function auto(time) {
    id = setInterval(function () {
      slideNext();
    }, time);
  }

  function stop() {
    clearInterval(id);
  }

  auto(7000);
})();

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