$(document).ready(function () {
    insertRankData();
});

function insertRankData() {
    var image = document.getElementById('dog-img');
    var img_url = localStorage.getItem('imgData');
    var breed_list = JSON.parse(localStorage.getItem('breedData'));

    image.src = "data:image/png;base64," + img_url;

    $("#ranking-box").empty();
    console.log(breed_list[0]);
    console.log(breed_list[1]);
    console.log(breed_list[2]);

    for (let i = 0; i < breed_list.length; i++) {
        let num = i + 1;
        let breed = breed_list[i];
        let element = `<section class="ranking">
                            <div class="rank-num">${num}</div>
                            <div class="title"><span>${breed}</span></div>
                        </section>`

        $("#ranking-box").append(element);
    }
}