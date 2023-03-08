let canvas = document.getElementById("playfield");
let context = canvas.getContext("2d");
context.lineWidth = 1;
context.strokeStyle = "black";

const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resumeButton = document.getElementById("resume");
const gameover = document.getElementById("gameover");
const size = 20;
var foodx, foody;
var x = 20, y = 0;
const playboardHeight = 600;
const playboardWidth = 600;
const playerboardColor = "rgb(240,230,140)";
const snakeColor = "green";
const foodColor = "red";
var score = 0;
var gamestatus = false;

var snake = [
    {x:3*size, y:0},
    {x:2*size, y:0},
    {x:size, y:0},
    {x:0, y:0}
]


var r;

startButton.onclick = () => {
    if(gamestatus === false){
        gamestatus = true;
        createFood();
        rgv();
    }
}
pauseButton.onclick = () => {
    clearInterval(r);
    gamestatus = false;
}
resumeButton.onclick = () => {
    if(gamestatus === false && snake[snake.length-1].x!=0){
        gamestatus = true;
        rgv();
    }
}

function rgv(){
    gameover.style.display = "none";
    scoreDisplay.innerHTML = score;
    r = setInterval(() => {
        clearBoard();
        drawFood();
        drawSnake();
        snakeMove();
        checkGameover();
    }, 100);

    function checkGameover(){
        const h = snake[0].x;
        const v = snake[0].y;
        if(h<0 || h>playboardWidth-size || v<0 || v>playboardHeight-size){
            gameover.style.display = "block";
            reset();
        }
        snake.forEach((s, index) => {
            if(index !==0 && h===s.x && v===s.y){
                reset();
            }
        })
    }
}

function clearBoard(){
    context.fillStyle = playerboardColor; 
    context.fillRect(0,0,playboardWidth,playboardHeight);
}

function drawSnake(){
    context.fillStyle = snakeColor;
    snake.forEach(s => {    
        context.fillRect(s.x,s.y,size,size)
        context.strokeRect(s.x,s.y,size,size)
    })
}

function snakeMove(){
    snake.unshift({x: snake[0].x+x, y: snake[0].y+y})
    
    if(snake[0].x === foodx && snake[0].y === foody){
        score++;
        scoreDisplay.innerHTML = score; 
        createFood();
        return;
    }
    snake.pop();
}

function drawFood(){
    context.fillStyle = foodColor ; 
    context.fillRect(foodx,foody,size,size);
}
function createFood(){
    foodx = (Math.floor(Math.random()*30))*20;
    foody = (Math.floor(Math.random()*30))*20;
}

window.addEventListener("keydown", rgv => { 
    switch(rgv.key) {
        case "ArrowDown" :
            if(y !== -size){
                x = 0;
                y = size;
            }
            break      
        case "ArrowUp" :
            if(y !== size){
                x = 0;
                y = -size;
            }
            break 
        case "ArrowRight" :
            if(x !== -size){
                x = size;
                y = 0;
            }
            break 
        case "ArrowLeft" :
            if(x !== size){
                x = -size;
                y = 0;
            }
            break 
    }
})

function reset(){
    gamestatus = false;
    clearInterval(r);
    snake = [
        {x:3*size, y:0},
        {x:2*size, y:0},
        {x:size, y:0},
        {x:0, y:0}
    ];
    x = 20, y = 0;
    score = 0;
}
