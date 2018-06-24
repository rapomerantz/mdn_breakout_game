console.log('js');

    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d'); 



    let x = canvas.width/2;
    let y = canvas.height-30;
    let dx = 5;
    let dy = -5;

    let ballRadius = 25;

    let ballFillColor = "#0095DD"

    
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = ballFillColor;
        ctx.fill();
        ctx.closePath();
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();

        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
            ballFillColor = changeBallColor(); 
        }
        if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
            dy = -dy;
            ballFillColor = changeBallColor(); 

        }

        x += dx;
        y += dy;
    }

    function changeBallColor () {
        return '#'+Math.floor(Math.random()*16777215).toString(16); 
    }

    setInterval(draw, 10); 