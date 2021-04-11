var segments = 30;
var Tiles = [];
var tileIndex = 0;
var savepath = '/home/erlend/Desktop/Prosjekter/10PRINT';
var palette1 = ['#59484D', '#88BFB0', '#F2E4BB', '#F2A663', '#F2695C'];
var palette2 = ['#E29C92', '#F6B3B9', '#FCDCC5', '#B0D9CD', '#63AAB5'];
var palette3 = ['#8FA368', '#CBF084', '#F08286', '#489EA3', '#75E8F0'];
var palette4 = ['#024873', '#024873', '#04BFAD', '#F28963', '#F25E5E'];
var backgrounds = ['#F7A8B1', '#C4F2D4', '#FAEEE1'];
var rightEdgeTiles = [];
var leftEdgeTiles = [];
var bottomEdgeTiles = [];
var topEdgeTiles = [];
var edgeTiles = [];
var traversed = [];
var edgeBorder = 120;

function setup() {
  createCanvas(1800, 1800);
  background(getRandomBackground()); 
  noLoop();
}

function draw() {
  let spacing = (width-2*edgeBorder) / segments;
  populateEdgeTileArrays();
  stroke(0);

  for (let y = edgeBorder; y < height - edgeBorder; y += spacing) {
    for (let x = edgeBorder; x < width - edgeBorder; x += spacing) {
      if (random(1) < random(0.5)) {
        // Make triangles for color filling
        Tiles.push(new forwardSlash(x, y, spacing, tileIndex));
      } else {
        Tiles.push(new backSlash(x, y, spacing, tileIndex));
      }
      tileIndex++;
    }
  }
  //Use walk-functions to color pattern
  for (let index = 0; index < Tiles.length; index++) {
    if (Tiles[index].getType() == "forwardSlash") {
      if (Tiles[index].getUpper().getColor() == null) {
        Tiles[index].getUpper().getRandomColorFromPalette();
        if (!Tiles[index].getArrayIndex() == 0) {
          traversePathFromSeed(Tiles[index], index - 1, index, Tiles[index].getUpper());
        }
        traversePathFromSeed(Tiles[index], index - segments, index, Tiles[index].getUpper());
        traversed = [];
      } else if (Tiles[index].getLower().getColor() == null) {
        Tiles[index].getLower().getRandomColorFromPalette();
        traversePathFromSeed(Tiles[index], index + segments, index, Tiles[index].getLower());
        traversePathFromSeed(Tiles[index], index + 1, index, Tiles[index].getLower());
        traversed = [];
      }

    } else {
      if (Tiles[index].getUpper().getColor() == null) {
        Tiles[index].getUpper().getRandomColorFromPalette();
        traversePathFromSeed(Tiles[index], index - segments, index, Tiles[index].getUpper());
        traversePathFromSeed(Tiles[index], index + 1, index, Tiles[index].getUpper());
        traversed = [];
      } else if (Tiles[index].getLower().getColor() == null) {
        Tiles[index].getLower().getRandomColorFromPalette();
        if (!Tiles[index].getArrayIndex() == 0) {
          traversePathFromSeed(Tiles[index], index - 1, index, Tiles[index].getLower());
        }
        traversePathFromSeed(Tiles[index], index + segments, index, Tiles[index].getLower());
        traversed = [];
      }
    }
  }



  //render tiles
  for (let index = 0; index < Tiles.length; index++) {
    Tiles[index].getUpper().render();
    Tiles[index].getLower().render();
    stroke(0);
    line(Tiles[index].getLineX1(), Tiles[index].getLineY1(), Tiles[index].getLineX2(), Tiles[index].getLineY2());
  }
}

function traversePathFromSeed(_seed, _current, _prev, _triangle) {
  const seed = _seed;
  let current = _current;
  let prev = _prev;
  let temp;
  const triangle = _triangle;
  let go = true;
  if (!Tiles[prev] == seed) {
    traversed.push(prev);
  }
  while (go) {
    if (current < 0 || current > (segments * segments - 1)) {
      go = false;
      break;
    }
    else if (current == (prev - 1) && leftEdgeTiles.includes(prev)) {
      go = false;
      break;
    }
    else if (current == (prev + 1) && rightEdgeTiles.includes(prev)) {
      go = false;
      break;
    }
    else if (traversed.includes(current)) {
      go = false;
      break;
    }
    if (Tiles[current].findCorrectTriangle(prev).getColor() == null) {
      Tiles[current].findCorrectTriangle(prev).setColor(triangle.getColor());
    }
    temp = current;
    current = Tiles[current].whereIsNext(prev);
    prev = temp;
    if (Tiles[current] === seed && seed.getUpper().getColor() != null && seed.getLower().getColor()) {
      break;
    }
  }
}
