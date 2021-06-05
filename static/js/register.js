$(document).ready(function () {
	localStorage.removeItem('weiData');
	localStorage.removeItem('sexData');
	localStorage.removeItem('imgUrlData');
	localStorage.removeItem('breedData');
	localStorage.removeItem('breedTempData');
});

function loadFile(event) {
	var image = document.getElementById('output');

	$(".image-box").remove();
	image.classList.remove('hide');
	image.src = URL.createObjectURL(event.target.files[0]);
}

function postBreedData() {
	let img = getBase64Image(document.querySelector('#output'));
	let img_url = "data:image/png;base64," + img;
	let sex = document.querySelector('#sex').value;
	let hei = document.querySelector('#hei').value;
	let wei = document.querySelector('#wei').value;
	let bcs = document.querySelector('#bcs').value;

	localStorage.setItem('imgUrlData', img_url);
	localStorage.setItem('sexData', sex);
	localStorage.setItem('weiData', wei);

	$.ajax({
		type: "POST",
		url: "/breed_data",
		data: {
			'sex_give': sex,
			'hei_give': hei,
			'wei_give': wei,
			'bcs_give': bcs
		},
		success: function (response) {
			if (response["result"] == "success") {
				let breed_data = response["breed_data"];
				localStorage.setItem('breedTempData', JSON.stringify(breed_data));
				location.replace('/register/2');
			} else {
				alert("데이터 출력 실패");
			}
		}
	})
}

function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = img.naturalWidth;
	canvas.height = img.naturalHeight;

	ctx.drawImage(img, 0, 0);

	var dataURL = canvas.toDataURL("image/png");

	return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

