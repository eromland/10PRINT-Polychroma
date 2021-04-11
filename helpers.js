

function populateEdgeTileArrays(){
    for (let index = segments-1; index < segments*segments; index+=segments) {
        rightEdgeTiles.push(index);
    } 
    for (let index = 0; index < ((segments*(segments-1))+1); index+=segments) {
        leftEdgeTiles.push(index);
    }
    for (let index = (segments*(segments-1)); index < segments*segments; index++) {
        bottomEdgeTiles.push(index);
    }
    for (let index = 0; index < segments; index++) {
        topEdgeTiles.push(index);
    }
}

function getRandomBackground(){
    let pick = floor(random(0, backgrounds.length));
    var col = backgrounds[pick];
    return col;
}
