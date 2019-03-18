var obj;
var obj2;
var obj3;
var obj4;
var obj5;
var objf;
var nisit;
var x = 0;
var i = 0;
var hp;
var hp2;
var hp3;
var power = 3;
var precentOfHeight = window.innerHeight;
var precentOfWidth = window.innerWidth;
const randomx = Math.floor(Math.random()*precentOfWidth);
const randomy = Math.floor(Math.random()*precentOfHeight);
var myScore;
var points = 0;

console.log(document.getElementById('myModal'))

function startGame() {    
    nisit = new component(precentOfWidth*0.15, precentOfWidth*0.15, "img/nisit.gif", 0, (precentOfHeight-(precentOfWidth*0.15)),"image")
    hp = new component((precentOfWidth*0.03), (precentOfWidth*0.03), "img/heart.png", 1, 0, "image");
    hp2 = new component((precentOfWidth*0.03), (precentOfWidth*0.03), "img/heart.png", (precentOfWidth*0.03)+5, 0, "image");
    hp3 = new component((precentOfWidth*0.03), (precentOfWidth*0.03), "img/heart.png", ((precentOfWidth*0.03)*2)+10, 0, "image");
    obj = new component(precentOfWidth*0.07, precentOfWidth*0.07, "img/coin.gif", Math.floor(Math.random()*precentOfWidth), -Math.floor(Math.random()*precentOfHeight), "image-x");
    obj2 = new component(precentOfWidth*0.06, precentOfWidth*0.08, "img/watch.gif", Math.floor(Math.random()*precentOfWidth), -Math.floor(Math.random()*precentOfHeight), "image-x");
    obj3 = new component(precentOfWidth*0.3, precentOfWidth*0.3, "img/table.gif", Math.floor(Math.random()*precentOfWidth), -Math.floor(Math.random()*precentOfHeight), "image-x");
    obj4 = new component(precentOfWidth*0.1, precentOfWidth*0.1, "img/com.gif", Math.floor(Math.random()*precentOfWidth), -Math.floor(Math.random()*precentOfHeight), "image-x");
    obj5 = new component(precentOfWidth*0.08, precentOfWidth*0.1, "img/Bottle.gif", Math.floor(Math.random()*precentOfWidth), -Math.floor(Math.random()*precentOfHeight), "image-x");
    objf = new component(precentOfWidth*0.1, precentOfWidth*0.15, "img/ff.gif", Math.floor(Math.random()*precentOfWidth), -Math.floor(Math.random()*precentOfHeight), "image-x");
    myScore = new component("30px", "Consolas", "black", 280, 40, "text")
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
        this.interval = setInterval(updateGameArea, 33);
            
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
    if (type == "image-x") {         
        this.image = new Image();
        this.image.src = color;
    }
    this.angle = 0;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.speedX = 0;
    this.speedY = 0;    
    this.gravity = 4;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
              this.x, 
              this.y,
              this.width, this.height);
          }else if(type == "text"){
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
          }else if(type == "image-x"){              
            ctx.save();
            ctx.translate(this.x, this.y); 
            ctx.rotate(this.angle);
            ctx.drawImage(this.image, 
                this.width / -2, 
                this.height / -2,
                this.width, this.height)
            ctx.restore(); 
          }else {
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
        this.gravitySpeed = this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }  
      
}

function toptop(obj){
    if(obj.y >= window.innerHeight ){
        obj.x = Math.floor(Math.random()*precentOfWidth);
        obj.y = -Math.floor(Math.random()*(precentOfHeight*4));
        obj.gravitySpeed += 1;
    }
}
function hit_f(obj){
    obj.x = Math.floor(Math.random()*precentOfWidth);
    obj.y = -Math.floor(Math.random()*(precentOfHeight*2));
    points += 100;
}
function hit(obj){
    obj.x = Math.floor(Math.random()*precentOfWidth);
    obj.y = -Math.floor(Math.random()*(precentOfHeight*2));
}

function updateGameArea() {
    myGameArea.clear();
    obj.angle += 3 * Math.PI / 180;
    obj2.angle += 3 * Math.PI / 180;
    obj3.angle += 3 * Math.PI / 180;
    obj4.angle += 3 * Math.PI / 180;
    obj5.angle += 3 * Math.PI / 180;
    objf.angle += 3 * Math.PI / 180;
    myScore.text = "SCORE: " + points
    myScore.update();
    obj.newPos();
    obj.update();
    obj2.newPos();
    obj2.update();
    obj3.newPos();
    obj3.update();
    obj4.newPos();
    obj4.update();
    obj5.newPos();
    obj5.update();
    objf.newPos();
    objf.update();
    x += 1;
    i += 1;
    if(i==500){
        obj.gravity += 1;
        obj2.gravity += 1;
        obj3.gravity += 1;
        obj4.gravity += 1;
        obj5.gravity += 1;
        objf.gravity += 1;
        i = 0
    }
    toptop(obj);
    obj.newPos();
    obj.update();
    toptop(obj2);
    obj2.newPos();
    obj2.update();
    toptop(obj3);
    obj3.newPos();
    obj3.update();
    toptop(obj4);
    obj4.newPos();
    obj4.update();
    toptop(obj5);
    obj5.newPos();
    obj5.update();
    toptop(objf);
    objf.newPos();
    objf.update();
    x = 0;    
    if(power == 3){
        hp.update();
        hp2.update();
        hp3.update();
    }else if(power == 2){
        hp.update();
        hp2.update();
    }else if(power == 1){
        hp.update();
    }else{
        nisit.image.src = "";
        myGameArea.stop();
        myGameArea.clear();
        modal.style.display = "block";
        document.getElementById("point").innerHTML = "SCORE: "+points;
        span.onclick = function() {
            modal.style.display = "none";
            myGameArea.clear();
            power = 3;
            soc = 3;
            startGame();
        }
        // document.getElementsByTagName("BODY").addEventListener("load", modal);
        // document.getElementById("modal-content").addEventListener("load", modal);
        // alert(document.write('<img src="img/pixil-frame-1.gif"/>'));
        // document.write('<img src="img/pixil-frame-1.gif"/>')
    }
    ///show hp
    if (nisit.crashWith(obj)){       
        hit(obj);
        obj.newPos();
        obj.update();
        power -= 1 
    }else if(nisit.crashWith(obj2)){
        hit(obj2);
        obj2.newPos();
        obj2.update();
        power -= 1 
    }else if(nisit.crashWith(obj3)){
        hit(obj3);
        obj3.newPos();
        obj3.update();
        power -= 1 
    }else if(nisit.crashWith(obj4)){
        hit(obj4);
        obj4.newPos();
        obj4.update();
        power -= 1 
    }else if(nisit.crashWith(obj5)){
        hit(obj5);
        obj5.newPos();
        obj5.update();
        power -= 1 
    }else if(nisit.crashWith(objf)){
        hit_f(objf);
        objf.newPos();
        objf.update();
    }else{
        nisit.x += nisit.speedX;
        nisit.y += nisit.speedY;
        nisit.update();
    }
    
}
function doKeyDown(e) {
    if(e.type=='keydown'){
        if(e.keyCode==37){
            nisit.image.src = "img/nisit-left.png"            
            nisit.speedX = -8;
            return false;
        }
        else if(e.keyCode==39){
            nisit.image.src = "img/nisti-right.png"
            nisit.speedX = 8; 
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
