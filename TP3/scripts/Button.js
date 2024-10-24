class Button extends CanvasElement {

    constructor({ x, y, width, height, text, onClick }) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.text = text;
        this.onClick = onClick;

        this.image = new Image();
        this.image.src = 'static/button.png';

        this.image.onload = () => {
            this.draw();
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.imageSmoothingEnabled = false;

        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.ctx.font = '12px PressStart2P';
        this.ctx.fillStyle = '#ffffff';

        const textWidth = this.ctx.measureText(this.text).width;

        this.ctx.fillText(
            this.text,
            this.x + (this.width / 2) - (textWidth / 2),
            this.y + (this.height / 2) + 6
        );

        this.ctx.imageSmoothingEnabled = true;
        this.ctx.closePath();
    }

    isCursorInside(mouseX, mouseY) {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            this.image.src = 'static/button-down.png';
            this.canvas.style.cursor = 'url("static/point.png"), auto';
            return true;
        }
        this.image.src = 'static/button.png';
        this.canvas.style.cursor = 'url("static/default.png"), auto';
        return false;
    }

    click() {
        this.onClick();
    }

}