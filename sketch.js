var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var   trex_collided;
var ground;
var score;

function preload(){
  
  
  monkey_running =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
}



function setup() {
  monkey = createSprite(40, 350, 20, 20);
  monkey. addAnimation("running" , monkey_running);
  monkey. addAnimation("collide" , monkey_collided);
  monkey.scale = 0.10;
  
  ground = createSprite(200, 390, 400, 10)
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  
  score = 0;
  
}


function draw() {
background("180");
 
  
  if(gameState === PLAY){
  if(keyDown("space") && monkey.y > 250) {
        monkey.velocityY = -12;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
    
    if( FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score = score+5
    }

  if(obstaclesGroup.isTouching(monkey)){
    gameState = END;
  } 
    
  spawnobstacles();
  spawnBanana();
    
  }   
  
  else if (gameState === END) {
  ground.velocityX = 0;
  monkey.velocityY = 0;
  
  monkey.changeAnimation("collide", monkey_collided);
    
  obstaclesGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
     
  obstaclesGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);  

  }   
  
  monkey.collide(ground);
  
 drawSprites();
    text("Score: "+ score, 300,50);
}

function spawnobstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(400, 360, 10, 40);
   obstacle.velocityX = -6;
   obstacle. addImage(obstaceImage);
   obstacle.scale = 0.15;
   obstacle.lifetime = 70;
    obstaclesGroup.add(obstacle);
        obstacle.setCollider("circle", 0, 0);
     obstacle.debug = false;
 }
 }

function spawnBanana() {
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120, 180));
    banana.addImage( bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  
    FoodGroup.add(banana);
    
  }
}