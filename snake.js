const canvas = document.getElementById('canvas')

const ctx = canvas.getContext('2d')


// GRID
const cellWidth = 20
const cellHeight = 20

const totalOfColumns = Math.ceil((canvas.width - 20) / cellWidth)
const totalOfRows = Math.ceil((canvas.height - 20) / cellHeight)

// Maçã

var xApple;
var yApple;

function isApple(x, y) {
  return xApple == x && yApple == y
}

function createApple() {
  xApple = Math.ceil((totalOfColumns - 1) * Math.random())
  yApple = Math.ceil((totalOfRows - 1) * Math.random())

  if (isWall(xApple, yApple) || isSnake(xApple, yApple)) {
    createApple()
  }

  console.log(xApple, yApple)
}

function isWall(x, y) {
  return !(x >= 1 && x < totalOfColumns && y >= 1 && y < totalOfRows)
}

// SNAKE

var snake;

var xSpeed;
var ySpeed;

function isSnake(x, y) {
  for (const part of snake) {
    if (part.x == x && part.y == y) {
      return true
    }
  }
  return false
}

function updateSnake() {
  const newhead = { x: snake[0].x + xSpeed, y: snake[0].y + ySpeed }

  // Se newhead for parede fim de jogo
  if (isWall(newhead.x, newhead.y) || isSnake(newhead.x, newhead.y)) {
    gameover()
  }

  snake = [newhead].concat(snake)

  if (isApple(newhead.x, newhead.y)) {
    createApple()
  } else {
    snake.pop()
  }
}

// RENDER
function render(/* argumentos */) {
  console.log("render...")

  for (let x = 1; x < totalOfColumns; x++) {
    for (let y = 1; y < totalOfRows; y++) {
      let xPos = x * cellWidth
      let yPos = y * cellHeight

      if (isApple(x, y)) {
        ctx.fillStyle = "red"
        ctx.fillRect(xPos + 4, yPos + 4, cellWidth, cellHeight)
      } else if (isSnake(x, y)) {
        ctx.fillStyle = "blue"
        ctx.fillRect(xPos + 4, yPos + 4, cellWidth, cellHeight)
      } else {
        ctx.fillStyle = "white"
        ctx.fillRect(xPos + 4, yPos + 4, cellWidth, cellHeight)
      }
    }
  }
}

var isRunning = false

function gameover() {
  isRunning = false

  let menu = document.getElementById("menu")
  menu.style = "display: flex"

  document.onkeydown = function() {
    start()
  }
}

function gameloop() {
  render()
  updateSnake()
  if (isRunning)
    setTimeout(gameloop, 100)
}

function start() {
  isRunning = true

  let menu = document.getElementById("menu")
  menu.style = "display: none"

  snake = [
    { x: 2, y: 1 },
    { x: 1, y: 1 }
  ]

  xSpeed = 1
  ySpeed = 0

  xApple = 4
  yApple = 4

  document.onkeydown = function(e) {
    switch (e.key) {
      case 'ArrowUp':
        if (ySpeed >= 1)
          return;
        ySpeed = -1
        xSpeed = 0
        break
      case 'ArrowDown':
        if (ySpeed <= -1)
          return;
        ySpeed = 1
        xSpeed = 0
        break
      case 'ArrowLeft':
        if (xSpeed >= 1)
          return;
        ySpeed = 0
        xSpeed = -1
        break
      case 'ArrowRight':
        if (xSpeed <= -1)
          return;
        ySpeed = 0
        xSpeed = 1
        break
    }
  }

  gameloop()
}

document.onkeydown = function() {
  start()
}
