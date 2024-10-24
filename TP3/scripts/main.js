const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas_height = 600; //window.innerHeight * 0.65;
canvas_width = 16 / 9 * canvas_height;

canvas.width = canvas_width;
canvas.height = canvas_height;

let game = new Game();

