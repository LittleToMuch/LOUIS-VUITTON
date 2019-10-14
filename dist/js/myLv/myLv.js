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
    console.log(1111);
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
    console.log(123456);
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