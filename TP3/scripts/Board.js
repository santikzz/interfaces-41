class Board extends CanvasElement {

    constructor({ rows, cols, cellSize }) {
        super(0, 0);
        this.rows = rows;                                                               // cantidad de filas
        this.cols = cols;                                                               // cantidad de columnas
        this.cellSize = cellSize;                                                       // tamaño en pixeles de cada celda
        //this.grid = Array.from({ length: rows }, () => Array(cols).fill(0));            // inicializo la matrix de rows*cols con ceros
        this.cells = [];                                                                // inicalizo el arreglo de celdas Cell();

        this.boardSize = {                                                              // inicializo las variables del tamaño del tablero
            width: this.cols * this.cellSize,
            height: this.rows * this.cellSize
        };

        this.x = (canvas.width / 2) - (this.boardSize.width / 2);                       // pongo el tablero en el centro de la pantalla
        this.y = (canvas.height / 2) - (this.boardSize.height / 2);

        this.generateBoard();                                                           // genero el tablero (creo las celdas en su posicion)
        this.debugDrawDropArea();
    }

    // genero el tablero de forma dinamica con rows*cols
    generateBoard() {
        this.cells = [];
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.cells.push(new Cell({
                    x: this.x + col * this.cellSize,
                    y: this.y + row * this.cellSize,
                    size: this.cellSize
                }));
            }
        }
    }

    debugDrawDropArea() {
        for (let i = 0; i < this.cols; i++) {
            if (i % 2 == 0) {
                this.ctx.fillStyle = "#0000FF";
            } else {
                this.ctx.fillStyle = "#00FF00";
            }
            this.ctx.rect(
                this.x + (i * this.cellSize),
                this.y - this.cellSize,
                this.cellSize,
                this.cellSize
            );
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    draw() {
        this.ctx.clearRect(this.x, this.y, this.boardSize.width, this.boardSize.height);            // limpio el area del tablero antes de re-renderizar
        this.cells.forEach(cell => cell.draw());                                                    // renderizo las celdas
    }

}