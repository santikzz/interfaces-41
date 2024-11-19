const handleParallaxClass = () => {
    const elements = document.querySelectorAll('.parallax');
    elements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        const dir = element.getAttribute('data-dir').toUpperCase();
        const y_pos = -(window.scrollY * speed);
        element.style.transform = `translate${dir}(${y_pos}px)`;
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

const handleHamburgerMenu = () => {
    const header = document.querySelector('#header');
    const dropdown = header.querySelector('.dropdown');
    header.querySelector('.hamburguesa').addEventListener('click', function () {
        this.classList.toggle('active');
        dropdown.classList.toggle('visible');
    });
}

/* ======================== SECTION 2 ======================= */
const handleSection2Carousel = () => {
    let index = 0;
    const carousel = document.querySelector('.scroller');
    setInterval(() => {
        index = index + 1;
        carousel.style.transform = `translateX(${-517.5 * (index % 3)}px)`;
    }, 3000);
}

const handleSection2Floaters = () => {
    const section = document.querySelector('#section-2');
    const floaters = section.querySelectorAll('.floater');
    const observerOptions = {
        threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 300);
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);
    floaters.forEach((floater) => observer.observe(floater));
}

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

/* ======================== SECTION 4 ======================= */
function handleSection4Scroll() {

    const section = document.querySelector("#section-4");
    const blocks = section.querySelectorAll('.block');
    const images = section.querySelectorAll('.hidden');

    const observerOptions = {
        root: null,
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const index = Array.from(blocks).indexOf(entry.target);

            if (entry.isIntersecting) {

                entry.target.classList.add('visible');

                images.forEach((img) => img.classList.remove('visible'));
                // blocks.forEach((block) => block.classList.remove('visible'));

                if (images[index]) {
                    images[index].classList.add('visible');
                }
            }
        });
    }, observerOptions);

    blocks.forEach((block) => observer.observe(block));
}

/* ============== CREATE EVENT LISTENERS & INIT ============== */

document.addEventListener('mousemove', (event) => {
    handleSection3Magnet(event);
});

window.addEventListener('scroll', function () {
    handleHeaderScroll();
    handleParallaxClass();
    handleSection4();
});

window.addEventListener('DOMContentLoaded', () => {
    handleSection4Scroll();
    handleSection2Floaters();
});

handleHamburgerMenu();
handleSection2Carousel();