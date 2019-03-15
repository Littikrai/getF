var myGamePiece;
var myObstacles;
var nisit;
var precentOfHeight = window.innerHeight;
var precentOfWidth = window.innerWidth;
function startGame() {
    nisit = new component(precentOfWidth*0.08, precentOfWidth*0.08, "red", 50, (precentOfHeight-(precentOfWidth*0.08)))
    myGamePiece = new component((precentOfWidth*0.05), (precentOfWidth*0.05), "img/brush.png", 80, 0, "image");
    myObstacles = new component(10, 200, "green", 120, 0);
    myGameArea.start();
}
window.addEventListener( "keydown", doKeyDown, false);
window.addEventListener( "keyup", doKeyDown, false);

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

function toptop(obj){
    if(obj.y >= window.innerHeight ){
        obj.y -= 100;
        
        
    }
}

function updateGameArea() {
    var x = 0;
    var i = 0;
    myGameArea.clear();
    myObstacles.newPos();
    myObstacles.update();
    x += 1;
    if(x == 1){
        x -= 1;
        toptop(myObstacles);
        myObstacles.newPos();
        myObstacles.update();
    console.log(x)
    }
    // else{
    //     myGameArea.clear();
    //     myObstacles.newPos();
    //     myObstacles.update();
    //     x += 1
    // }

    
    
    // for (i = 0; i <20; i++) {
    //         // myObstacles[i].x += 5;
    //         myObstacles.newPos();    
    //         myObstacles.update();
    //  }  
    // var x, y;
    // for (i = 0; i < myObstacles.length; i += 1) {
    //     if (nisit.crashWith(myObstacles[i])) {
    //         myGameArea.stop();
    //         return;
    //     } 
    // }
    // myGameArea.clear();
    // myGameArea.frameNo += 1;
    // if (myGameArea.frameNo == 1 || everyinterval(150)) {
    //     x = myGameArea.canvas.width;
    //     y = myGameArea.canvas.height - 200;
    //     myObstacles.push(new component(10, 200, "green", x, y));
    //     // myObstacles.push(new component((precentOfWidth*0.05), (precentOfWidth*0.05), "img/brush.png", 80, 0, "image"));
    // }
    // for (i = 0; i < myObstacles.length; i += 1) {
    //     myObstacles[i].x += -1;
    //     myObstacles.newPos();    
    //     myObstacles[i].update();
    // }   
    // nisit.update();
    // nisit.x += nisit.speedX;
    // nisit.y += nisit.speedY;
}
// function updateGameArea() {
//     if (myGamePiece.crashWith(myObstacle)) {
//         myGameArea.stop();
//     } else {
//         myGameArea.clear();
//         nisit.update();
//         nisit.x += nisit.speedX;
//         nisit.y += nisit.speedY;
//         myObstacle.update();
//         myGamePiece.newPos();        
//         myGamePiece.update();

//     }
// }
function doKeyDown(e) {
    if(e.type=='keydown'){
        if(e.keyCode==37){
            
            nisit.speedX = -5;
            return false;
        }
        else if(e.keyCode==39){
            
            nisit.speedX = 5; 
            return false;            
        }
    }else if(e.type=='keyup'){
        clearmove()
        return false;
    }
    return true;
}

function clearmove() {
    nisit.speedX = 0; 
    nisit.speedY = 0; 
}

// document.body.onkeydown = function(e){
//     alert(String.fromCharCode(e.keyCode)+" --> "+e.keyCode);
// };
