const size = 30;
let snake;
let food;
let poisons = [];
let score = 0;

function setup() {
  createCanvas(600, 600);
  snake = new Snake();
  food = new Food();
}

function draw() {
  frameRate(8);
  background(220);

  if (snake.eat(food)) {
    snake.addToTail(food);
    food = new Food();
  }

  snake.update();
  snake.show();

  food.show();

  poisons.forEach((p) => {
    p.show();
    if (snake.eat(p)) {
      snake.tail = [];
      poisons = [];
    }
  });

  if (poisons.length < score) {
    poisons.push(new Poison());
  }
  score = snake.tail.length;
  textSize(32);
  text(`Score: ${score}`, width - 130, 30);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    console.log("left");
    snake.move(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.move(1, 0);
  } else if (keyCode === UP_ARROW) {
    snake.move(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.move(0, 1);
  }
}

class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.tail = [];
  }

  addToTail(food) {
    const piece = {
      x: food.x - this.dx,
      y: food.y - this.dy,
    };
    this.tail.unshift(piece);
  }

  update() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i].x = this.tail[i + 1].x;
      this.tail[i].y = this.tail[i + 1].y;
    }
    if (this.tail.length > 0) {
      this.tail[this.tail.length - 1].x = this.x;
      this.tail[this.tail.length - 1].y = this.y;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (this.x > width - size) {
      this.x = width - size;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y > height - size) {
      this.y = height - size;
    }
    if (this.y < 0) {
      this.y = 0;
    }
  }

  show() {
    noStroke();
    fill(111);
    rect(this.x, this.y, size, size);
    // Show the tail below
    this.tail.forEach((piece) => {
      fill("rgba(0,0,0,0.25)");
      rect(piece.x, piece.y, size, size);
    });
  }

  move(x, y) {
    this.dx = x * size;
    this.dy = y * size;
  }
  eat(food) {
    const d = dist(this.x, this.y, food.x, food.y);

    if (d < 1) {
      return true;
    }
  }
}
class Food {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.placeFood();
  }

  placeFood() {
    const col = Math.floor((Math.random() * width) / size);
    const row = Math.floor((Math.random() * height) / size);
    this.x = col * size;
    this.y = row * size;

    let overlap = false;

    for (let i = 0; i < poisons.length; i++) {
      const p = poisons[i];
      if (this.x === p.x && this.y === p.y) {
        overlap = true;
        break;
      }
    }

    if (overlap) {
      this.placeFood();
    }
  }
  show() {
    fill(0, 0, 255);
    ellipseMode(CORNER);
    // rect(this.x, this.y, size, size);
    text("🍏", this.x - 3, this.y + size - 2);
  }
}
class Poison {
  constructor() {
    this.x = Math.floor((Math.random() * width) / size) * size;
    this.y = Math.floor((Math.random() * height) / size) * size;

    setTimeout(() => {
      let idx = poisons.findIndex((p) => p === this);
      poisons.splice(idx, 1);
    }, 10000);
  }
  show() {
    text("🌶", this.x - 3, this.y + size - 2);
  }
}
