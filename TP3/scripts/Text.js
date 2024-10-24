class Text extends CanvasElement {

    constructor({ x, y, text, anchor }) {
        super(x, y);
        this.text = text;
        this.anchor = anchor;
    }

    draw() {
        this.ctx.beginPath();

        this.ctx.font = '12px PressStart2P';
        this.ctx.fillStyle = '#ffffff';

        const textWidth = this.ctx.measureText(this.text).width;
        let textX = this.x;

        if (this.anchor === 'center') {
            textX = this.x - (textWidth / 2);
        }

        this.ctx.fillText(
            this.text,
            textX,
            this.y + 6
        );

        this.ctx.closePath();
    }

}