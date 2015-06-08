
var x, y, dx, dy;
var squares = [];
var food;
var canvas, context;
var gameOn = false;
var repaintInterval = 500;
var foodColor = "red";
var gridDimension = 10;

window.onload = init;

document.querySelector("body").addEventListener('keydown', function (event) {
  event.preventDefault();
  if (event.which == 37) {
    if (dx == 0) {
      dx = -gridDimension;
      dy = 0;
    }
  } else if (event.which == 38) {
    if (dy == 0) {
      dy = -gridDimension;
      dx = 0;
    }
  } else if (event.which == 39) {
    if (dx == 0) {
      dx = gridDimension;
      dy = 0;
    }
  } else if (event.which == 40) {
    if (dy == 0) {
      dy = gridDimension;
      dx = 0;
    }
  }
  //37 gauche
  //38 haut
  //39 droite
  //40 bas
//  console.log(event.which);
});

function Square(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = (color ? color : "black");
  this.width = gridDimension;
  this.height = gridDimension;
}

function start() {
  gameOn = true;
  repaint();
  document.querySelector("#btn_start").disabled = true;
  document.querySelector("#btn_pause").disabled = false;
}

function pause() {
  gameOn = false;
  document.querySelector("#btn_resume").disabled = false;
  document.querySelector("#btn_pause").disabled = true;
}

function resume() {
  gameOn = true;
  document.querySelector("#btn_pause").disabled = false;
  document.querySelector("#btn_resume").disabled = true;
  repaint();
}

function init() {
  document.querySelector("#btn_start").disabled = false;
  document.querySelector("#btn_pause").disabled = true;
  document.querySelector("#btn_resume").disabled = true;
  var head = new Square(-gridDimension, 0);
  squares.push(head);
  squares.push(new Square(0, 0));
  squares.push(new Square(0, 0));
  canvas = document.querySelector("canvas");
  context = canvas.getContext('2d');
  dx = gridDimension;
  dy = 0;
  food = new Square(0, 0, foodColor);
  changeFoodPosition();
}

function repaint() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paintSnake();
  showFood();
  if (gameOn) {
    setTimeout(repaint, repaintInterval);
  }
}

//function moveSnake() {
//  paintSnake();
//  //test eating food
//  if (gameOn) {
//    setTimeout(moveSnake, repaintInterval);
//  }
//}

function paintSnake() {
  //  decrease opacity with length
  var head = squares[0];
  var oldX = head.x;
  var oldY = head.y;
  head.x += dx;
  head.y += dy;
  context.strokeStyle = head.color;
  context.strokeRect(head.x, head.y, head.width, head.height);
  for (var i = 1; i < squares.length; i++) {
    var x = squares[i].x, y = squares[i].y;
    squares[i].x = oldX;
    squares[i].y = oldY;
    oldX = x;
    oldY = y;
    context.strokeStyle = squares[i].color;
    context.strokeRect(squares[i].x, squares[i].y, squares[i].width, squares[i].height);
  }
}

function changeFoodPosition() {
  var d = canvas.width;
  var x = Math.random() * d;
  x = x - (x % gridDimension);
  var y = Math.random() * d;
  y = y - (y % gridDimension);
  food.x = x;
  food.y = y;
}

function showFood() {
  context.fillStyle = food.color;
  context.fillRect(food.x, food.y, food.width, food.height);
}

function animate() {

}