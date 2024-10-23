class Game extends CanvasElement {

    constructor() {
        super(0, 0);

        this.playerTurn = 1;

        this.player1Stack = this.generateCoinStack(1, 10);
        this.player2Stack = this.generateCoinStack(2, 10);

        this.draggedCoin = null;
        this.cellSize = 74;

        this.board = new Board({ rows: 6, cols: 7, mode: 4, cellSize: 74 }); // width 512 
        // this.board = new Board({ rows: 7, cols: 8, mode: 5, cellSize: 64 });
        // this.board = new Board({ rows: 8, cols: 9, mode: 6, cellSize: 56 });


        this.canvas.addEventListener('mousedown', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            this.startDragging(mouseX, mouseY);
        });

        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            if (this.draggedCoin !== null) {
                this.draggedCoin.coin.x = mouseX;
                this.draggedCoin.coin.y = mouseY;
                this.draw();
            }

        });

        this.canvas.addEventListener('mouseup', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            if (this.draggedCoin !== null) {
                const columnIndex = this.board.getHoveredColumn(mouseX, mouseY);
                if (columnIndex >= 0) {
                    let row = this.board.placeCoin(columnIndex, this.playerTurn);
                    if (row !== null) {
                        this.playerTurn = this.playerTurn === 1 ? 2 : 1;
                        let cx = this.board.x + columnIndex * this.cellSize + this.cellSize / 2;
                        let cy = this.board.y + row * this.cellSize + this.cellSize / 2;
                        // this.draggedCoin.coin.setPosition(cx, cy);
                        this.animateDrop(this.draggedCoin.coin, cx, cy)

                        if (this.board.checkWin(row, columnIndex)) {
                            return true;
                        }

                    }
                } else {

                    this.draggedCoin.coin.x = this.draggedCoin.prevX;
                    this.draggedCoin.coin.y = this.draggedCoin.prevY;

                }
            }

            this.draggedCoin = null;
            this.draw();
        });

        this.draw();

    }

    animateDrop(coin, targetX, targetY) {
        const speed = 5;
        coin.x = targetX;
        const animate = () => {
            coin.y += speed;
            if (coin.y < targetY) {
                requestAnimationFrame(animate);
            } else {
                coin.setPosition(targetX, targetY);
            }
            this.draw();
        };
        animate();
    }

    generateCoinStack(player, count) {
        let stack = [];
        for (let i = 0; i < count; i++) {
            stack.push(new Coin({
                x: player === 1 ? 50 : this.canvas.width - 50,
                y: 100 + i * 50,
                cellSize: 74,
                player: player
            }));
        }
        return stack;
    }

    startDragging(mouseX, mouseY) {
        let stack = this.playerTurn === 1 ? this.player1Stack : this.player2Stack;
        for (let i = 0; i < stack.length; i++) {
            if (stack[i].isCursorInside(mouseX, mouseY)) {
                console.log("asdad")
                this.draggedCoin = {
                    coin: stack[i],
                    prevX: stack[i].x,
                    prevY: stack[i].y,
                }
                return;
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player1Stack.forEach(coin => coin.draw(this.ctx));
        this.player2Stack.forEach(coin => coin.draw(this.ctx));
        this.board.draw();
    }

}