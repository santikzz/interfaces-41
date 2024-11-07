/* ======================= DROPDOWN LOGIC ======================= */
const toggleDropdown = document.querySelector('.toggle-dropdown');
const dropdown = document.querySelector('.dropdown');

toggleDropdown.addEventListener('click', () => {
    dropdown.classList.toggle('open');
});

/* ======================= SIDENAV LOGIC ======================= */
const hamburger = document.querySelector('.toggle-sidenav');
const sidenav = document.querySelector('.sidenav');

hamburger.addEventListener('click', () => {
    sidenav.classList.toggle('open');
});
