class Game extends CanvasElement {

    constructor() {
        super(0, 0);

        this.playerTurn = 1;
        this.draggedCoin = null;
        this.inMenu = true;
        this.time = 250;
        this.setupEventListeners();
        this.menu();
        // this.start({ rows: 6, cols: 7, mode: 4, cellSize: 74 });

        this.audios = {
            clickGame: new Audio('static/audios/Click.mp3'),
            startGame: new Audio('static/audios/Start game.mp3'),
            hoverGame: new Audio('static/audios/hover.mp3'),
            dragCoin: new Audio('static/audios/Drag.mp3'),
            dropCoin: new Audio('static/audios/Drop.mp3'),
            errorCoin: new Audio('static/audios/Error.mp3')
        };

        this.hoveredButton = null;

  
    }

    menu() {
        this.background = new ImageObj({ x: 0, y: 0, width: this.canvas.width, height: this.canvas.height, src: 'static/game/background.webp' });
        this.logo = new ImageObj({ x: this.canvas.width / 2 - 200, y: 100, width: 400, height: 200, src: 'static/game/logo.png' });
        this.selectText = new Text({
            x: this.canvas.width / 2,
            y: this.canvas.height / 2 + 75,
            text: 'Elige un modo de juego',
            anchor: 'center',
            size: 20,
        });

        this.selectText.draw();

        this.modo1 = new Button({
            x: this.canvas.width / 2 - (75 * 3),
            y: this.canvas.height / 2 + 100,
            width: 150, height: 50,
            text: '4 en Linea',
            onClick: () => {
                this.audios.clickGame.play().catch(error => {
                    console.error('Error reproduciendo el audio:', error);
                });
                this.start({ rows: 6, cols: 7, mode: 4, cellSize: 74 });
            },
            onHover: () => {
                this.audios.hoverGame.play().catch(error => {
                    console.error('Error reproduciendo el audio:', error);
                });
            }
        });

        this.modo2 = new Button({
            x: this.canvas.width / 2 - 75,
            y: this.canvas.height / 2 + 100,
            width: 150, height: 50,
            text: '5 en Linea',
            onClick: () => {
                this.audios.clickGame.play().catch(error => {
                    console.error('Error reproduciendo el audio:', error);
                });
                this.start({ rows: 7, cols: 8, mode: 5, cellSize: 64 });
            }
        });

        this.modo3 = new Button({
            x: this.canvas.width / 2 + (75),
            y: this.canvas.height / 2 + 100,
            width: 150, height: 50,
            text: '6 en Linea',
            onClick: () => {
                this.audios.clickGame.play().catch(error => {
                    console.error('Error reproduciendo el audio:', error);
                });
                this.start({ rows: 8, cols: 9, mode: 6, cellSize: 56 });
            },
        });

        let blink = true;
        this.menuInterval = setInterval(() => {
            if (blink) {
                this.selectText.text = 'Elige un modo de juego';
            } else {
                this.selectText.text = '';
            }
            blink = !blink;
            this.draw();
        }, 500);

        // this.modo1.draw();
        // this.modo2.draw();
        // this.modo3.draw();

    }

    start({ rows, cols, mode, cellSize }) {

        this.inMenu = false;
        clearInterval(this.menuInterval);
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.background = new ImageObj({ x: 0, y: 0, width: this.canvas.width, height: this.canvas.height, src: 'static/game/background.webp' });

        this.board = new Board({ rows, cols, mode, cellSize });

        const coinsPerStack = Math.ceil((rows * cols) / 2);

        this.player1Stack = this.generateCoinStack(1, coinsPerStack);
        this.player2Stack = this.generateCoinStack(2, coinsPerStack);

        this.timeText = new Text({
            x: this.canvas.width / 2,
            y: 50,
            text: 250,
            anchor: 'center',
            size: 20,
        });

        this.restartBtn = new Button({
            x: 25, y: 25,
            width: 150, height: 50,
            text: 'Reiniciar',
            onClick: () => {
                this.audios.clickGame.play().catch(error => {
                    console.error('Error reproduciendo el audio:', error);
                });
                this.restart();
            }
        });

        this.gameInterval = setInterval(() => {
            this.time = this.time - 1;
            if (this.time < 0) {
                this.endGame({ reason: 'timeout' });
            }
            this.timeText.text = `Tiempo ${this.time}s`;
            this.draw();
        }, 1000);

        // this.draw();

    }

    setupEventListeners() {

        this.canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            if (this.inMenu) {

                if (this.modo1.isCursorInside(mouseX, mouseY))
                    this.modo1.click();
                if (this.modo2.isCursorInside(mouseX, mouseY))
                    this.modo2.click();
                if (this.modo3.isCursorInside(mouseX, mouseY))
                    this.modo3.click();

            } else {
                if (this.restartBtn.isCursorInside(mouseX, mouseY))
                    this.restartBtn.click();
            }
        });

        this.canvas.addEventListener('mousedown', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            if (this.inMenu) {

            } else {
                this.startDragging(mouseX, mouseY);
            }
        });

        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            if (this.inMenu) {

                if (this.modo1.isCursorInside(mouseX, mouseY) ||
                    this.modo2.isCursorInside(mouseX, mouseY) ||
                    this.modo3.isCursorInside(mouseX, mouseY)) {
                    this.draw();
                }

            } else {
                this.restartBtn.isCursorInside(mouseX, mouseY);

                let stack = this.playerTurn === 1 ? this.player1Stack : this.player2Stack;
                for (let i = 0; i < stack.length; i++) {
                    if (stack[i].isCursorInside(mouseX, mouseY)) { }
                }

                if (this.draggedCoin !== null) {
                    this.hoveredColumn = this.board.getHoveredColumn(mouseX, mouseY);
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

            if (this.inMenu) {
            } else {

                if (this.draggedCoin !== null) {
                    const columnIndex = this.board.getHoveredColumn(mouseX, mouseY);
                    if (columnIndex >= 0) {
                        let row = this.board.placeCoin(columnIndex, this.playerTurn);
                        if (row !== null) {
                            this.playerTurn = this.playerTurn === 1 ? 2 : 1;
                            let cx = this.board.x + columnIndex * this.board.cellSize + this.board.cellSize / 2;
                            let cy = this.board.y + row * this.board.cellSize + this.board.cellSize / 2;
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
        let offset = 0;
        let index = 0;
        for (let i = 0; i < count; i++) {

            if (i % 2 == 0) {
                offset = this.board.cellSize;
                index++;
            } else {
                offset = 0;
            }

            stack.push(new Coin({
                x: player === 1 ? 50 + offset : this.canvas.width - 50 - offset,
                y: this.canvas.height - 25 - index * this.board.cellSize / 3,
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

        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.background.draw();

        if (this.inMenu) {

            this.modo1.draw();
            this.modo2.draw();
            this.modo3.draw();
            this.logo.draw();
            this.selectText.draw();

        } else {

            if (this.hoveredColumn >= 0 && this.draggedCoin !== null) {
                this.board.hover.x = this.board.x + this.board.cellSize * this.hoveredColumn;
                this.board.hover.draw();
            }

            this.drawGameElements();
            this.player1Stack.forEach(coin => coin.draw(this.ctx));
            this.player2Stack.forEach(coin => coin.draw(this.ctx));
            this.board.draw();

            // this.drawTimeout();

        }
    }

    drawGameElements() {
        this.restartBtn.draw();
        this.timeText.draw();
    }

    restart() {
        clearInterval(this.gameInterval);
        this.inMenu = true;
        this.draw();
        this.playerTurn = 1;
        this.draggedCoin = null;
        this.time = 250;
        // this.ctx.fillStyle = "#FF0000"
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.menu();
    }

    endGame({ reason, player = null }) {
        if (reason === 'timeout') {
            // show timeout
        } else if (reason === 'win') {
            // player wins
        }

        this.ctx.beginPath();
        this.ctx.rect()
        this.ctx.closePath();

    }


    drawTimeout() {
        frame = new ImageObj({
            x: this.canvas.width / 2 - 200,
            y: this.canvas.height / 2 - 100,
            width: 600,
            height: 200,
            src: 'static/game/border-image.png',
            smooth: false,
        });
    }

    playAudio(audioKey) {
        const audio = this.audios[audioKey];
        if (audio) {
            audio.play();
        } else {
            console.warn(`El audio ${audioKey} no fue encontrado`);
        }
    }

    playClick() {
        // Espera a que el usuario haga clic para activar el audio
        this.canvas.addEventListener('click', () => {
            this.audios.dropCoin.load(); // Carga el audio
            this.audios.dropCoin.play().catch(error => {
                console.error('Error reproduciendo el audio:', error);
            });
        }, { once: true }); // Escucha solo una vez
    }

}