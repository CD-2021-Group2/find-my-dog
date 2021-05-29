$(document).ready(function () {
	getDogNumber();
});

const enrolled_numberEl = document.getElementById('enrolled-number');

function getDogNumber() {
    $.ajax({
        type: "GET",
        url: "/home_data",
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                let dog_number = response["dog_number"];
                updateDogNumber(dog_number);
            } else {
                alert("데이터 가져오기 실패");
            }
        }
    })
}

function updateDogNumber(dog_number) {
    enrolled_numberEl.innerHTML = '';
    let element = `${dog_number}`;
    enrolled_numberEl.append(element);
}