class ImageObj extends CanvasElement {

    constructor({ x, y, width, height, src, smooth = true, drawOnLoad = true }) {
        super(x, y);
        this.image = new Image();
        this.image.src = src;
        this.width = width;
        this.height = height;
        this.smooth = smooth;

        if(drawOnLoad){
            this.image.onload = () => {
                this.draw();
            }
        }

    }

    draw() {
        if (this.image.complete) {
            this.ctx.imageSmoothingEnabled = this.smooth;
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            this.ctx.imageSmoothingEnabled = true;
        }
    }

}