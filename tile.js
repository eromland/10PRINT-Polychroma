class tile {
    constructor(_x,_y, _tileW, _index){
        this.topX1 = _x;
        this.topY1 = _y;
        this.bottomX1 = _x;
        this.bottomY1 = _y;
        this.tileW = _tileW;
        this.arrayIndex = _index;
        this.next;
        this.ptr_right = _index + 1;
        this.ptr_left = _index - 1;
        this.ptr_up = _index - segments; 
        this.ptr_down = _index + segments;
    }
   
    getArrayIndex(){
        return this.arrayIndex;
    }
}

class forwardSlash extends tile {
    constructor(_x,_y,_tileW, _index){
        super(_x,_y,_tileW, _index);
        this.type = "forwardSlash";
        this.topX2 = _x + this.tileW;
        this.topY2 = _y;
        this.topX3 = _x;
        this.topY3 = _y + this.tileW;
        this.bottomY1 = _y + this.tileW;
        this.bottomX2 = _x + this.tileW;
        this.bottomY2 = _y + this.tileW;
        this.bottomX3 = _x + this.tileW;
        this.bottomY3 = _y;
        this.upper = new triangleShape(this.topX1, this.topY1, this.topX2, this.topY2, this.topX3, this.topY3);
        this.lower = new triangleShape(this.bottomX1, this.bottomY1, this.bottomX2, this.bottomY2, this.bottomX3, this.bottomY3);
        this.lineX1 = _x;
        this.lineY1 = _y + this.tileW;
        this.lineX2 = _x + this.tileW;
        this.lineY2 = _y; 
    }
    getType(){
        return this.type;
    }
    getLineX1(){
        return this.lineX1;
    }
    getLineY1(){
        return this.lineY1;
    }
    getLineX2(){
        return this.lineX2;
    }
    getLineY2(){
        return this.lineY2;
    }
    whereIsNext(ptr){
        if (ptr == this.ptr_right) {
            return this.ptr_down;
        }
        else if (ptr == this.ptr_down){
            return this.ptr_right;
        }
        else if (ptr == this.ptr_left){
            return this.ptr_up;
        }
        else if (ptr == this.ptr_up){
            return this.ptr_left;
        }
    }
    findCorrectTriangle(_ptr){
        if (_ptr == this.ptr_right || _ptr == this.ptr_down) {
            return this.getLower();
        }
        else if (_ptr == this.ptr_up || _ptr == this.ptr_left){
            return this.getUpper();
        }
    }

    getUpper(){
        return this.upper;
    }
    getLower(){
        return this.lower;
    }
    ////DU JOBBER HER!!!////
}

class backSlash extends tile {
    constructor(_x,_y,_tileW, _index){
        super(_x,_y,_tileW, _index);
        this.type = "backSlash";
        this.topX2 = _x + this.tileW;
        this.topY2 = _y;
        this.topX3 = _x + this.tileW;
        this.topY3 = _y + this.tileW;
        this.bottomX2 = _x;
        this.bottomY2 = _y + this.tileW;
        this.bottomX3 = _x + this.tileW;
        this.bottomY3 = _y + this.tileW;
        this.upper = new triangleShape(this.topX1, this.topY1, this.topX2, this.topY2, this.topX3, this.topY3);
        this.lower = new triangleShape(this.bottomX1, this.bottomY1, this.bottomX2, this.bottomY2, this.bottomX3, this.bottomY3);
        this.lineX1 = _x;
        this.lineY1 = _y;
        this.lineX2 = _x + this.tileW;
        this.lineY2 = _y + this.tileW; 
    }
    getUpper(){
        return this.upper;
    }
    getLower(){
        return this.lower;
    }
    getType(){
        return this.type;
    }
    getLineX1(){
        return this.lineX1;
    }
    getLineY1(){
        return this.lineY1;
    }
    getLineX2(){
        return this.lineX2;
    }
    getLineY2(){
        return this.lineY2;
    }
    whereIsNext(ptr){
        if (ptr == this.ptr_right) {
            return this.ptr_up;
        }
        else if (ptr == this.ptr_up){
            return this.ptr_right;
        }
        else if (ptr == this.ptr_left){
            return this.ptr_down;
        }
        else if (ptr == this.ptr_down){
            return this.ptr_left;
        }
    }
    findCorrectTriangle(_ptr){
        if (_ptr == this.ptr_right || _ptr == this.ptr_up) {
            return this.getUpper();
        }
        else if (_ptr == this.ptr_down || _ptr == this.ptr_left) {
            return this.getLower();
        }
    }
}

