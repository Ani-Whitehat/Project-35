var balloon
var blnImg;
var Bgimg;
var database;


function preload(){
Bgimg = loadImage("images/1.png");
blnImg = loadAnimation("images/2.png","images/3.png","images/4.png");
}


function setup() {
  createCanvas(1300,700);
  database = firebase.database();
  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("Balloon Image",blnImg);
  balloon.scale = 0.8;
  
}

function draw() {
  background(Bgimg);
  
  var balloonPosition = database.ref('Balloon/height');
  balloonPosition.on("value",  showError); 

  if (keyDown(UP_ARROW)) {
   updateHeight(0,-10);
   balloon.scale-=0.01;
  }
  if (keyDown(DOWN_ARROW)) {
    updateHeight(0,10);
    balloon.scale+=0.01;
  }
  if (keyDown(LEFT_ARROW)) {
    balloon.x-=10;
  }
  if (keyDown(RIGHT_ARROW)) {
    balloon.x+=10;
  }

  drawSprites();
}
function updateHeight(x,y) {
  database.ref("Balloon/height").set({
    "x": x+=5,
    "y": y+=5
  });
}

function readHeight(data) {
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}
function showError() {
  console.log("ERROR in writing Database");
}