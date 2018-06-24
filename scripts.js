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
    let paddleWidth = 75;
    let paddleX = (canvas.width-paddleWidth)/2;
//PADDLE MOVEMENT
    let rightPressed = false;
    let leftPressed = false;

    let counter = 0; 

    
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
    
    function draw() {        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle(); 

        //If ball its either side, dx is inverted
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
            ballFillColor = changeBallColor(); 
        }

        //If ball hits top dy is inverted
        if(y + dy < ballRadius) {
            dy = -dy;
        //else if ball hits paddle dy is inverted. 
        } else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
                counter ++; 
                console.log(counter);
                
            }
            //if ball doesn't hit paddle, game over
            else {
                alert("GAME OVER");
                // document.location.reload();
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
    }

    function changeBallColor () {
        return '#'+Math.floor(Math.random()*16777215).toString(16); 
    }

    document.addEventListener('keydown', keyDownHandler, false); 
    document.addEventListener('keyup', keyUpHandler, false);

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


    setInterval(draw, 10); 