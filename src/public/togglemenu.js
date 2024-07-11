
const profileCircle = document.querySelector('.profile-circle');
const dropdownMenu = document.querySelector('.dropdown-menu');

profileCircle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
});