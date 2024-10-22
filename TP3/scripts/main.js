const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas_height = 600; //window.innerHeight * 0.65;
canvas_width = 16 / 9 * canvas_height;

canvas.width = canvas_width;
canvas.height = canvas_height;

let game = new Game();

let coin = new Coin({ x: 100, y: 100, radius: 32, type: 1 });

canvas.addEventListener('mousemove', function (event) {
    // Get the canvas bounds (relative to the viewport)
    const rect = canvas.getBoundingClientRect();

    // Calculate the mouse position relative to the canvas
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (coin.isCursorInside(mouseX, mouseY)) {
        console.log("Cursor is inside the coin!");
    } else {
        console.log("Cursor is outside the coin.");
    }

});