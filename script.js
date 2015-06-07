
var x, y, dx, dy;
var squares = [];
var food;
var canvas, context;

function Square(x, y) {
  this.x = x;
  this.y = y;
  this.width = 10;
  this.height = 10;
}

function init() {
  var head = new Square(0, 0);
  squares.push(head);
  canvas = document.querySelector("canvas");
  context = canvas.getContext('2d');
  food = new Square(150, 150);
}

function repaint() {
  for (var i = 0; i < squares.length; i++) {
    
  }
}