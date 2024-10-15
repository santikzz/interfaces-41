class Figure{
      
    constructor(x, y){
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.x = x;
        this.y = y;
    }

    draw(){
    }

    getPosition(){
        return {x: getX(), y: getY()};
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    setFill(){
        this.fill = fill;
    }

}
