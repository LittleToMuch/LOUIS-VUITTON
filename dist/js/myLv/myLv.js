"use strict";

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
$('#index').on("click", function () {
  window.location.href = "http://localhost/LV/dist/index.html";
});