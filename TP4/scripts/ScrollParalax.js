const section = document.getElementById("section-4");
const imgScroll = document.getElementById("character-0");

const images = [];
for (let i = 0; i <= 10; i++) {
    images.push(`/TP4/static/parallax/section-4-${i}.png`);
}

const cambiarCadaXPixeles = 400;

function calculateIndex(sectionScroll) {
    let index = Math.floor(sectionScroll / cambiarCadaXPixeles);

    return Math.max(0, Math.min(index, images.length - 1));
}

function updateImage(index) {
    if (imgScroll.dataset.currentIndex !== index.toString()) {
        imgScroll.dataset.currentIndex = index; 

        imgScroll.classList.remove("visible-img");
        imgScroll.classList.add("hidden-img"); 

        setTimeout(() => {
            imgScroll.src = images[index]; 
            imgScroll.classList.remove("hidden-img");
            imgScroll.classList.add("visible-img");
        }, 500);
    }
}

function handleScroll() {
    const sectionTop = section.offsetTop; 
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.scrollY; 

    const sectionScroll = scrollPosition - sectionTop;

    if (sectionScroll >= 0 && sectionScroll <= sectionHeight) {
        const currentIndex = calculateIndex(sectionScroll);
        updateImage(currentIndex); 
    }
}

function addScrollListener() {
    window.addEventListener("scroll", handleScroll);
}

addScrollListener();
