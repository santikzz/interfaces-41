class Game extends CanvasElement {

    constructor() {
        super(0, 0);


        this.playerTurn = 1;
        this.draggedCoin = null;

        this.showMenu = true;

        this.setupEventListeners();
        this.menu();
        this.draw();
    }

    menu() {

        this.modo1 = new Button({
            x: this.canvas.width / 2 - (75 * 3),
            y: this.canvas.height / 2 - 25,
            width: 150, height: 50,
            text: '4 en Linea',
            onClick: () => {
                alert('clicked!');
            }
        });

        this.modo2 = new Button({
            x: this.canvas.width / 2 - 75,
            y: this.canvas.height / 2 - 25,
            width: 150, height: 50,
            text: '5 en Linea',
            onClick: () => {
                alert('clicked!');
            }
        });

        this.modo3 = new Button({
            x: this.canvas.width / 2 + (75),
            y: this.canvas.height / 2 - 25,
            width: 150, height: 50,
            text: '6 en Linea',
            onClick: () => {
                alert('clicked!');
            }
        });

        this.modo1.draw();
        this.modo2.draw();
        this.modo3.draw();


    }

    start({ rows, cols, mode, cellSize }) {

        // this.board = new Board({ rows: 6, cols: 7, mode: 4, cellSize: 74 }); // width 512 
        // this.board = new Board({ rows: 7, cols: 8, mode: 5, cellSize: 64 });
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#000000"
        this.ctx.fill();
        this.ctx.closePath();

        this.board = new Board({ rows, cols, mode, cellSize });
        this.player1Stack = this.generateCoinStack(1, 10);
        this.player2Stack = this.generateCoinStack(2, 10);

        this.timeText = new Text({
            x: this.canvas.width / 2,
            y: 50,
            text: 250,
            anchor: 'center',
        });

        this.restartBtn = new Button({
            x: 25, y: 25,
            width: 150, height: 50,
            text: 'Restart',
            onClick: () => {
                alert('clicked!');
            }
        });

        // this.canvas.style.cursor = 'url("static/default.png"), auto';

        this.draw();

    }

    setupEventListeners() {

        this.canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            if (this.showMenu) {

                if (this.modo1.isCursorInside(mouseX, mouseY)) {
                    this.showMenu = false;
                    // this.board = new Board({ rows: 6, cols: 7, mode: 4, cellSize: 74 });
                    this.start({ rows: 6, cols: 7, mode: 4, cellSize: 74 });
                }

                if (this.modo2.isCursorInside(mouseX, mouseY)) {
                    this.showMenu = false;
                    // // this.board = new Board({ rows: 7, cols: 8, mode: 5, cellSize: 64 });
                    this.start({ rows: 7, cols: 8, mode: 5, cellSize: 64 });
                }

                if (this.modo3.isCursorInside(mouseX, mouseY)) {
                    this.showMenu = false;
                    // this.board = new Board({ rows: 8, cols: 9, mode: 6, cellSize: 56 });
                    this.start({ rows: 8, cols: 9, mode: 6, cellSize: 56 });
                }

            } else {
                if (this.restartBtn.isCursorInside(mouseX, mouseY)) {
                    this.restartBtn.click();
                }
            }
        });

        this.canvas.addEventListener('mousedown', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            if (this.showMenu) {

            } else {
                this.startDragging(mouseX, mouseY);
            }
        });

        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            if (this.showMenu) {

                if (this.modo1.isCursorInside(mouseX, mouseY) ||
                    this.modo2.isCursorInside(mouseX, mouseY) ||
                    this.modo3.isCursorInside(mouseX, mouseY)) {

                }

                // this.draw();

            } else {
                this.restartBtn.isCursorInside(mouseX, mouseY);

                let stack = this.playerTurn === 1 ? this.player1Stack : this.player2Stack;
                for (let i = 0; i < stack.length; i++) {
                    if (stack[i].isCursorInside(mouseX, mouseY)) { }
                }

                if (this.draggedCoin !== null) {
                    this.draggedCoin.coin.x = mouseX;
                    this.draggedCoin.coin.y = mouseY;
                    this.draw();
                }

            }
        });

        this.canvas.addEventListener('mouseup', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            if (this.showMenu) {
            } else {


                if (this.draggedCoin !== null) {
                    const columnIndex = this.board.getHoveredColumn(mouseX, mouseY);
                    if (columnIndex >= 0) {
                        let row = this.board.placeCoin(columnIndex, this.playerTurn);
                        if (row !== null) {
                            this.playerTurn = this.playerTurn === 1 ? 2 : 1;
                            let cx = this.board.x + columnIndex * this.board.cellSize + this.board.cellSize / 2;
                            let cy = this.board.y + row * this.board.cellSize + this.board.cellSize / 2;
                            // this.draggedCoin.coin.setPosition(cx, cy);
                            this.draggedCoin.coin.isDraggable = false;
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

            }
        });

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
                y: this.canvas.height - 50 - i * this.board.cellSize / 2,
                cellSize: this.board.cellSize,
                player: player
            }));
        }
        return stack;
    }

    startDragging(mouseX, mouseY) {
        let stack = this.playerTurn === 1 ? this.player1Stack : this.player2Stack;
        for (let i = 0; i < stack.length; i++) {
            if (stack[i].isCursorInside(mouseX, mouseY)) {
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

        if (this.showMenu) {

        } else {
            this.drawBackground();
            this.drawElements();
            this.player1Stack.forEach(coin => coin.draw(this.ctx));
            this.player2Stack.forEach(coin => coin.draw(this.ctx));
            this.board.draw();
        }
    }

    drawElements() {

        this.restartBtn.draw();
        this.timeText.draw();

        // this.ctx.beginPath();
        // this.ctx.font = "30px Arial";
        // this.ctx.fillStyle = "blue";
        // this.ctx.fillText("Hello, World!", this.canvas.width / 2, 50);
        // this.ctx.closePath();

    }

    drawBackground() {
        let image = new Image();
        image.src = 'static/background.webp';

        image.onload = () => {
            // this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        }

        if (image.complete) {
            this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        }

    }

    endGame(winner) {

        // const size = 350, 150

        this.ctx.beginPath();
        this.ctx.rect()

        this.ctx.closePath();

    }


}