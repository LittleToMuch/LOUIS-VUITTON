"use strict";

var _ref = [document.querySelector('#username'), document.querySelector('#password'), document.querySelector('#repassword'), document.querySelector('#age'), document.querySelector('#tel'), document.getElementsByName('sex')],
    username = _ref[0],
    password = _ref[1],
    repassword = _ref[2],
    age = _ref[3],
    tel = _ref[4],
    sex = _ref[5];
var regUN = /^[a-zA-Z0-9_-]{4,16}$/,
    regPW = /^.*(?=.{6,})(?=.*\d)(?=.*[!@#$%^&*?=+\- ]).*$/,
    regTel = /^1[3-9]\d{9}$/;
var btn = document.querySelector('#reg');
var input = document.getElementsByTagName('input');

username.onchange = function () {
  if (!regUN.test(this.value)) {
    this.parentElement.classList.add('has-error');
    btn.setAttribute('disabled', 'disabled');
    this.parentElement.nextElementSibling.style.display = 'block';
  } else {
    this.parentElement.classList.remove('has-error');
    this.parentElement.nextElementSibling.style.display = 'none';
  }

  biu();
};

password.onchange = function () {
  if (!regPW.test(this.value)) {
    this.parentElement.classList.add('has-error');
    btn.setAttribute('disabled', 'disabled');
    this.parentElement.nextElementSibling.style.display = 'block';
  } else {
    this.parentElement.classList.remove('has-error');
    this.parentElement.nextElementSibling.style.display = 'none';
  }

  biu();
};

repassword.onchange = function () {
  if (this.value !== password.value) {
    this.parentElement.classList.add('has-error');
    btn.setAttribute('disabled', 'disabled');
    this.parentElement.nextElementSibling.style.display = 'block';
  } else {
    this.parentElement.classList.remove('has-error');
    this.parentElement.nextElementSibling.style.display = 'none';
  }

  biu();
};

tel.onchange = function () {
  if (!regTel.test(this.value)) {
    this.parentElement.classList.add('has-error');
    btn.setAttribute('disabled', 'disabled');
    this.parentElement.nextElementSibling.style.display = 'block';
  } else {
    this.parentElement.classList.remove('has-error');
    this.parentElement.nextElementSibling.style.display = 'none';
  }
};

for (var i = 5; i < 55; i++) {
  var option = document.createElement('option');
  option.setAttribute('value', i);
  option.innerHTML = "".concat(i, "\u5C81");
  age.appendChild(option);
}

function biu() {
  for (var _i = 0; _i < input.length; _i++) {
    if (input[_i].parentElement.classList.contains('has-error')) {
      return;
    }
  }

  btn.removeAttribute('disabled');
}
/*-------------------------------------------------------------------------------------------------------------*/


document.querySelector('#username').onblur = function () {
  //1.取得这个input的value
  var user = this.value; //2.发送一个请求给后端，带着用户名

  var xhr = new XMLHttpRequest();
  xhr.open('GET', "/LV/dist/assets/api/checkuser.php?username=".concat(user), true);
  xhr.send();

  xhr.onload = function () {
    //相当于onreadystatechange中，readyState===4的情况
    if (this.status >= 200 && this.status < 300) {
      //响应了
      //php echo的内容，就是我们的this.responseText
      // console.log(this.responseText)
      var data = JSON.parse(this.responseText);

      if (data.status === '0') {
        console.log("用户名已存在");
        document.querySelector('#username').parentElement.classList.add('has-error');
        document.querySelector('#reg').setAttribute('disabled', 'disabled');
        document.querySelector('.repeat').style.display = "block";
      } else {
        document.querySelector('#reg').removeAttribute('disabled');
        document.querySelector('.repeat').style.display = "none";
      }
    } else {//请求失败
    }
  }; //3.等待响应，根据结果来显示用户名是否可用

};