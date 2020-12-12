//Create variables here
var dog, happyDog, database, foodS, foodStock, doggy, dogHappy, foodObj;
var button1, button2, fedTime, lastFed;
function preload()
{
  //load images here
  doggy = loadImage("images/dogImg.png")
  dogHappy = loadImage("images/dogImg1.png")
  
}

function setup() {
  createCanvas(800, 500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock)
  dog = createSprite(600, 250, 20, 20)
  dog.scale = 0.3
  dog.addImage("doggy", doggy)
  dog.addImage("dogHappy", dogHappy)
  foodObj = new Food()
  button1 = createButton('Feed')
  button2 = createButton('Add Food')
  button1.position(350, 10);
  button2.position(450, 10);
  button1.mousePressed()
  button2.mousePressed()
  fedTime = database.ref('FeedTime')
  fedTime.on("value", (data) => {
    lastFed = data.val()
  })
}


function draw() {  
  background(46, 139, 87)
  foodObj.display();
  button1.mousePressed(feedDog)
  button2.mousePressed(addFoods)
  fill(255, 255, 254)
  textSize(15)
  if(lastFed >== 12){
    text("Last Feed : " + lastFed % 12 + " AM", 350, 30)
  }else if(lastFed === 0){
    text("Last Feed : 12 AM", 350, 30)
  }else{
    text("Last Feed" + lastFed + " AM", 350, 30)
  }
  drawSprites();
  //add styles here

}


function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  database.ref('/').update({
    Food: x
  })
}

function feedDog(){
  dog.changeImage("dogHappy")
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1)
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food: foodS
  })
}