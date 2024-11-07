class Figure{
      
    constructor(x, y){
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.resaltado = false; //para indicar que aun no se resalto en el tablero, aun no se ha dibuajdo
        this.x = x;
        this.y = y;
    }

    draw(){
    }

    getPosition(){
        return {
            x: getX(), 
            y: getY()
        };
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

    //agregar una imagen de fondo
    /*
    let image = ctx.createPattern(img,"repeat");
    ctx.rect(0, 0, 150, 100);
    ctx.fillStyle = image;
    ctx.fill();*/

}
