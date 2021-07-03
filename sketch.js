var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastFeed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createButton("Feed Dog");
  feed.position(400,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  getTime();
  
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
  
  //write code to display text lastFed time here
  if(lastFeed>=12){
    fill("white");
    text("Last Feed : " + lastFeed +" PM", 350, 30);
  }else if(lastFeed==0){
    fill("white");
    text("Last Feed : " + lastFeed +" AM", 350, 30);
  }else if(lastFeed>=0){
    fill("white");
    text("Last Feed : " + lastFeed +" AM",350,30);
  }
  
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodS--;
  database.ref('/').update({
    Food:foodS
  })
  getTime();
}

//function to add food in stock
function addFoods(){
  dog.addImage(sadDog);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

async function getTime(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    lastFeed = datetime.slice(11,13);
    console.log(lastFeed);
    
}