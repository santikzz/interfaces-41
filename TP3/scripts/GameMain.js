const viewport = document.getElementById('viewport');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas_height = viewport.clientHeight; //600;
canvas_width = 16 / 9 * canvas_height;

canvas.width = canvas_width;
canvas.height = canvas_height;

let audio = new Audio('static/audio/Ambiente.mp3');
audio.play();
let game = new Game();