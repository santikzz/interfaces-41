class CanvasElement {

    constructor(x, y) {
        this.canvas = document.getElementById('canvas');
        /** @type {CanvasRenderingContext2D} */                 // ctx variable type para vscode intellisense
        this.ctx = this.canvas.getContext("2d");
        this.x = x;
        this.y = y;
    }

    draw() { }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

}