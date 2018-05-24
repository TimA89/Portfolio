const canvas = document.getElementById('canvas')
// getContext - identifies type if drawwing 2d- is  value 2-dimensional
// Now we have the 2D rendering context for a canvas and we can draw within it.
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: undefined,
  y: undefined
}

// specifying raduius
// const minRadius = 5
const maxRadius = 40

// specifying colors
const colorArray = [
  '#2C3E50',
    '#E74C3C',
      '#A6A6A6',
        '#3498DB',
          '#2980B9'
]

// creating event listener on mouse move
window.addEventListener('mousemove',
function(event) {
  // will console.log on each move
  // console.log('blah')
  // this will give awesome object
  // console.log(event)
  mouse.x = event.x
  mouse.y = event.y
})

// creating event listener on changes of screen
window.addEventListener('resize',
function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // to generate new circles each time screen resized
  init()
})
// constructor function
const Circle = function(x, y, dx, dy, radius) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.minRadius = radius
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

  this.draw = function() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  this.update = function() {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy
      }
      this.x += this.dx
      this.y += this.dy

      // interactivity
      if (mouse.x - this.x < 50 && mouse.x - this.x > -50
      && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        if (this.radius < maxRadius) {
          this.radius += 1
        }
      } else if (this.radius > this.minRadius){
        this.radius -= 1
      }

      this.draw()
  }
}

// Array that stores all circles
let circleArray = []
// this function generates new circles with every change of screen size
function init() {
  circleArray = []
  // for loop to create 100 circles
  for (var i = 0; i < 800; i++) {
    // first have radius lower, but move it up so it would not have half circles
    const radius = Math.random() * 3 + 1
    let x = Math.random() * (innerWidth - radius * 2) + radius
    let dx = (Math.random() - 0.5) * 3
    let y = Math.random() * (innerHeight - radius * 2) + radius
    let dy = (Math.random() - 0.5) * 3
    circleArray.push(new Circle(x, y, dx, dy, radius))
  }
}

function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight)

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update()
  }
}
init()
animate()
