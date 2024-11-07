class ButtonImg extends CanvasElement {

    constructor({ x, y, width, height, onClick, src, isSelected }) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.onClick = onClick;
        this.isSelected = isSelected;

        this.image = new Image();
        this.image.src = src;

        this.image.onload = () => {
            this.draw();
        }

    }

    draw() {
        this.ctx.beginPath();
        if (this.isSelected) {
            this.ctx.fillStyle = "#d27d2c";
            this.ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 1.6, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.closePath();
    }

    isCursorInside(mouseX, mouseY) {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            this.canvas.style.cursor = 'url("static/game/point.png"), auto';
            return true;
        }
        this.canvas.style.cursor = 'url("static/game/default.png"), auto';
        return false;
    }

    click() {
        this.onClick();
    }


}