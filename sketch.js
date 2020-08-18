var bananaImage,obstacleImage,backgroundImage,invisibleground;
var obstaclesGroup,fruitsGroup,score,back,monkeyWalking,monkey;

var gameState,PLAY,END,score2;


function preload(){
 backgroundImage=loadImage("jungle.png");
  monkeyWalking=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImage =loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  back=createSprite(200,200);
  back.addAnimation("image",backgroundImage);
  back.scale=2;
  back.velocityX=-4;
  
  monkey = createSprite(50,180,20,50)
  monkey.addAnimation("running", monkeyWalking);
  monkey.scale = 0.09;
  
  score=0;
  score2=0;
  
  PLAY=1;
  END=0;
  gameState=PLAY;
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
 
  obstaclesGroup=new Group();
  fruitsGroup=new Group();
}

function draw() {
  background(111);
  if(gameState===PLAY){
  if (back.x<0){
   back.x=back.width/2;
  } 
  
  if(keyDown("space")) {
    monkey.velocityY = -10;
  }
  
    monkey.velocityY = monkey.velocityY + 0.8

 
 
  if(monkey.isTouching(obstaclesGroup)) {
  obstaclesGroup.destroyEach();
  monkey.scale=0.08;
  score2=score2+1;
  }
  
  if(fruitsGroup.isTouching(monkey)){
  score=score+2;
    fruitsGroup.destroyEach();
  }
  
  if(score2===2){
  
  gameState=END;
  }
  
  monkey.collide(invisibleGround);
  spawnfruits();
  spawnObstacles();
  }else{
  if (gameState===END){
  back.velocityX=0;
  monkey.velocityY=0;

  }
  
  
  }

  drawSprites();

stroke("white");
textSize(25);
fill("white");
text("score:"+ score,200,200);
  
  stroke("white");
textSize(25);
fill("white");
text("score:"+ score2,200,250);
  
  switch(score){
    case 10: monkey.scale=0.12;
             break;      
  case  20: monkey.scale=0.14;
             break;
  case  30: monkey.scale=0.16;
             break;
  case  40: monkey.scale=0.18;
             break;
             default:break;
 
}

}
  
 

function spawnfruits() { 
  
if(frameCount%80===0){
     var banana= createSprite(400,200,20,20);
  
    banana.scale=0.05;
    
    banana.addAnimation("banana",bananaImage);
    
    banana.y=random(300,350);
    
    banana.velocityX=-6;
    
    banana.Lifetime=66;
    
    fruitsGroup.add(banana);
  
}

  
  
}

function spawnObstacles() {
  if (frameCount%100===0){
    var stone=createSprite(400,370);
    stone.scale=0.1;
    stone.addAnimation("stone",obstacleImage);
   
    
    stone.velocityX=-6;
    
    stone.lifetime=70;
    
    obstaclesGroup.add(stone);
  }
}