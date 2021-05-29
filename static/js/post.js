// MODAL ON&OFF
const modalEl = document.querySelector('#call-modal');
const bgEl = document.querySelector('.black-bg');
const modalOnBtn = document.querySelector('#modal-on-btn');
const modalOffBtn = document.querySelector('#modal-close-btn');

modalOnBtn.addEventListener('click', function () {
    bgEl.classList.remove('hide');
    modalEl.classList.remove('hide');
});

modalOffBtn.addEventListener('click', function () {
    bgEl.classList.add('hide');
    modalEl.classList.add('hide');
});

function getMyPostData() {
    let my_num = localStorage.getItem('numData');
    localStorage.removeItem('numData');
    getPostData(my_num);
}

function getPostData(num_select) {
    let num = num_select;

    $.ajax({
        type: "POST",
        url: "/post_data",
        data: {
            'num_give': num
        },
        success: function (response) {
            if (response["result"] == "success") {
                location.replace('/search/post');
                let post_data = response["post_data"];
                insertPostData(post_data);
            } else {
                alert("데이터 출력 실패");
            }
        }
    })

}

function insertPostData(post_data) {
    let img_url = post_data["img"];
    let num = post_data["num"];
    let breed = post_data["breed"];
    let sex = post_data["sex"];
    let wei = post_data["wei"];
    let b_year = post_data["b-year"];
    let color = post_data["color"];
    let r_date = post_data["reg-date"];
    let d_date = post_data["due-date"];
    let loc = post_data["loc"];
    let shel = post_data["shel"];
    let tel = post_data["tel"];
    let note = post_data["note"];

    // IMAGE
    let image = document.getElementById('image-box');
    image.src = img_url;

    // BREED TAGS
    $("#breed-tags").empty();
    let breed_element = `<div class="tag">${breed[0]}</div>
                    <div class="tag">${breed[1]}</div>
                    <div class="tag">${breed[2]}</div>`;
    $("#breed-tags").append(breed_element);

    // FEATURES
    $("#features").empty();
    let features_element = `<span class="sex">${sex}</span>/<span class="color">${color}</span>/<span class="birthyear">${b_year}</span>(년생)/<span class="weight">${wei}</span>(kg)`;
    $("#features").append(features_element);

    // DETAILS
    $("#details").empty();
    let details_element = `<li class="number">공고번호: <span>${num}</span></li>
                            <li class="date">공고기간: <span>${r_date} ~ ${d_date}</span></li>
                            <li class="location">발견장소: <span>${loc}</span></li>
                            <li class="shelter">보호센터: <span>${shel}</span></li>
                            <li class="note">특이사항: <span>${note}</span></li>`;
    $("#details").append(details_element);

    // CALL-MODAL
    $("#call-modal > div.inner > div.contact").empty();
    let call_modal_element = `<div class="shelter">${shel}</div>
                                <div class="tel">(TEL) <span>${tel}</span></div>`;
    $("#call-modal > div.inner > div.contact").append(call_modal_element);
}