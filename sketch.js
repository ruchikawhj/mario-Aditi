var cloud1, cloud2, cloud, cloudsGroup
var ground, groundImg;
var mario,marioAni;
var obstacle1,obstacle2,obstaclesGroup;
var coinImage,coinGroup,coin;

var score=0;
function preload(){
cloud1 = loadImage("assets/cloud1.png")
cloud2 = loadImage("assets/cloud2.png")
obstacle1 = loadImage("assets/obstacle1.png")
obstacle2 = loadImage("assets/obstacle2.png")
groundImg = loadImage("assets/ground.png")
coinImage=loadImage("assets/coin.png");

marioAni=loadAnimation("assets/mario/mario1.png","assets/mario/mario2.png","assets/mario/mario3.png","assets/mario/mario4.png","assets/mario/mario5.png","assets/mario/mario6.png","assets/mario/mario7.png","assets/mario/mario8.png","assets/mario/mario9.png","assets/mario/mario10.png","assets/mario/mario11.png","assets/mario/mario12.png");

}

function setup(){
createCanvas(windowWidth, windowHeight)
ground = createSprite(width/2, height-100, width, 60)
ground.addImage(groundImg);

mario=createSprite(100,height-300);
mario.addAnimation("running",marioAni);
mario.scale=0.25;

cloudsGroup = new Group();
coinGroup = new Group();
obstaclesGroup = new Group()
}

function draw(){
  background("#5a8ff3");
  textSize(40);
  fill("white");
  stroke("black");
  strokeWeight(2)
  text("Coins: "+score,width-300,100);
  ground.velocityX=-3;
  if(ground.x<width/3+120){
    ground.x=width/2;
  }
  if(keyDown("space")&&mario.y>height/2){
    mario.velocityY=-15;
  }
  mario.velocityY+=0.8;

    for(var i=0;i<coinGroup.length;i++){
      if(coinGroup.get(i).isTouching(mario)){
        coinGroup.get(i).destroy();
        score++;
      }
    }
 

  spawnClouds();
  spawnObstacle1();
  spawnCoins();
  mario.collide(ground);
 drawSprites() ;
}

function spawnClouds(){
if(frameCount%120===0){
  cloud = createSprite(width, 100)
  cloud.y = Math.round(random(50,300))
  var x = Math.round(random(0,1))
  if(x==0){
    cloud.addImage(cloud1)
  }
  else{
    cloud.addImage(cloud2)
  }
  cloud.scale=0.5
  cloud.velocityX=-3
  cloud.lifetime = 800
  mario.depth=cloud.depth+1
  cloudsGroup.add(cloud)
}
}


function spawnObstacle1(){
  if(frameCount%(Math.round(random(120,250)))===0){
    obstacle = createSprite(width, height-260);
    
    obstacle.addImage(obstacle1)
    obstacle.scale=0.2
    obstacle.velocityX=-3
    obstacle.lifetime = 800
   
    obstaclesGroup.add(obstacle)
  }
}



/*function throwBullet() {
  bullet = createSprite(70,240,10,40);
  bullet.addImage(bulletImage);
  bullet.rotation = -30;
  bullet.scale = 0.1;
  bullet.velocityY = 2;    
  bullet.velocityX = 4;
  bullet.lifetime = 50;
  bulletGroup.add(bullet);
}*/


function spawnCoins(){
  if (frameCount%(Math.round(random(50,250))) === 0){

    coin = createSprite(width,height-400, 50, 50 )
    coin.addAnimation("coin", coinImage);
    coin.y=Math.round(random(height-400,height-300)); 
    coin.scale = 0.1;
    coin.velocityX =-(3+score*1.9/100);           
    coin.lifetime = 800;
    coinGroup.add(coin);
   


  }



}