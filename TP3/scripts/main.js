const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas_height = 600; //window.innerHeight * 0.65;
canvas_width = 16 / 9 * canvas_height;

canvas.width = canvas_width;
canvas.height = canvas_height;

let game = new Game();


/* OPCIONES DEL JUEGO */
const options = document.querySelector('.options-game');
const optionsButton = document.querySelector('.option');

options.addEventListener('click', () => {
    options.classList.toggle('remove');
});

options.addEventListener('click', (event) => {
    const option = event.target.closest('.option');

    if (option) {
        const optionValue = option.getAttribute('data-option'); // Obtener el valor de la opción
        game.showOptionsGame(parseInt(optionValue)); // obtener el 1, 2 o 3 de los botones
    }
}); 


let coin = new CoinOli({ x: 100, y: 100, radius: 32, type: 1 });

let arrastre = false; // variable para saber si se está arrastrando una ficha
let disponibleCasillero = false;

/* EVENTOS PARA ARRASTRAR LA FICHA */
//DETECTAR INICIO DEL ARRASTRE!
canvas.addEventListener('mousedown', function (event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Si el clic está sobre la ficha, activamos el arrastre
    if (coin.isCursorInside(mouseX, mouseY)) {
        arrastre = true;
        console.log("INICIO DE ARRASTRAR");

    }
});

//MOVER LA FICHA MIENTRAS SE ARRASTRA
canvas.addEventListener('mousemove', function (event) {
    // Get the canvas bounds (relative to the viewport)
    const rect = canvas.getBoundingClientRect();

    // Calculate the mouse position relative to the canvas
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (arrastre) {
        coin.setPosition({ x: mouseX, y: mouseY });
        coin.draw();
    }
});

// Evento para detener el arrastre cuando se suelta el ratón
canvas.addEventListener('mouseup', function () {
    if (arrastre) {
        arrastre = false;
        console.log("FIN DE ARRASTRE");

        if (disponibleCasillero) { //se lanza la ficha al casillero disponible
            console.log("Ficha en casillero disponible");
            board.draw();
            coin.draw();
        } else { //se devuelve la ficha a su posición original
            coin.setPosition({ x: 100, y: 100 });
            coin.draw();
        }
    }
});
