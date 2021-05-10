

class triangleShape {
    constructor(_x1,_y1,_x2,_y2,_x3,_y3) {
        this.x1 = _x1;
        this.y1 = _y1;
        this.x2 = _x2;
        this.y2 = _y2;
        this.x3 = _x3;
        this.y3 = _y3;
        this.triangleColor = null;   
    }

    getColor(){
        return this.triangleColor;
    }

    setColor(_color){
        this.triangleColor = _color;
    }

    getRandomColorFromPalette(){
        let pick = floor(random(0, palette1.length));
        var col = palette13[pick];
        this.setColor(col);
    }

    render(){
        if(this.triangleColor == null){
            this.getRandomColorFromPalette();
        }
        fill(this.triangleColor);
        noStroke();
        triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
    }

}