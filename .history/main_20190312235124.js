var myGamePiece;
var myObstacle;
var heightGo;
var procentOfHeight = window.innerHeight * 0.1;
var procentOfWidth = window.innerWidth * 0.05;
function startGame() {
    myGamePiece = new component(procentOfWidth, procentOfWidth, "img/brush.png", 80, 0, "image");
    myObstacle  = new component(10, 200, "green", 100, 120);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height =  window.innerHeight;        
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);        
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = myObstacle;
    this.y = y;    
    this.speedX = 0;
    this.speedY = 0;    
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        this.crashWith = function(otherobj) {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var crash = true;
            if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                crash = false;
            }
            return crash;
        }
    }    
    

    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;        
    }    
}




function updateGameArea() {
    // if (myGamePiece.crashWith(myObstacle)) {
    //     myGameArea.stop();
    // } else {
    //     myGameArea.clear();
    //     
    //     myObstacle.update();
    //     myGamePiece.x += myGamePiece.speedX;
    //     myGamePiece.y += myGamePiece.speedY;    
    //     myGamePiece.update();
    // }
        myGameArea.clear();
        myGamePiece.newPos();
        myGamePiece.update();
        myObstacle.update();
}
console.log(myObstacle)