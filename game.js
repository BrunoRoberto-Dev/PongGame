var canvas = document.getElementById('mycanvas');
var context = canvas.getContext('2d');

const openInstructions = () => {
    document.getElementById('instructionShow').classList.add('active')
    disableButton()
}
const closeInstructions = () => {
    document.getElementById('instructionShow').classList.remove('active')
    enableButton()
}
const disableButton = () => {
    const buttonInstruction = document.getElementById('instructions').classList.add('disable')
}
const enableButton = () => {
    const buttonInstruction = document.getElementById('instructions').classList.remove('disable')
}

var keys = {};
var ball = {
    x: canvas.width / 2 - 15,
    y: canvas.height / 2 -15,
    height: 30,
    widht: 30,
    dirx: -1,
    diry: 1,
    mod: 0,
    speed: 1
};

var left = {
    x: 10,
    y: canvas.height / 2 - 60,
    height: 120,
    widht: 30,
    score: 0,
    speed: 15
};

var right = {
    x: 560,
    y: canvas.height / 2 - 60,
    height: 120,
    widht: 30,
    score: 0,
    speed: 15
}; 

document.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
}, false);

document.addEventListener("keyup", function(e) {
    delete keys[e.keyCode];
}, false);

function moveblock() {
    if (87 in keys && left.y > 0) 
        left.y -= left.speed;
    
    else if (83 in keys && left.y + left.height < canvas.height) 
        left.y += left.speed;
     
    if (38 in keys && right.y > 0) 
        right.y -= right.speed;
    
    else if (40 in keys && right.y + right.height < canvas.height) 
        right.y += right.speed;
    
};

function moveball() {
    if (ball.y + ball.height >= left.y && ball.y <= left.y + left.height && ball.x <= left.x + left.widht) {
        ball.dirx = 1;
        ball.mod += 0.2;
    } else if (ball.y + ball.height >= right.y && ball.y <= right.y + right.height && ball.x + ball.widht >= right.x) {
        ball.dirx = -1;
        ball.mod += 0.2;
    };

    if (ball.y <= 0) {
        ball.diry = 1;
    } else if (ball.y + ball.height >= canvas.height) {
        ball.diry = -1;
    };

    ball.x += (ball.speed + ball.mod) * ball.dirx;
    ball.y += (ball.speed + ball.mod) * ball.diry;

    if(ball.x < left.x + left.widht - 15) {
        newgame('player 2');
    } else if (ball.x + ball.widht > right.x + 15) {
        newgame('player 1')
    }
};

function newgame(winner) {
    if (winner == 'player 1') {
        left.score++;
    } else {
        right.score++;
    }

    left.y = canvas.height /2 - left.height /2;
    right.y = left.y;
    ball.y = canvas.height /2 - ball.height /2;
    ball.x = canvas.width /2 - ball.widht /2;
    ball.mod = 0
};

function draw() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    moveblock();
    moveball();

    context.fillStyle = 'white';
    context.fillRect(left.x, left.y, left.widht, left.height);
    context.fillRect(right.x, right.y, right.widht, right.height);
    context.fillRect(ball.x, ball.y, ball.widht, ball.height);
    
    context.fillStyle = 'white';
    context.font ='20px Gill Sans';
    context.fillText('Score: ' + left.score + '  |  ' + right.score, 250, 20)
};

setInterval(draw, 10);

document.getElementById('instructions').addEventListener('click', openInstructions)
document.getElementById('closeInstructions').addEventListener('click', closeInstructions)
