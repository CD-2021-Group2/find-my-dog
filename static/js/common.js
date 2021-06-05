$(document).ready(function () {
	checkSigninStatus();
});

let signin_status = true;
let signinStatusEl = document.getElementById('signin_status');

function checkSigninStatus() {
    let signin_id = localStorage.getItem('signinId');
    if (signin_id) {
        signin_status = true;
        signinStatusEl.innerHTML = '';
        let element = `로그아웃`
        signinStatusEl.append(element);
    } else {
        signin_status = false;
    }
}

function changeSigninStatus() {
    if (signin_status == true) {
        localStorage.clear();
        signin_status = false;
        signinStatusEl.innerHTML = '';
        let element = `로그인`
        signinStatusEl.append(element);
        location.replace('/');
    } else {
        location.replace('/signin');
    }
}

function showSigninAlert() {
    if (signin_status == true) {
        alert('이미 로그인한 상태입니다.')
    } else {
        location.replace('/signin');
    }
}

function showMyPageAlert() {
    if (signin_status == true) {
        location.replace('/mypage');
    } else {
        alert('로그인이 필요한 페이지입니다.')
        location.replace('/signin');
    }
}

function showSearchAlert() {
    if (signin_status == true) {
        location.replace('/search');
    } else {
        alert('로그인이 필요한 페이지입니다.')
        location.replace('/signin');
    }
}

function showRegisterAlert() {
    if (signin_status == true) {
        location.replace('/register');
    } else {
        alert('로그인이 필요한 페이지입니다.')
        location.replace('/signin');
    }
}