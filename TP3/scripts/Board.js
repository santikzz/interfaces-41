class Board extends CanvasElement {

    constructor({ rows, cols, mode, cellSize }) {
        super(0, 0);
        this.rows = rows;                                                               // cantidad de filas
        this.cols = cols;                                                               // cantidad de columnas
        this.mode = mode;                                                               // modo de tablero: 4, 5 o 6 en linea para ganar
        this.cellSize = cellSize;                                                       // tamaño en pixeles de cada celda
        this.grid = Array.from({ length: rows }, () => Array(cols).fill(0));            // inicializo la matrix de rows*cols con ceros
        this.cells = [];                                                                // inicalizo el arreglo de celdas Cell();
        this.boardSize = {                                                              // inicializo las variables del tamaño del tablero
            width: this.cols * this.cellSize,
            height: this.rows * this.cellSize
        };
        this.x = (this.canvas.width / 2) - (this.boardSize.width / 2);                       // pongo el tablero en el centro de la pantalla
        // this.y = (canvas.height / 2) - (this.boardSize.height / 2);
        this.y = this.canvas.height - this.boardSize.height;

        this.dropArea = {
            x: this.x, y: this.y - this.cellSize,
            width: this.boardSize.width, height: this.cellSize,
        };

        this.generateBoard();                                                           // genero el tablero (creo las celdas en su posicion)
        this.draw();

        this.hover = new ImageObj({
            x: this.x + this.cellSize,
            y: this.y - 128,
            width: this.cellSize,
            height: 128,
            src: 'static/game/glow.png',
            drawOnLoad: false,
        });

        this.victoryImage = new ImageObj({
            x: (this.boardSize.width - 700) / 2 + this.x, 
            y: (this.boardSize.height - 350) / 2 + this.y,
            width: 700, 
            height: 350, 
            src: 'static/game/victory.png', 
            drawOnLoad: false 
        });

        this.isWinner = false; 

    }

    // genero el tablero de forma dinamica con rows*cols
    generateBoard() {
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

    drawDropArea() {
        for (let i = 0; i < this.cols; i++) {
            this.ctx.beginPath();
            if (i % 2 == 0) {
                this.ctx.fillStyle = "#000055";
            } else {
                this.ctx.fillStyle = "#005500";
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
        // this.drawDropArea();
        // this.ctx.clearReact(this.x, this.y, this.boardSize.width, this.boardSize.height)
        this.cells.forEach(cell => cell.draw()); // renderizo las celdasdraw() 
        if (this.isWinner) { 
            this.victoryImage.draw(); 
        }
    }

    // obtengo el indice de la columna que tengo el mouse encima
    getHoveredColumn(mouseX, mouseY) {
        // if inside the drop area
        if (mouseX >= this.dropArea.x && mouseX <= (this.dropArea.x + this.dropArea.width)) {
            if (mouseY >= this.dropArea.y && mouseY <= (this.dropArea.y + this.dropArea.height)) {
                // return hovered column index
                return Math.floor((mouseX - this.dropArea.x) / this.cellSize);
            }
        }
        return -1;
    }

    placeCoin(column, player) {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.grid[row][column] === 0) {

                this.grid[row][column] = player;

                if (this.checkWin(row, column)) {
                    this.isWinner = true; 
                    return { row, player }; // retorno la fila y el
                }
                return row;
            }
        }
        return null;
    }

    printGrid() {
        console.log(this.grid.map(row => row.join(' ')).join('\n'));
    }

    isValidPosition(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    checkWin(row, col) {
        const lastCoinPlayer = this.grid[row][col];                                     // valor de la ultima ficha colocada
        let pattern = `${lastCoinPlayer}`.repeat(this.mode)                             // patron de n fichas a buscar, ej: 1111 o 2222

        const currentCol = this.grid[row];                                              // elementos de la columna actual
        const currentRow = this.grid.map((column) => column[col]);                      // elementos de la fila actual

        // Diagonal /
        const leftDiagonal = [];
        for (let i = -this.mode + 1; i < this.mode; i++) {
            const newRow = row + i;
            const newCol = col + i;
            if (this.isValidPosition(newRow, newCol)) {
                leftDiagonal.push(this.grid[newRow][newCol]);
            }
        }

        // Diagonal \
        const rightDiagonal = [];
        for (let i = -this.mode + 1; i < this.mode; i++) {
            const newRow = row + i;
            const newCol = col - i;
            if (this.isValidPosition(newRow, newCol)) {
                rightDiagonal.push(this.grid[newRow][newCol]);
            }
        }


        // todas las direcciones juntas a partir de la ultima ficha colocada
        const allLines = [currentRow, currentCol, leftDiagonal, rightDiagonal];

        // checkeo si el patron esta en las direcciones
        if (
            allLines.some((line) => {
                let lineString = line.join("");
                if (lineString.includes(pattern)) {
                    this.isWinner = true; 
                    console.log(`Player ${lastCoinPlayer} wins!`);
                    return lastCoinPlayer;
                }
            })
        );

        return null;
    }

    showWin(row, col) {
        console.log("Desea jugar nuevamente?")
    }


}