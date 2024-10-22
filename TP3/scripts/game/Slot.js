class Slot extends Figure {

    constructor(x, y, radius, fill) {
        super(x, y);
        this.radius = radius;
        this.fill = fill; 
    }

    draw() {
        super.draw()
        this.ctx.fillStyle = this.fill; 
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Dibuja un círculo
        this.ctx.fill();
        this.ctx.closePath();
    }

    getRadius(){
        return this.radius;
    }
}

