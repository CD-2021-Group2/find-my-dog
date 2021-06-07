function postRegisterData() {
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
	let img_url = localStorage.getItem('imgUrlData');
	let file = dataURLtoFile(img_url, num+'.jpg');

	const formData = new FormData();

	formData.append('file', file)
	formData.append('num_give', num)
	formData.append('breed_give', breed)
	formData.append('sex_give', sex)
	formData.append('wei_give', wei)
	formData.append('byear_give', byear)
	formData.append('color_give', color)
	formData.append('rdate_give', rdate)
	formData.append('ddate_give', ddate)
	formData.append('loc_give', loc)
	formData.append('shel_give', shel)
	formData.append('tel_give', tel)
	formData.append('note_give', note)

	$.ajax({
		type: "POST",
		url: "/register_data",
		data: formData,
		dataType: 'json',
		contentType: false,
		processData: false,
		cache: false,
		success: function (response) {
			if (response["result"] == "success") {
				localStorage.removeItem('weiData');
				localStorage.removeItem('sexData');
				localStorage.removeItem('imgUrlData');
				localStorage.removeItem('breedData');
				localStorage.setItem('numData', num);
				location.replace('/register/4');
			} else {
				alert("데이터 출력 실패");
			}
		}
	})
}

function dataURLtoFile(dataurl, filename) {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new File([u8arr], filename, {
		type: mime
	});
}