class Game extends CanvasElement {

    constructor() {
        super(0, 0);

        this.playerTurn = 1;
        this.draggedCoin = null;
        this.inMenu = true;
        this.time = 250;
        this.hoveredButton = null;
        this.allowDrag = true;
        this.placedCoins = 0;
        this.player1SelectedCoin = 0;
        this.player2SelectedCoin = 3;
        this.alreadyPlaying = false;
        this.setupEventListeners();

        this.audios = {
            buttonClick: new Audio('static/audios/button_click.mp3'),
            coinDrag: new Audio('static/audios/coin_drag.mp3'),
            coinDrop: new Audio('static/audios/coin_drop.mp3'),
            ambience: new Audio('static/audios/ambience.mp3'),
        };

        this.audios.ambience.loop = true;
        this.audios.ambience.volume = 0.25;
        this.menu();
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
                this.audios.buttonClick.play();
                this.start({ rows: 6, cols: 7, mode: 4, cellSize: 74 });
            }
        });

        this.modo2 = new Button({
            x: this.canvas.width / 2 - 75,
            y: this.canvas.height / 2 + 100,
            width: 150, height: 50,
            text: '5 en Linea',
            onClick: () => {
                this.audios.buttonClick.play().catch(error => {
                    console.error('Error reproduciendo el audio:', error);
                });
                this.start({ rows: 7, cols: 8, mode: 5, cellSize: 64 });
            },
        });

        this.modo3 = new Button({
            x: this.canvas.width / 2 + (75),
            y: this.canvas.height / 2 + 100,
            width: 150, height: 50,
            text: '6 en Linea',
            onClick: () => {
                this.audios.buttonClick.play().catch(error => {
                    console.error('Error reproduciendo el audio:', error);
                });
                this.start({ rows: 8, cols: 9, mode: 6, cellSize: 56 });
            },
        });

        this.selectCoinTextLeft = new Text({
            x: 150,
            y: this.canvas.height - 110,
            text: 'Elige tu ficha',
            anchor: 'center',
        })

        this.selectCoinTextRight = new Text({
            x: this.canvas.width - 148,
            y: this.canvas.height - 110,
            text: 'Elige tu ficha',
            anchor: 'center',
        })

        this.piltoverCoin1 = new ButtonImg({
            x: 50,
            y: this.canvas.height - 75,
            width: 50,
            height: 50,
            src: 'static/game/piltover1.png',
            onClick: () => {
                this.audios.coinDrop.play();
                this.player1SelectedCoin = 0
            },
            isSelected: true,
        })

        this.piltoverCoin2 = new ButtonImg({
            x: 125,
            y: this.canvas.height - 75,
            width: 50,
            height: 50,
            src: 'static/game/piltover2.png',
            onClick: () => {
                this.audios.coinDrop.play();
                this.player1SelectedCoin = 1
            },
            isSelected: false,
        })

        this.piltoverCoin3 = new ButtonImg({
            x: 200,
            y: this.canvas.height - 75,
            width: 50,
            height: 50,
            src: 'static/game/piltover3.png',
            onClick: () => {
                this.audios.coinDrop.play();
                this.player1SelectedCoin = 2
            },
            isSelected: false,
        })

        this.piltoverCoin4 = new ButtonImg({
            x: this.canvas.width - 100,
            y: this.canvas.height - 75,
            width: 50,
            height: 50,
            src: 'static/game/zaun1.png',
            onClick: () => {
                this.audios.coinDrop.play();
                this.player2SelectedCoin = 3
            },
            isSelected: true,
        })

        this.piltoverCoin5 = new ButtonImg({
            x: this.canvas.width - 175,
            y: this.canvas.height - 75,
            width: 50,
            height: 50,
            src: 'static/game/zaun2.png',
            onClick: () => {
                this.audios.coinDrop.play();
                this.player2SelectedCoin = 4
            },
            isSelected: false,
        })

        this.piltoverCoin6 = new ButtonImg({
            x: this.canvas.width - 250,
            y: this.canvas.height - 75,
            width: 50,
            height: 50,
            src: 'static/game/zaun3.png',
            onClick: () => {
                this.audios.coinDrop.play();
                this.player2SelectedCoin = 5
            },
            isSelected: false,
        })

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

    }

    start({ rows, cols, mode, cellSize }) {

        if (!this.alreadyPlaying) {
            this.audios.ambience.play();
            this.alreadyPlaying = true;
        }

        this.inMenu = false;                                                                                    // cambio el flag de inMenu
        clearInterval(this.menuInterval);                                                                       // corto el timer del menu
        this.board = new Board({ rows, cols, mode, cellSize });                                                 // creo un nuevo tablero dinamico con los parametros del juego
        const coinsPerStack = Math.ceil((rows * cols) / 2);                                                     // calculo la cantidad de fichas por jugador para completar el tablero
        this.player1Stack = this.generateCoinStack(1, coinsPerStack, this.player1SelectedCoin);                 // genero la pila de fichas de cada jugador
        this.player2Stack = this.generateCoinStack(2, coinsPerStack, this.player2SelectedCoin);

        this.timeText = new Text({
            x: this.canvas.width / 2,
            y: 50,
            text: 250,
            anchor: 'center',
            size: 20,
        });

        this.playerTurnText = new Text({
            x: this.canvas.width / 2,
            y: 100,
            text: 'Turno del jugador 1',
            anchor: 'center',
            size: 15,
        });

        this.restartBtn = new Button({
            x: 25, y: 25,
            width: 150, height: 50,
            text: 'Menu',
            onClick: () => {
                this.audios.buttonClick.play().catch(error => {
                    console.error('Error reproduciendo el audio:', error);
                });
                this.restart();
            }
        });

        this.gameInterval = setInterval(() => {
            this.time = this.time - 1;
            if (this.time <= 0) {
                this.tieGame();
            }
            this.timeText.text = `Tiempo ${this.time}s`;
            this.draw();
        }, 1000);

    }

    // creo los event listener para eventos como click, mousedown, mouseup, mousemove, etc...
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

                if (this.piltoverCoin1.isCursorInside(mouseX, mouseY))
                    this.piltoverCoin1.click();
                if (this.piltoverCoin2.isCursorInside(mouseX, mouseY))
                    this.piltoverCoin2.click();
                if (this.piltoverCoin3.isCursorInside(mouseX, mouseY))
                    this.piltoverCoin3.click();
                if (this.piltoverCoin4.isCursorInside(mouseX, mouseY))
                    this.piltoverCoin4.click();
                if (this.piltoverCoin5.isCursorInside(mouseX, mouseY))
                    this.piltoverCoin5.click();
                if (this.piltoverCoin6.isCursorInside(mouseX, mouseY))
                    this.piltoverCoin6.click();

                this.piltoverCoin1.isSelected = this.player1SelectedCoin == 0;
                this.piltoverCoin2.isSelected = this.player1SelectedCoin == 1;
                this.piltoverCoin3.isSelected = this.player1SelectedCoin == 2;

                this.piltoverCoin4.isSelected = this.player2SelectedCoin == 3;
                this.piltoverCoin5.isSelected = this.player2SelectedCoin == 4;
                this.piltoverCoin6.isSelected = this.player2SelectedCoin == 5;

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
                if (this.allowDrag) {
                    this.startDragging(mouseX, mouseY);
                }
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

                if (this.piltoverCoin1.isCursorInside(mouseX, mouseY) ||
                    this.piltoverCoin2.isCursorInside(mouseX, mouseY) ||
                    this.piltoverCoin3.isCursorInside(mouseX, mouseY) ||
                    this.piltoverCoin4.isCursorInside(mouseX, mouseY) ||
                    this.piltoverCoin5.isCursorInside(mouseX, mouseY) ||
                    this.piltoverCoin6.isCursorInside(mouseX, mouseY)) {
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

                            // this.playerTurn = this.playerTurn === 1 ? 2 : 1;
                            this.draggedCoin.coin.isDraggable = false;
                            this.animateDrop(this.draggedCoin.coin, row, columnIndex);

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

    // animacion de caida de la ficha
    animateDrop(coin, row, column) {
        let targetX = this.board.x + column * this.board.cellSize + this.board.cellSize / 2;
        let targetY = this.board.y + row * this.board.cellSize + this.board.cellSize / 2;

        const speed = 5;
        coin.x = targetX;
        const animate = () => {
            coin.y += speed;
            if (coin.y < targetY) {
                requestAnimationFrame(animate);
            } else {
                // lo que se ejecuta cuando la ficha termina la animacion de gravedad
                coin.setPosition(targetX, targetY);
                this.audios.coinDrop.play();
                this.updateGameState(row, column);
            }
            this.draw();
        };
        animate();
    }

    // checkeo y actualizo el estado del juego, [ganador, empate, sig. turno]
    updateGameState(row, column) {
        // si hay ganador, termina el juego y muestro cartel de victoria
        this.board.checkWin(row, column);
        if (this.board.winner !== null) {
            this.showVictory(this.board.winner);
            return;
        }

        // si se lleno el tablero, muestro cartel de empate
        this.placedCoins++;
        if (this.placedCoins >= (this.player1Stack.length + this.player2Stack.length)) {
            this.tieGame();
            return;
        }

        // si ninguna de las anteriores sucedio, cambio al siguiente turno
        this.playerTurn = this.playerTurn === 1 ? 2 : 1;
        this.playerTurnText.text = `Turno del jugador ${this.playerTurn}`;
    }

    // genero la pila de fichas
    // al ser tantas, dibujo alternando su posicion con modulo de 2 (i % 2)
    // para dibujar dos pilas una al lado de la otra y no llenar el espacio verticalmente
    generateCoinStack(player, count, coinImageIndex) {
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
                coinImageIndex: coinImageIndex
            }));
        }
        return stack;
    }

    startDragging(mouseX, mouseY) {
        let stack = this.playerTurn === 1 ? this.player1Stack : this.player2Stack;
        for (let i = 0; i < stack.length; i++) {
            if (stack[i].isCursorInside(mouseX, mouseY)) {
                this.audios.coinDrag.play();
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
        this.background.draw();
        if (this.inMenu) {
            this.modo1.draw();
            this.modo2.draw();
            this.modo3.draw();

            this.piltoverCoin1.draw();
            this.piltoverCoin2.draw();
            this.piltoverCoin3.draw();
            this.piltoverCoin4.draw();
            this.piltoverCoin5.draw();
            this.piltoverCoin6.draw();

            this.logo.draw();
            this.selectText.draw();
            this.selectCoinTextLeft.draw();
            this.selectCoinTextRight.draw();
        } else {
            if (this.hoveredColumn >= 0 && this.draggedCoin !== null) {
                this.board.hover.x = this.board.x + this.board.cellSize * this.hoveredColumn;
                this.board.hover.draw();
            }
            this.restartBtn.draw();
            this.timeText.draw();
            this.playerTurnText.draw();
            this.player1Stack.forEach(coin => coin.draw(this.ctx));
            this.player2Stack.forEach(coin => coin.draw(this.ctx));
            this.board.draw();
        }
    }

    restart() {
        clearInterval(this.gameInterval);
        this.inMenu = true;
        this.draw();
        this.playerTurn = 1;
        this.draggedCoin = null;
        this.time = 250;
        this.allowDrag = true;
        this.placedCoins = 0;
        this.menu();
    }

    // muestra el texto de empate
    tieGame() {
        clearInterval(this.gameInterval);
        this.allowDrag = false;
        this.playerTurnText.text = "EMPATE";
        this.playerTurnText.size = 25;
    }

    // muestra el texto de victoria
    showVictory(winner) {
        clearInterval(this.gameInterval);
        this.allowDrag = false;
        this.playerTurnText.size = 25;
        this.playerTurnText.text = `Ganador jugador ${winner}`;
    }

}