var PLAY = 1;
var END = 0;
var gameState = PLAY ;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var bg,bgImage;
var ground,invisibleGround;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  bgImg = loadImage("jungle.jpg");
}



function setup() {
  bg = createSprite(300,300)
  bg.addImage(bgImg);
  bg.scale = 0.8
  
  monkey = createSprite(30,200,40,40);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
 
  
  ground = createSprite(0,260,2500,10);
  ground.velocityX = -4;
 // ground.visible = false; 
  ground.x = ground.width/2;
  console.log(ground.x)
  
  
  invisibleGround = createSprite(0,230,2500,10);
  invisibleGround.visible = false;
  
  FoodGroup = createGroup ();
  obstacleGroup = createGroup();
  }

  function draw() {
  createCanvas(600,300);
  drawSprites();
  
 
  if (gameState === PLAY ) {
     //setting gravity//
     monkey.velocityY = monkey.velocityY + 0.8
    
     //moving the ground//
   if (ground.x < 0){
       ground.x = ground.width/2;
       }
    
     //setting keybind//
    if (keyDown("space")){
        monkey.velocityY = -12;
        }
    
    if (FoodGroup.isTouching(monkey)){
        FoodGroup.destroyEach();  
        }
    
    if(obstacleGroup.isTouching(monkey)){
       monkey.destroy();
       gameState=END;
       }
    
    //setting collider//
    monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
    monkey.debug = false;
    monkey.collide(invisibleGround);
    
    Food();
    obstacles();
    
    //text//
    stroke("black");
    textSize(20);
    fill("yellow");
    survivalTime=Math.ceil(frameCount/frameRate());
    text("SurvivalTime: "+ survivalTime,450,50 );

    }
    
    if (gameState === END){
        bg.visible = false;
        ground.visible = false;
        FoodGroup.visible = false;
        fill("orange");
        textSize(25);
        text("GAME OVER",150,300);
        }
  }
  
    //food//
    function Food(){
    if(frameCount%80===0) {
      bananna = createSprite(600,300,20,20);
      bananna.y = Math.round(random(120,200));
      bananna.addAnimation("moving",bananaImage);
      bananna.scale = 0.05;
      bananna.velocityX=-4;
      bananna.setLifetime=100;
      FoodGroup.add(bananna);
      }
    }
  //obstacle//
    function obstacles() {
    if(frameCount%300===0){
       stone = createSprite(600,230,20,20);
       stone.addAnimation("moving",obstaceImage);
       stone.scale = 0.2;
       stone.velocityX=-8;
       stone.setLifetime=100;
       stone.setCollider("rectangle",0,0,stone.width,stone.height);
       stone.debug = false;
       stone.collide(monkey);
       obstacleGroup.add(stone);
       }      
    }
 
  






