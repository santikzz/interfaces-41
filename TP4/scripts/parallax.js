const handleParallaxClass = () => {
    const elements = document.querySelectorAll('.parallax');
    elements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        const y_pos = -(window.scrollY * speed);
        element.style.transform = `translateY(${y_pos}px)`;
    });
}

/* ======================== HEADER ======================== */
const handleHeaderScroll = () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
}
document.querySelector('.hamburgesa').addEventListener('click', function() {
    this.classList.toggle('active');
});

/* ======================== SECTION 2 ======================= */
const handleSection2Carousel = () => {
    let index = 0;
    const carousel = document.querySelector('.scroller');
    setInterval(() => {
        index = index + 1;
        carousel.style.transform = `translateX(${-517.5 * (index % 3)}px)`;
    }, 3000);
}

// floaters que aparecen de a uno
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

/* ======================== SECTION 3 ======================= */

const handleSection3Magnet = (event) => {
    const section = document.querySelector('#section-3');
    const characters = section.querySelector('#characters');

    const rect = section.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const offsetX = (mouseX / rect.width - 0.5) * 2;
    const offsetY = (mouseY / rect.height - 0.5) * 2;

    const scale = -(characters.getAttribute('data-scale'));

    characters.style.transform = `translate(${offsetX * scale}px, ${offsetY * scale}px)`;
}

/* ============== CREATE EVENT LISTENERS & INIT ============== */

document.addEventListener('mousemove', (event) => {
    handleSection3Magnet(event);
});

window.addEventListener('scroll', function () {
    handleHeaderScroll();
    handleParallaxClass();
});

handleSection2Carousel();