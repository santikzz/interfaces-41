class Coin extends CanvasElement {

    constructor({ x, y, radius, type }) {
        super(100, 100);
        this.type = type;
        this.radius = radius;
        this.draw();
    }

    draw() {

        this.ctx.fillStyle = "#FF0000";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 32, 0, Math.PI * 2);
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

    isPointInside({ x, y }) {
        let dx = this.x - x;
        let dy = this.y - y;
        return Math.sqrt(dx ** 2, dy ** 2) < this.radius;
    }

}