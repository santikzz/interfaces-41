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

class Game {

    constructor() {
        this.board = new Board({ rows: 6, cols: 7, cellSize: 64 });
        this.coin = new CoinOli({ x: 100, y: 100, radius: 32, type: 1 });
    }

    createBoard(option) {
        switch (option) {
            case 1:
                this.board = new Board({ rows: 5, cols: 8, cellSize: 64 });
                break;
            case 2:
                this.board = new Board({ rows: 6, cols: 6, cellSize: 64 });
                break;
            case 3:
                this.board = new Board({ rows: 7, cols: 8, cellSize: 64 });
                break;
            default:
                console.log("Invalid option");
                return;
        }
        this.board.draw(); // Dibujar el nuevo tablero con el tamaño seleccionado
    }

    endGame() {
        //     //finaliza el juego?

    }

    start() {

    }

    resetGame() {
        this.board.reset();
    }

    drawCoin() {
        //ir reponiendo fichas a medida que usamos
    }

    checkWin() {
        //verificar si hay un ganador
    }

    searchFreeSlot() {
        //esta libre?
    }



}