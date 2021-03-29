//creating variables
var playerImg, carriageImg, bgImg, logImg,stoneImg;
var player, carriage, bgSprite;
var appleImg, bananaImg,orangeImg, strawberyyImg, resetImg, coinsImg;
var invisibleSpriteRight, invisibleSpriteLeft;
var PLAY = 1;
var END = 0
var obstacleGroup;
var fruitGroup;
var gameState=PLAY, coinsGroup;
var score = 0;
var nextLevel = false;

function preload()
{
  //loading images
playerImg=loadImage("Images/girl1.png");
carriageImg=loadImage("Images/carraigeImg.png");
logImg=loadImage("Images/log.png");
stoneImg=loadImage("Images/srone.png");
bg=loadImage("Images/bg edited 2.png");
orangeImg = loadImage("Images/orange.png");
appleImg = loadImage("Images/apple.png");
strawberryImg = loadImage("Images/strawberry.png");
bananaImg = loadImage("Images/banana.png");
resetImg = loadImage("Images/resetIcon.png");
coinsImg = loadImage("Images/coins.png")
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  //creating sprites
  bgSprite = createSprite(width/2, height/2, width, height);
  bgSprite.addImage("background", bg);
  coinsGroup = new Group();
  bgSprite.velocityY=5;
  bgSprite.scale = 4.3;

  carriage = createSprite(width/2,350,100,100);
  carriage.addImage("carriage", carriageImg);
  carriage.scale = 2;
	
  player = createSprite(width/2,475,100,100);
  player.addImage("player", playerImg);
  player.scale=0.8
  //creating groups
  fruitGroup = new Group();
  obstacleGroup = new Group();

  //setting collider
  carriage.setCollider("rectangle", 0, 80, 100, 150);
  player.setCollider("rectangle", 0, -100, 200,200)

  
  //creating the invisible sprite and reset icon
  invisibleSpriteRight = createSprite(bgSprite.x + 400, height/2, 1, height);
  invisibleSpriteRight.visible = false;
  invisibleSpriteLeft = createSprite(bgSprite.x - 400, height/2, 1, height);
  invisibleSpriteLeft.visible = false;

  reset=createSprite(100,100,width/2, height/2 );
  reset.addImage("reset",resetImg);
  reset.visible = false;


}

function draw() {
  background("white");

  if(gameState === PLAY) {
    if(bgSprite.y > height) {
      bgSprite.y = bgSprite.height/2;
    }
    if(score>=5 && nextLevel === false){
      var link = createA('http://p5js.org/', 'Click here to go the the next level!');
      link.position(width/2, height/2-100);
      link.width=200;
      link.height=100;
      link.style('font-size','50px');
      console.log(link)
      nextLevel= true;

      carriage.velocityY = 0;
      carriage.velocityX=0;
    
      player.velocityY = 0;
      player.velocityX = 0;

      bgSprite.velocityX = 0;
      bgSprite.velocityY = 0;
    
      obstacleGroup.setVelocityXEach = 0;
      obstacleGroup.setVelocityYEach = 0;

      fruitGroup.setVelocityXEach = 0;
      fruitGroup.setVelocityYEach = 0;
      reset.visible = true;
      restart();
    textSize(100);
    fill("black")
    text("You are a Champ! Click on the link to go to the next level. All the very best!", width/2-500, height/2-200);
    player.visible = false;
    carriage.visible = false;
    obstacleGroup.visible = false;
    fruitGroup.display = false;
    }
  //using arrows to move
    if(keyDown("LEFT_ARROW")){
      carriage.x=carriage.x-20;
      player.x=player.x-20;
    }
  
    if(keyDown("RIGHT_ARROW")){
      carriage.x=carriage.x+20;
      player.x=player.x+20;
    }
  //checking if the carriage touches
    if(obstacleGroup.isTouching(carriage)){
      gameState=END;   
    }

    if(coinsGroup.isTouching (carriage)){
      var rand = Math.round(random(5,10));
      score = score+rand;
      for(var i = 0; i < coinsGroup.length; i++){
        var coins = coinsGroup.get(i);
        if(coins.isTouching(carriage)){
          coins.destroy();
        }

      }

    }
    
    if(fruitGroup.isTouching(carriage)){
      score = score + 5;
      for(var i = 0; i < fruitGroup.length; i++){
        var fruit = fruitGroup.get(i);
        if(fruit.isTouching(carriage)){
          fruit.destroy();
        }
      }
    }
    spawnObstacles();
    spawnFruits();
    spawnCoins();
3
  } else if(gameState === END){

      carriage.velocityY = 0;
      carriage.velocityX=0;
    
      player.velocityY = 0;
      player.velocityX = 0;
    
      obstacleGroup.setVelocityXEach = 0;
      obstacleGroup.setVelocityYEach = 0;
      reset.visible = true;
      restart();
    textSize(100);
    fill("black")
    text("Sorry, Game over! Try again :)", width/2-500, height/2-200);
    player.visible = false;
    carriage.visible = false;
    obstacleGroup.visible = false;
    fruitGroup.display = false;
  }     

  
  drawSprites(); 
  textSize(35);
  fill("white")
  text("Your Score :"+score, 40,120);
  fill("white")
  text("Use the left and right arrow keys to move left and right accordingly!", 40, 80)
  text("Catch the fruits to earn points! Dodge all the obstacles to stay safe and reach the maze level!!", 40,40)
}

function spawnObstacles() {
  if(frameCount % 190 === 0) {
    for(var i = 0; i < random(1,5); i++) {
      var obstacle = createSprite(random(0, width), 0);
      var rand = Math.round(random(1,2));
      if(rand === 1) {
      obstacle.addImage("stone", stoneImg)
      
      } else {
        obstacle.addImage("log,", logImg)
      }
      obstacle.velocityY = 3;
      obstacle.scale=0.3;

      obstacleGroup.add(obstacle);
      obstacle.lifetime = 300
      obstacle.setCollider("rectangle", 0,0, 470 , 450)

    }    
	  
  }
  
}
function spawnFruits(){
  if(frameCount % 190 === 0){
    for(var k = 0; k< random(1,4); k++){
      var fruit = createSprite(random(0,width), 0);
      var rand = Math.round(random(1,5));
      if(rand === 1){
        fruit.addImage ("orange",orangeImg);
        fruit.scale = 0.3
      } else if(rand === 2){
        fruit.addImage("banana", bananaImg);
        fruit.scale = 0.1

      }else if(rand === 3){
        fruit.addImage("strawberry", strawberryImg);
        fruit.scale = 0.1

      }else if(rand === 4){
        fruit.addImage("apple", appleImg)
        fruit.scale = 0.3
      }
fruit.velocityY = 3;
fruitGroup.add(fruit)

    }
  }
};


function spawnCoins(){
  if(frameCount % 570 === 0){
    for (var k = 0; k <random(1,3); k++){
      var coins = createSprite(random(0,width), 0);
        coins.addImage("coins", coinsImg);
        coins.velocityY = 3;
        coins.scale = 0.3;
        coinsGroup.add(coins);
      }
    }
  
}

function restart(){
  if(mousePressedOver(reset)){
    gameState = PLAY;
    fruitGroup.destroy();
    obstacleGroup.destroy();
  }
}
