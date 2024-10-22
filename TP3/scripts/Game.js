class Game extends CanvasElement {

    constructor() {
        super(0, 0);

        this.playerTurn = 1;

        this.board = new Board({ rows: 6, cols: 7, mode: 4, cellSize: 74 }); // width 512 
        // this.board = new Board({ rows: 7, cols: 8, mode: 5, cellSize: 64 });
        // this.board = new Board({ rows: 8, cols: 9, mode: 6, cellSize: 56 });
        this.board.draw();

        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // if (coin.isCursorInside(mouseX, mouseY)) {
            //     console.log("Cursor is inside the coin!");
            // } else {
            //     console.log("Cursor is outside the coin.");
            // }

        });

        this.canvas.addEventListener('click', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const columnIndex = this.board.getHoveredColumn(mouseX, mouseY);
            if (columnIndex !== -1) {
                if (this.board.placeCoin(columnIndex, this.playerTurn) !== null) {
                    this.playerTurn = this.playerTurn === 1 ? 2 : 1;
                }
                this.board.printGrid();
            }

        });



    }



    start() { }

}