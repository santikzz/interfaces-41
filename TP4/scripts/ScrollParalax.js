// Variables globales
const section = document.getElementById("section-4");
const imgScroll = document.getElementById("character-0");

const images = [];
for (let i = 0; i <= 10; i++) {
    images.push(`/TP4/static/parallax/section-4-${i}.png`);
}

const cambiarCadaXPixeles = 400;

// Calcula el índice de la imagen según el scroll
function calculateIndex(sectionScroll) {
    let index = Math.floor(sectionScroll / cambiarCadaXPixeles);

    // Aseguramos que el índice esté dentro del rango válido
    return Math.max(0, Math.min(index, images.length - 1));
}

function updateImage(index) {
    // Verificar si ya se está mostrando la imagen correcta
    if (imgScroll.dataset.currentIndex !== index.toString()) {
        imgScroll.dataset.currentIndex = index; // Actualizar índice actual

        // Cambiar imagen después de la transición
        imgScroll.classList.remove("visible-img"); // Remover estilos visibles
        imgScroll.classList.add("hidden-img"); // Aplicar estilos de ocultar

        setTimeout(() => {
            imgScroll.src = images[index]; // Cambiar la fuente de la imagen
            imgScroll.classList.remove("hidden-img"); // Remover clase de ocultar
            imgScroll.classList.add("visible-img"); // Aplicar clase de visible
        }, 500); // Ajustar al tiempo de transición en CSS
    }
}

function handleScroll() {
    const sectionTop = section.offsetTop; // Obtener posición de la sección
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.scrollY; // Obtener posición actual del scroll

    // Calculamos la posición relativa del scroll dentro de la sección
    const sectionScroll = scrollPosition - sectionTop;

    // Verificamos si el scroll está dentro de la sección
    if (sectionScroll >= 0 && sectionScroll <= sectionHeight) {
        const currentIndex = calculateIndex(sectionScroll); // Calculamos el índice
        updateImage(currentIndex); // Actualizamos la imagen
    }
}

function addScrollListener() {
    window.addEventListener("scroll", handleScroll);
}

// Inicializar
addScrollListener();
