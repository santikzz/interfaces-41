
/* ====================================================================== */
/*                                SECTION 2
/* ====================================================================== */

let section_2_carousel_index = 0;
const section_2_carousel = document.querySelector('.scroller');

const carousel_interval = setInterval(() => {
    section_2_carousel_index = section_2_carousel_index + 1;
    section_2_carousel.style.transform = `translateX(${-517.5 * (section_2_carousel_index % 3)}px)`;
}, 3000);

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