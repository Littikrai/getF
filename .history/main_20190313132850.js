var myGamePiece;
var myObstacle;
var nisit;
var precentOfHeight = window.innerHeight;
var precentOfWidth = window.innerWidth;
function startGame() {
    nisit = new component(precentOfWidth*0.08, precentOfWidth*0.08, "red", 50, (precentOfHeight-(precentOfWidth*0.08)))
    myGamePiece = new component((precentOfWidth*0.05), (precentOfWidth*0.05), "img/brush.png", 80, 0, "image");
    myObstacle  = new component(10, 200, "green", 100, 120);
    myGameArea.start();
}
window.addEventListener( "keydown", doKeyDown, false);

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
    this.x = x;
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
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;                
    }  
      
}

function updateGameArea() {
    if (myGamePiece.crashWith(myObstacle)) {
        myGameArea.stop();
    } else {
        myGameArea.clear();
        nisit.update();
        myObstacle.update();
        myGamePiece.newPos();        
        myGamePiece.update();

    }
}
function doKeyDown(e) {
    console.log(e.keyCode)
    if(e.keyCode==37){        
        nisit.speedX = -1;
        
        console.log("adwd")
    }
    else if(e.keyCode==39){        
        nisit.speedX = 1; 
        clearmove()
    }
}
// function moveleft() {
     
// }

// function moveright() {
    
// }

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
// document.body.onkeydown = function(e){
//     alert(String.fromCharCode(e.keyCode)+" --> "+e.keyCode);
// };

function onKeyDown(evt) {
    if (evt.keyCode == 39)
    { rightDown = true;
        console.log("fslfji")
    }
    else if (evt.keyCode == 37) leftDown = true;
  }