class Coin extends CanvasElement {

    constructor({ x, y, cellSize, player }) {
        super(x, y);
        this.player = player;
        this.cellSize = cellSize;
        // this.draw();
    }

    draw() {
        this.ctx.beginPath();
        if (this.player === 1) {
            this.ctx.fillStyle = "#FF0000";
        } else {
            this.ctx.fillStyle = "#0000FF";
        }
        this.ctx.arc(this.x, this.y, this.cellSize / 2.5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    // getPosition() {
    //     return {
    //         x: this.x + this.cellSize / 2,
    //         y: this.y + this.cellSize / 2,
    //     }
    // }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    isCursorInside(mouseX, mouseY) {
        return Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2) <= this.cellSize / 2.5;
    }

}