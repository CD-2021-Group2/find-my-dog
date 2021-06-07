function postJoinData() {
    let id = document.querySelector('#id').value;
    let pw = document.querySelector('#pw').value;
    let pw_check = document.querySelector('#pw_check').value;
    let c_name = document.querySelector('#name').value;
    let dept = document.querySelector('#dept').value;

    if (pw === pw_check) {
        $.ajax({
            type: "POST",
            url: "/join_data",
            data: {
                'id_give': id,
                'pw_give': pw,
                'name_give': c_name,
                'dept_give': dept,
            },
            success: function (response) {
                if (response["result"] == "success") {
                    alert("회원가입 성공");
                    location.replace('/signin');
                } else {
                    alert("회원가입 실패");
                }
            }
        })
    } else {
        alert("비밀번호가 일치하지 않습니다.");
    }
}