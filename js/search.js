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
