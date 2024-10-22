class Coin extends CanvasElement {

    constructor({ x, y, radius, type }) {
        super(x, y);
        this.type = type;
        this.radius = radius;
        this.draw();
    }

    draw() {

        this.ctx.fillStyle = "#FF0000";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();

    }

    getPosition() {
        return {
            x: this.x + this.radius / 2,
            y: this.y + this.radius / 2,
        }
    }

    setPosition({ x, y }) {
        this.x = x - this.radius / 2;
        this.y = y - this.radius / 2;
    }

    isCursorInside(mouseX, mouseY) {
        return Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2) <= this.radius;
    }

}