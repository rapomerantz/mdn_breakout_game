console.log('js');

    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d'); 


//DEFINE BALL & BALL MOVEMENT
    let x = canvas.width/2;
    let y = canvas.height-30;
    let dx = 5;
    let dy = -5;
    let ballRadius = 25;
    let ballFillColor = "#0095DD"
//DEFINE PADDLE
    let paddleHeight = 10;
    let paddleWidth = 150;
    let paddleX = (canvas.width-paddleWidth)/2;
//PADDLE MOVEMENT
    let rightPressed = false;
    let leftPressed = false;

//BRICKS
    let brickRowCount = 3;
    let brickColumnCount = 12;
    let brickWidth = 75;
    let brickHeight = 40;
    let brickPaddingTop = 10;
    let brickPaddingLeft = 1;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 28;

    let bricks = [];
    for(let c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(let r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    let score = 0; 
    let lives = 3; 



    
    document.addEventListener('keydown', keyDownHandler, false); 
    document.addEventListener('keyup', keyUpHandler, false);

    function allowMouseControl() {
        document.addEventListener("mousemove", mouseMoveHandler, false);
    }
    

    
    function changeBallColor () {
        return '#'+Math.floor(Math.random()*16777215).toString(16); 
    }

    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        } else if(e.keyCode == 37) {
            leftPressed = true;
        } 
        // else if (e.keyCode == 81) {
        //     dx += Math.abs(dx) + 1;             
        // } else if (e.keyCode == 65) {
        //     dx -= Math.abs(dx) - 1; 
        // }
    }  
    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
    }

    function collisionDetection() {
        for(let c=0; c<brickColumnCount; c++) {
          for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status == 1) {
              if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
                b.status = 0;
                score ++; 
                if (score === brickColumnCount * brickRowCount) {
                    alert("YOU WON! Reload the page baby! ")
                }
              }
            }
          }
        }
      }
    function drawScore() {
        ctx.font = '16px Arial'; 
        ctx.fillStyle = '#0095DD'; 
        ctx.fillText("Score: "+score, 8, 20); 
    }
    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    }
    function mouseMoveHandler(e) {
        // console.log(e);
        var relativeX = e.clientX - canvas.offsetLeft;        
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }
    
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = ballFillColor;
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks() {
        for(let c=0; c<brickColumnCount; c++) {
            for(let r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status === 1){
                    let brickX = (c*(brickWidth+brickPaddingLeft))+brickOffsetLeft;
                    let brickY = (r*(brickHeight+brickPaddingTop))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }


    
    function draw() {        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks(); 
        drawBall();
        drawPaddle();
        collisionDetection();
        drawScore(); 
        drawLives(); 
        ballFillColor = changeBallColor(); 
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
          }
          if(y + dy < ballRadius) {
            dy = -dy;
          }
          else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
              dy = -dy;
            }
            else {
                lives--;
                if(!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                }
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 5;
                    dy = -5;
                    paddleX = (canvas.width-paddleWidth)/2;
                    
                }
            }
          }
        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        x += dx;
        y += dy;
        // console.log(x, y, dx, dy);  
    }

//RUN DRAW ONCE UPON LOAD
    draw(); 

    function pauseGame() {
        clearInterval(interval); 
    }

    function startGame() {
        if (!interval){
            interval = setInterval(draw, 10); 
        }
        else if (interval >= 1){
            clearInterval(interval)
            interval = setInterval(draw, 10)
        }
    }

    let interval; 