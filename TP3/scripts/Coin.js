class Coin extends CanvasElement {

    constructor({ x, y, cellSize, player }) {
        super(x, y);
        this.player = player;
        this.cellSize = cellSize;
        this.scale = 1.25;

        this.image = new Image();
        if (player === 1) {
            this.image.src = 'static/game/piltover.png';
        } else if (player === 2) {
            this.image.src = 'static/game/zaun.png';
        }

        this.image.onload = () => {
            this.draw();
        }

        this.isDraggable = true;
    }

    draw() {
        this.ctx.beginPath();
        if (this.image.complete) {
            this.ctx.drawImage(this.image,
                this.x - this.cellSize / this.scale / 2,
                this.y - this.cellSize / this.scale / 2,
                this.cellSize / this.scale,
                this.cellSize / this.scale
            );
        }

        this.ctx.closePath();
    }


    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    isCursorInside(mouseX, mouseY) {
        if ((Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2) <= this.cellSize / this.scale) && this.isDraggable) {
            this.canvas.style.cursor = 'url("static/game/point.png"), auto';
            return true;
        }
        return false;
    }

}