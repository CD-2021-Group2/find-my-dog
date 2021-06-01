$(document).ready(function () {
    getSearchData();
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
});

// SEARCH
// function getSearchData() {


//     $.ajax({
//         type: "POST",
//         url: "/search_data",
//         data: {
//             'num_give': num
//         },
//         success: function (response) {
//             if (response["result"] == "success") {
//                 let search_data = response["search_data"];
//                 insertPostData(search_data);
//             } else {
//                 alert("데이터 검색 실패");
//             }
//         }
//     })
// }

// function insertSearchData(search_data) {}
