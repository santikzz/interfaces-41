//3 modos de juego
//encargado de recorrerse, ver si tiene fichas, si son del mismo jugador,
//determina si hay un ganador o no
//debe saber dibujarse

//Casillero alto y largo
//casilletro esta disponible?

//cuando tiro la ficha, la pos 0,0 esta disponible? no, la 1,1,.. si? la dejo ahi. Debe recorrer toda la columna, FOR DE UN FOR

//REQUISITOS
//deben funcionar las diagonales!!

//**********EVENTOS*************//
//Drag and drop

//mouseDown
//mouseUp
//mouseMove

//e.layerX - e.layerY
//borrar y dibujar todo el tiempo

// createBoard() {
//     //rows x columns
// }

// searchFreeSlot() {
//     //esta libre?
// }

// checkWin() { }

// drawCoin() {
//     //ir reponiendo fichas a medida que usamos
// }

// finishGame() {
//     //finaliza el juego?
// }

// resetGame() {
//     //reiniciar tablero
// }

class Game {

    constructor() {

        this.board = new Board({ rows: 6, cols: 7, cellSize: 64 });
        this.board.draw();


        // let coin = new Coin(0, 0, 32, 1);

    }

    start() { }

}