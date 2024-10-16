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
class Board extends Figure{

    slots = []; //Fichas, calcular cantidad es rows x columns
    rows; //6 -> el parametro dependera del modo de juego, 4x5 - 5x6 - 6x7
    columns; //7

    constructor(slots, rows, columns){
        this.slots = slots;
        this.rows = rows;
        this.columns = columns;
    }

    createBoard(){
        //rows x columns
    }

    searchFreeSlot(){
        //esta libre?
    }

    checkWin(){}

    drawCoin(){
        //ir reponiendo fichas a medida que usamos
    }

    finishGame(){
        //finaliza el juego?
    }

    resetGame(){
        //reiniciar tablero
    }
}

function matrix(m, n) {
    return Array.from({
      // generate array of length m
      length: m
      // inside map function generate array of size n
      // and fill it with `0`
    }, () => new Array(n).fill(0));
  };
  
  console.log(matrix(5,6));