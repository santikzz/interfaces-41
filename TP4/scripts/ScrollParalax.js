// Variables globales
const section = document.getElementById("section-4");
const imgScroll = document.getElementById("character-0");
const blocks = document.getElementsByClassName("block");

const images = [];
for (let i = 0; i <= 10; i++) {
    images.push(`/TP4/static/parallax/section-4-${i}.png`);
}

const cambiarCadaXPixeles = 400;

// Calcula el índice de la imagen según el scroll
function calculateIndex(sectionScroll) {
    let index = Math.floor(sectionScroll / cambiarCadaXPixeles);

    // Aseguramos que el índice esté dentro del rango válido
    if (index >= images.length) {
        index = images.length - 1;
    } else if (index < 0) {
        index = 0;
    }

    return index;
}

function updateImage(index) {
    if (imgScroll.src !== images[index]) {
        imgScroll.src = images[index];
    }
}

// Muestra el bloque correspondiente y oculta los demás
function updateBlocks(index) {
    for (let i = 0; i < blocks.length; i++) {
        if (i === index) {
            blocks[i].classList.add("visible"); // Mostrar bloque de texti actual
            blocks[i].classList.remove("hidden");
        } else {
            blocks[i].classList.add("hidden"); // Ocultar otros bloques
            blocks[i].classList.remove("visible");
        }
    }
}

// Maneja el evento de scroll
function handleScroll() {
    const sectionPosition = section.getBoundingClientRect();
    const scrollPosition = window.scrollY; 
    const sectionTop = scrollPosition + sectionPosition.top; 
    const sectionScroll = scrollPosition - sectionTop; 

    // Verificamos si el scroll está dentro de la sección
    if (sectionScroll >= 0 && sectionScroll <= section.offsetHeight) {
        const currentIndex = calculateIndex(sectionScroll); // Calculamos el índice
        updateImage(currentIndex); // Cambiamos la imagen
        updateBlocks(currentIndex); // Actualizamos los bloques
    }
}

function addScrollListener() {
    window.addEventListener("scroll", handleScroll);
}

addScrollListener();