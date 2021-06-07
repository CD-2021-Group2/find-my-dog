function postSigninData() {
    let id = document.querySelector('#id').value;
    let pw = document.querySelector('#pw').value;

    $.ajax({
        type: "POST",
        url: "/signin_data",
        data: {
            'id_give': id,
            'pw_give': pw
        },
        success: function (response) {
            if (response["result"] == "success") {
                localStorage.setItem('signinId', id)
                location.replace('/');
            } else {
                alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
            }
        }
    })

}