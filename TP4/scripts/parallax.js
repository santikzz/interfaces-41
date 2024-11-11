window.addEventListener('scroll', function () {

    handleHeaderScroll();
    handleHeroScroll();
    handleSection2Scroll();

});

/* ======================== HEADER ======================== */
const handleHeaderScroll = () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
}

const getLayerScrollOffsetY = (layer) => {
    const speed = layer.getAttribute('data-speed');
    const y_pos = window.scrollY * speed;
    return y_pos;
}

/* ======================== SECTION 1 HERO ================= */
const handleHeroScroll = () => {
    const section = document.getElementById('section-hero');
    const layers = section.querySelectorAll('.layer').forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const y_pos = window.scrollY * speed;
        layer.style.transform = `translateY(${-y_pos}px)`;
    })
}

/* ======================== SECTION 2 ======================= */
let section_2_carousel_index = 0;
const section_2_carousel = document.querySelector('.scroller');

const carousel_interval = setInterval(() => {
    section_2_carousel_index = section_2_carousel_index + 1;
    section_2_carousel.style.transform = `translateX(${-517.5 * (section_2_carousel_index % 3)}px)`;
}, 3000);

const handleSection2Scroll = () => {
    const section = document.getElementById('section-2');
    const layer_left = section.querySelector('#character-4');
    const layer_right = section.querySelector('#character-5');

    const speed_left = layer_left.getAttribute('data-speed');
    const speed_right = layer_right.getAttribute('data-speed');
    const y_pos_left = window.scrollY * speed_left;
    const y_pos_right = window.scrollY * speed_right;

    layer_left.style.transform = `translateY(${-y_pos_left}px)`;
    layer_right.style.transform = `translateY(${-y_pos_right}px)`;
}

document.addEventListener('DOMContentLoaded', () => {
    const floaters = document.querySelectorAll('.floater');
    const observerOptions = { // opciones del IntersectionObserver; el evento se activa cuando el 10% del elemento sea visible
        threshold: 0.1
    };

    const onIntersection = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) { // si el elemento es al menos un 10% visible
                setTimeout(() => {
                    entry.target.classList.add('visible'); // le agrego la clase 'visible' al elemento con un retraso
                }, index * 300); // el retraso es de 0.3 segundos multiplicado por el índice, asi aparece uno desp del otro
                observer.unobserve(entry.target); // dejo de observar
            }
        });
    };

    const observer = new IntersectionObserver(onIntersection, observerOptions);
    floaters.forEach(floater => observer.observe(floater));
});