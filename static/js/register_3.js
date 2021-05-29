function postRegisterData() {
	let img = localStorage.getItem('imgData');
	let num = document.querySelector('#num').value;
	let breed = localStorage.getItem('breedData');
	let sex = localStorage.getItem('sexData');
	let wei = localStorage.getItem('weiData');
	let byear = document.querySelector('#byear').value;
	let color = document.querySelector('#color').value;
	let rdate = document.querySelector('#reg-date').value;
	let ddate = document.querySelector('#due-date').value;
	let loc = document.querySelector('#loc').value;
	let shel = document.querySelector('#shel').value;
	let tel = document.querySelector('#tel').value;
	let note = document.querySelector('#note').value;

	$.ajax({
		type: "POST",
		url: "/register_data",
		data: {
			'img_give': img,
			'num_give': num,
			'breed_give': breed,
			'sex_give': sex,
			'wei_give': wei,
			'byear_give': byear,
			'color_give': color,
			'rdate_give': rdate,
			'ddate_give': ddate,
			'loc_give': loc,
			'shel_give': shel,
			'tel_give': tel,
			'note_give': note
		},
		success: function (response) {
			if (response["result"] == "success") {
				localStorage.removeItem('weiData');
				localStorage.removeItem('sexData');
				localStorage.removeItem('imgData');
				localStorage.removeItem('breedData');
				localStorage.setItem('numData', num);
				location.replace('/register/4');
			} else {
				alert("데이터 저장 실패");
			}
		}
	})
}