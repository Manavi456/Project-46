var PLAY = 1;
var END = 0;
var gameState = PLAY;

var dog,dog_Img;

var boneImg,boneGroup;

var stoneImg, stoneGroup;

var Score ;

var gameOver, gameOverImg;

var ground;

var score = 0;

function preload()
{
	dog_Img = loadImage("running.png");
	boneImg = loadImage("BONES1.jpg");
	
	gameOverImg = loadImage("gameOver.png");
}

function setup() {
	createCanvas(1500,500);

	dog = createSprite(300,500,20,20);
	dog.addImage(dog_Img);
	dog.scale = 0.2;
	dog.setCollider("rectangle", 0, 0, dog.width,dog.height);
    dog.debug = false;

	ground = createSprite(750,490,1500,20);
	ground.x = ground.width /2;
	ground.shapeColor = "black";

	invisibleGround = createSprite(750,500,1500,20);
	invisibleGround.x = invisibleGround.width/2;
	invisibleGround.visible = false;


	stoneGroup = new Group();
	boneGroup = new Group();

	Score = 0;

}


function draw() {

background(rgb(83,151,112));
 
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && dog.y >= 159) {
      dog.velocityY = -12;
    }
  
    dog.velocityY = dog.velocityY + 0.8

    
  if (ground.x < 1450){
	ground.x = ground.width/2;
  }

  if (invisibleGround.x < 1450){
	 invisibleGround.x = invisibleGround.width/2;

	 if(boneGroup.isTouching(dog)){
		Score = Score + 10;
	    boneGroup.destroyEach();
		 
	 }
  }

  if(stoneGroup.isTouching(dog)){
	  
	fill("black")
	textSize(150);
	text("Game Over !!", 350,250)
	gameState = END;

  ground.velocityX = 0;
  invisibleGround2.velocityX = 0;
  dog.velocityX = 0;

stoneGroup.setVelocityXEach(0);
boneGroup.setVelocityXEach(0);

stoneGroup.setLifetimeEach(-1);
boneGroup.setLifetimeEach(-1);

}
   
  dog.collide(invisibleGround);
  spawnStone();
  spawnBones();

 }
 fill("black")
textSize(30)
text("Distance: "+ score, 50,50);

fill("black")
textSize(30)
text("Score: "+ Score, 1300,50);

drawSprites();

}

  
  function spawnStone(){
   if (frameCount % 150 === 0){
	 var stone = createSprite(1450,445,70,70);
	 	stone.shapeColor = "brown";
		 stone.velocityX = -(6+score/100)
		stone.lifetime = 450;
	 
	  stoneGroup.add(stone);
   }
  }
  
  
  function spawnBones() {
  
	if (frameCount % 120 === 0) {
	  var bone = createSprite(1500,180,20,20);
	  bone.addImage(boneImg);
	  bone.scale = 0.3;
	  bone.velocityX = -(6+score/100);
      bone.lifetime = 450;
	
	  boneGroup.add(bone);
	}
  }
  
  
  