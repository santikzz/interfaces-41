class Coin extends CanvasElement {

    constructor({ x, y, cellSize, coinImageIndex }) {
        super(x, y);
        this.coinImageIndex = coinImageIndex;
        this.cellSize = cellSize;
        this.scale = 1.25;
        this.isDraggable = true;
        this.image = new Image();
        this.coinImages = [
            'static/game/piltover1.png',
            'static/game/piltover2.png',
            'static/game/piltover3.png',
            'static/game/zaun1.png',
            'static/game/zaun2.png',
            'static/game/zaun3.png',
        ]
        this.image.src = this.coinImages[this.coinImageIndex];
        this.image.onload = () => {
            this.draw();
        }
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