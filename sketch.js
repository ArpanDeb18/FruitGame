var PLAY = 1;
var END = 0;
var gameState = 1;
var sword, swordImage;
var fruit1, fruit2, fruit3, fruit4;
var alien1, alien2;
var swordSound;
var score = 0;
var gameOver, gameOverImage, gameOverSound;

function preload() {

  swordImage = loadImage("sword.png");

  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");

  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");

  gameOverImage = loadImage("gameover.png");

  swordSound = loadSound("knifeSwooshSound.mp3");

  gameOverSound = loadSound("gameover.mp3");

}

function setup() {

  createCanvas(380, 380);

  sword = createSprite(40, 200, 20, 20);
  sword.addImage("sword img", swordImage);
  sword.scale = 0.5;

  fruitGroup = new Group();
  enemyGroup = new Group();


  gameOver = createSprite(190, 190, 50, 50);
  gameOver.addImage("game over img", gameOverImage);
  gameOver.scale = 1.2;
  gameOver.visible = false;
}

function draw() {
  background("skyblue");


  sword.x = mouseX;
  sword.y = mouseY;

  if (gameState === PLAY) {

    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      score = score + 2;
      swordSound.play();
    }




    if (enemyGroup.isTouching(sword)) {

      gameState = END;
      gameOverSound.play();
    }

  } else if (gameState === END) {
    gameOver.visible = true;
    fruitGroup.setVelocityXEach(0);
    fruitGroup.setLifetimeEach(0);
    enemyGroup.setVelocityXEach(0);
    enemyGroup.setLifetimeEach(0);
    /*sword.x = 200;
    sword.y = 200;*/
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    sword.destroy();
  }

  fruits();
  enemy();

  drawSprites();

  fill("black");
  textSize(20);
  text("Score : " + score, 270, 30);
}


function fruits() {
  if (frameCount % 80 === 0) {
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;

    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 340));

    fruit.setLifetime = 95;
    fruitGroup.add(fruit);

    var position = Math.round(random(1, 2));
    if (position === 1) {
      fruit.x = 400;
      fruit.velocityX = -(7 + (score / 4));
    } else if (position === 2) {
      fruit.x = 0;
      fruit.velocityX = (7 + (score / 4));
    }
  }
}

function enemy() {
  if (frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    //monster.scale = 0.2;

    r = Math.round(random(1, 2));
    if (r == 1) {
      monster.addImage(alien1);
    } else {
      monster.addImage(alien2);
    }

    monster.y = Math.round(random(100, 300));
    monster.velocityX = -(8 + (score / 10));
    monster.setLifetime = 45;
    enemyGroup.add(monster);
  }
}