
/* ====================================================================== */
/*                                SECTION 2
/* ====================================================================== */

let section_2_carousel_index = 0;
const section_2_carousel = document.querySelector('.scroller');

const carousel_interval = setInterval(() => {
    section_2_carousel_index = section_2_carousel_index + 1;
    section_2_carousel.style.transform = `translateX(${-517.5 * (section_2_carousel_index % 3)}px)`;
}, 3000);