var score
var obstaclesanimation,obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var cloudanimation,cloudsGroup
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudanimation=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  
  
}

function setup() {
  createCanvas(600, 200);
  
  cloudsGroup=new Group()
  obstaclesGroup=new Group()
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  score=0
}

function draw() {
  
  background(220);
  
  score=score+Math.round(getFrameRate()/60);
  text("score:"+score,500,50);
  
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  
  spawnclouds();
  spawnobstacles();
  drawSprites();
  
}

function spawnclouds(){
  if (frameCount%60 === 0){
    var cloud=createSprite(600,320,40,10);
    
    cloud.addImage(cloudanimation);
    cloud.scale=0.5;
    cloud.velocityX=-3
    cloud.y=Math.round(random(80,120));
    cloud.lifetime=600;
    cloudsGroup.add(cloud);
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    }
}

function spawnobstacles(){
  if(frameCount%60 === 0){
    var obstacles=createSprite(600,165,10,40);
    obstacles.velocityX=-3;
    var Rand=Math.round(random(1,6));
    switch(Rand){
      case 1:obstacles.addImage(obstacle1);
              break;
      case 2:obstacles.addImage(obstacle2);
              break;
      case 3:obstacles.addImage(obstacle3);
              break;
      case 4:obstacles.addImage(obstacle4);
              break;
      case 5:obstacles.addImage(obstacle5);
              break;
      case 6:obstacles.addImage(obstacle6);
              break;
      default:break;                 
    }
    obstacles.scale=0.5;
    obstacles.lifetime=600;
    obstaclesGroup.add(obstacles);
  }
}
