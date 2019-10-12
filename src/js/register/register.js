const [username, password, repassword, age, tel, sex] = [document.querySelector('#username'),
    document.querySelector('#password'),
    document.querySelector('#repassword'),
    document.querySelector('#age'),
    document.querySelector('#tel'),
    document.getElementsByName('sex')];
const [regUN, regPW, regTel] = [/^[a-zA-Z0-9_-]{4,16}$/, /^.*(?=.{6,})(?=.*\d)(?=.*[!@#$%^&*?=+\- ]).*$/, /^1[3-9]\d{9}$/];
const btn = document.querySelector('#reg');
const input = document.getElementsByTagName('input');
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

for (let i = 5; i <55 ; i++) {
    let option = document.createElement('option');
    option.setAttribute('value', i);
    option.innerHTML = `${i}岁`;
    age.appendChild(option);
}

function biu() {
    for (let i = 0; i < input.length; i++) {
        if (input[i].parentElement.classList.contains('has-error')) {
            return;
        }
    }
    btn.removeAttribute('disabled');
}



/*-------------------------------------------------------------------------------------------------------------*/
document.querySelector('#username').onblur=function () {
    //1.取得这个input的value
    let user=this.value;
    //2.发送一个请求给后端，带着用户名
    let xhr=new XMLHttpRequest();
    xhr.open('GET',`/LV/dist/assets/api/checkuser.php?username=${user}`,true);
    xhr.send();
    xhr.onload=function () {
        //相当于onreadystatechange中，readyState===4的情况

        if (this.status>=200&&this.status<300){
            //响应了
            //php echo的内容，就是我们的this.responseText
            // console.log(this.responseText)
            let data=JSON.parse(this.responseText);
            if (data.status==='0'){
                console.log("用户名已存在")
                document.querySelector('#username').parentElement.classList.add('has-error');
                document.querySelector('#reg').setAttribute('disabled', 'disabled');
                document.querySelector('.repeat').style.display="block";
            }else{
                document.querySelector('#reg').removeAttribute('disabled');
                document.querySelector('.repeat').style.display="none";
            }
        }else {
            //请求失败
        }
    }


    //3.等待响应，根据结果来显示用户名是否可用
}