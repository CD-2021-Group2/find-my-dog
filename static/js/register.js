function loadFile(event) {
	var image = document.getElementById('output');

	$(".image-box").remove();
	image.classList.remove('hide');
	image.src = URL.createObjectURL(event.target.files[0]);

}

function postBreedData() {
	let img = document.querySelector('#output').src;
	let sex = document.querySelector('#sex').value;;
	let hei = document.querySelector('#hei').value;;
	let wei = document.querySelector('#wei').value;;
	let bcs = document.querySelector('#bcs').value;;

	localStorage.setItem('imgData', img)
	localStorage.setItem('sexData', sex)
	localStorage.setItem('weiData', wei)

	// test 
	let breed_final = ['테스트1', '테스트2', '테스트3']

	localStorage.setItem('breedData', breed_final)
	location.replace('/register/3');

	// $.ajax({
	// 	type: "POST",
	// 	url: "/breed_data",
	// 	data: {
	// 		'sex_give': sex,
	// 		'hei_give': hei,
	// 		'wei_give': wei,
	// 		'bcs_give': bcs
	// 	},
	// 	success: function (response) {
	// 		if (response["result"] == "success") {
	// 			let breed_data = response["breed_data"];
	// 			classifyBreeds(breed_data);
	// 			location.replace('/register/3');
	// 		} else {
	// 			alert("데이터 출력 실패");
	// 		}
	// 	}
	// })
}

function classifyBreed(breed_data) {
	let breed_data = breed_data;

	localStorage.setItem('breedData', breed_final)
}
