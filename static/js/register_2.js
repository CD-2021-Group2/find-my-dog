$(document).ready(function () {
    animateChart();
    insertChartData();
});

function animateChart() {
    $('.percentage-bar').each(function () {
        $(this).find('.bar').animate({
            width: $(this).attr('data-percent')
        }, 1000);
    });
}

function insertChartData() {
    var image = document.getElementById('dog-img');
    var img_url = localStorage.getItem('imgData');
    var breed_list = localStorage.getItem('breedData');

    image.src = img_url;

    $("#percentage-box").empty();
    for (let i = 0; i < breed_list.length; i++) {
        let element = `<section class="percentage">
                            <div class="title"><span>${breed_list[i]["breed"]}</span></div>
                            <div class="percentage-bar" data-percent=${breed_list[i]["per"]}>
                                <div class="bar"></div>
                                <div class="percent">${breed_list[i]["per"]}</div>
                            </div>
                        </section>`

        $("#percentage-box").append(element);
    }
}