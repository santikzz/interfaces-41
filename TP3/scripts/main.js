const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas_height = 600; //window.innerHeight * 0.65;
canvas_width = 16 / 9 * canvas_height;

canvas.width = canvas_width;
canvas.height = canvas_height;

// let board = new Board({
//     rows: 6,
//     cols: 7,
//     cellSize: 100
// });

// board.generateBoard();
// board.draw();

let game = new Game();


let coin = new Coin(0, 0, 32, 1);

canvas.addEventListener('mousemove', function (event) {
    // Get the canvas bounds (relative to the viewport)
    const rect = canvas.getBoundingClientRect();

    // Calculate the mouse position relative to the canvas
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Log or use the mouse position
    // console.log('Mouse position:', mouseX, mouseY);

    console.log(coin.isPointInside(mouseX, mouseY));

});