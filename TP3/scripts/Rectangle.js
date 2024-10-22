class Rectangle extends Figures{

    constructor(x, y, fill, width, height){
        super(x, y, fill);
        this.width = width;
        this.height = height;
    }

    draw(){
        super.draw();
        this.ctx.fillStyle = this.fill; 
        this.ctx.fill();
        this.ctx.closePath();
    }

}