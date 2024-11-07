class Cell extends CanvasElement {

    constructor({ x, y, size = 64 }) {
        super(x, y);
        this.image = new Image();
        this.image.src = 'static/game/cell.png';
        this.size = size;

        this.image.onload = () => {
            this.draw();
        }

    }

    draw() {
        if (this.image.complete) {
            this.ctx.imageSmoothingEnabled = false;
            this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
            this.ctx.imageSmoothingEnabled = false;
        }
    }

}