class Cell extends CanvasElement {

    constructor({ x, y, size = 64 }) {
        super(x, y);
        this.image = new Image();
        this.image.src = 'static/cell.png';
        this.size = size;
    }

    draw() {
        this.image.onload = () => {
            this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        }
    }
    
}