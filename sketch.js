// 游戏画布的宽度和高度
var canvasWidth = 1200;
var canvasHeight = 600;

// 每个方块的大小
var blockSize = 20;

// 蛇的初始长度
var initialLength = 3;

//蛇移动的速度
var speed=5;

// 蛇的初始位置
var snakeX = canvasWidth / 2;
var snakeY = canvasHeight / 2;

// 蛇每次移动的距离
var snakeSpeed =speed;

// 蛇的方向
var snakeDirection = 'down';

function mouseClicked() {
  const directions = ["right", "left", "up", "down"];
  const randomIndex = Math.floor(Math.random() * directions.length);
  console.log(directions[randomIndex]);
  snakeDirection =directions[randomIndex] ;
  
}


// 食物的位置
var foodX, foodY;

// 蛇的身体
var snakeBody = [];

// 得分
var score = 0;

// 初始化函数
function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // 设置蛇的初始身体
  for (var i = 0; i < initialLength; i++) {
    snakeBody.push({
      x: snakeX - i * blockSize,
      y: snakeY
    });
  }
  
  // 生成第一个食物
  generateFood();
}

// 绘制函数
function draw() {
  // 绘制背景
  background(100);

  // 移动蛇的身体
  for (var i = snakeBody.length - 1; i >= 1; i--) {
    snakeBody[i].x = snakeBody[i-1].x;
    snakeBody[i].y = snakeBody[i-1].y;
  }
  // 移动蛇头
  switch (snakeDirection) {
    case "right":
      snakeX += snakeSpeed;
      break;
    case "left":
      snakeX -= snakeSpeed;
      break;
    case "up":
      snakeY -= snakeSpeed;
      break;
    case "down":
      snakeY += snakeSpeed;
      break;
  }
   if (snakeX < 0) {
    snakeX = canvasWidth - blockSize;
  } else if (snakeX >= canvasWidth) {
    snakeX = 0;
  } else if (snakeY < 0) {
    snakeY = canvasHeight - blockSize;
  } else if (snakeY >= canvasHeight) {
    snakeY = 0;
  }
  

  // 更新蛇头位置
  snakeBody[0].x = snakeX;
  snakeBody[0].y = snakeY;

  // 绘制食物
  fill(255, 0, 0);
  rect(foodX, foodY, blockSize, blockSize);

  // 绘制蛇的身体
  fill(0);
  for (var k = 0; k < snakeBody.length; k++) {
    rect(snakeBody[k].x, snakeBody[k].y, blockSize, blockSize);
  }

  // 检查蛇头是否碰到了食物
  if (snakeX === foodX && snakeY === foodY) {
    // 更新蛇的身体，加入一个新的格子
    var newHead = {
      x: snakeX,
      y: snakeY
    };
    snakeBody.unshift(newHead);

    // 生成新的食物
    generateFood();

    // 更新分数
    score++;

    // 每吃到2个食物，增加蛇的长度
    if (score % 2 === 0) {
      var tail = snakeBody[snakeBody.length - 1];
      snakeBody.push({
        x: tail.x,
        y: tail.y
      });
    }
  }
}

// 生成随机的食物位置
function generateFood() {
  var cols = floor(canvasWidth / blockSize);
  var rows = floor(canvasHeight / blockSize);
  foodX = floor(random(cols)) * blockSize;
  foodY = floor(random(rows)) * blockSize;
}