$(document).ready(function () {
    getSearchData(0);
});

// MODAL ON&OFF
const modalEl = document.querySelector('.search-modal');
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
    updateOptions();
});

// OPTIONS
function updateOptions() {
    let breed = document.querySelector('#breed').value;
    let sex = document.querySelector('#sex').value;
    let b_year = document.querySelector('#birth-year').value;
    let color = document.querySelector('#color').value;
    let dist = document.querySelector('#district').value;

    var dict = {}
    dict['breed'] = breed;
    dict['sex'] = sex;
    dict['b_year'] = b_year;
    dict['color'] = color;
    dict['dist'] = dist;

    for (var key in dict) {
        if (dict[key] == 'all') {
            delete dict[key];
        }
    }

    if (Object.keys(dict).length != 0) {
        $("#keyword-box").empty();

        for (var key in dict) {
            let temp_html = `<div class="key-word">${dict[key]}</div>`
            $("#keyword-box").append(temp_html);
        }

        let button_html = `<button id="modal-on-btn"><span class="material-icons">add_circle</span></button>`
        $("#keyword-box").append(button_html);

        dict = JSON.stringify(dict);

        getSearchData(dict);
    }
}

// SEARCH
function getSearchData(options) {
    let opts = options;

    $.ajax({
        type: "POST",
        url: "/search_data",
        data: {
            'opts_give': opts
        },
        success: function (response) {
            if (response["result"] == "success") {
                let search_data = response["search_data"];
                insertSearchData(search_data);
            } else {
                alert("데이터 검색 실패");
            }
        }
    })
}

function insertSearchData(search_data) {
    $("div.post-container").empty();
    let data = search_data;

    for (let i = 0; i < data.length; i++) {
        let num = data[i]["num"];
        let img_src = "../../static/uploads/" + num + ".jpg";
        let breed = JSON.parse(data[i]["breed"]);
        let loc = data[i]["loc"];
        let r_date = data[i]["reg-date"];

        if (breed.length == 1) {
            let temp_html = `<a class="post-box" id="${num}" onclick="getMyPostData(this.id)">
                            <img src="${img_src}" alt="${num}">
                            <div class="description">
                                <div class="breed-tags">
                                    <div class="tag">${breed[0]}</div>
                                </div>
                                <ul class="details">
                                    <li class="num"><span>${num}</span></li>
                                    <li class="reg-date">등록일: <span>${r_date}</span></li>
                                    <li class="rescue-loc">구조장소: <span>${loc}</span></li>
                                </ul>
                            </div>
                        </a>`

            $("div.post-container").append(temp_html);
        } else if (breed.length == 2) {
            let temp_html = `<a class="post-box" id="${num}" onclick="getMyPostData(this.id)">
                            <img src="${img_src}" alt="${num}">
                            <div class="description">
                                <div class="breed-tags">
                                    <div class="tag">${breed[0]}</div>
                                    <div class="tag">${breed[1]}</div>
                                </div>
                                <ul class="details">
                                    <li class="num"><span>${num}</span></li>
                                    <li class="reg-date">등록일: <span>${r_date}</span></li>
                                    <li class="rescue-loc">구조장소: <span>${loc}</span></li>
                                </ul>
                            </div>
                        </a>`

            $("div.post-container").append(temp_html);
        } else {
            let temp_html = `<a class="post-box" id="${num}" onclick="getMyPostData(this.id)">
            <img src="${img_src}" alt="${num}">
            <div class="description">
                <div class="breed-tags">
                    <div class="tag">${breed[0]}</div>
                    <div class="tag">${breed[1]}</div>
                    <div class="tag">${breed[2]}</div>
                </div>
                <ul class="details">
                    <li class="num"><span>${num}</span></li>
                    <li class="reg-date">등록일: <span>${r_date}</span></li>
                    <li class="rescue-loc">구조장소: <span>${loc}</span></li>
                </ul>
            </div>
        </a>`

            $("div.post-container").append(temp_html);
        }
    }
}

function getMyPostData(id) {
    localStorage.setItem('numData', id);
    location.replace('/search/post');
}