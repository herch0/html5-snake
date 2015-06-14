
var x, y, dx, dy;
var squares = [];
var food;
var canvas, context;
var gameOn = false;
var repaintInterval = 300;
var foodColor = "red";
var gridDimension = 10;
var score = 0;

window.onload = init;

document.querySelector("body").addEventListener('keydown', function (event) {
  event.preventDefault();
  if (gameOn) {
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
  }
  canvas.focus();
});

function Square(x, y, fColor, sColor) {
  this.x = x;
  this.y = y;
  this.fColor = (fColor ? fColor : "black");
  this.sColor = (sColor ? sColor : "white");
  this.width = gridDimension;
  this.height = gridDimension;
}

function start() {
  gameOn = true;
  init();
  repaint();
}

function pause() {
  gameOn = false;
  document.querySelector("#btn_resume").disabled = false;
  document.querySelector("#btn_pause").disabled = true;
  canvas.focus();
}

function gameOver() {
  gameOn = false;
  
  context.fillStyle = 'black';
  context.globalAlpha = .7;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;
  
  var text = "Game Over";
  context.font = '30px Arial';
  context.fillStyle = 'white';
  context.textAlign = 'center';
//  var metrics = context.measureText(text);;
  var x = (canvas.width / 2);
  var y = canvas.height / 2;
  context.fillText(text, x, y);  

  document.querySelector("#btn_resume").disabled = true;
  document.querySelector("#btn_pause").disabled = true;
  document.querySelector("#btn_start").disabled = false;
  canvas.focus();
}

function resume() {
  gameOn = true;
  document.querySelector("#btn_pause").disabled = false;
  document.querySelector("#btn_resume").disabled = true;
  repaint();
  canvas.focus();
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
  canvas.focus();
}

function repaint() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paintSnake();
  showFood();
  if (gameOn) {
    setTimeout(repaint, repaintInterval);
  }
}

function paintSnake() {
  var head = squares[0];
  var oldX = head.x;
  var oldY = head.y;
//  head.x += dx;
//  head.y += dy;
  for (var i = 1; i < squares.length; i++) {
    if (head.x != 0) {
      if (squares[i].x == head.x && squares[i].y == head.y) {
        //collision
        gameOver();
        head.x -= dx;
        head.y -= dy;
      }
    }
  }
  context.globalAlpha = 1;
  context.strokeStyle = head.sColor;
  context.fillStyle = head.fColor;
  context.strokeRect(head.x, head.y, head.width, head.height);
  context.fillRect(head.x, head.y, head.width, head.height);
  for (var i = 1; i < squares.length; i++) {
    context.globalAlpha = (squares.length - i) / squares.length;
    var x = squares[i].x, y = squares[i].y;
    squares[i].x = oldX;
    squares[i].y = oldY;
    oldX = x;
    oldY = y;
//    if (squares[i].x == head.x && squares[i].y == head.y) {
//      //collision
//      gameOver();
//    }
    context.strokeStyle = squares[i].sColor;
    context.fillStyle = squares[i].fColor;
    context.fillRect(squares[i].x, squares[i].y, squares[i].width, squares[i].height);
    context.strokeRect(squares[i].x, squares[i].y, squares[i].width, squares[i].height);
    context.globalAlpha = 1;
    if (head.x == food.x && head.y == food.y) {
      foodEated();
    }
  }
}

function foodEated() {
  changeFoodPosition();
  score++;
  document.querySelector("#span_score").innerHTML = score;
  squares.push(new Square(0, 0));
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
  context.globalAlpha = 1;
  context.fillStyle = food.fColor;
  context.fillRect(food.x, food.y, food.width, food.height);
}