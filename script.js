var ctx = document.getElementById("ctx").getContext("2d");

ctx.font = "30px Arial";

var HEIGHT = 500;
var WIDTH = 500;
var message = "Bouncing";

// player
var player = {
  x: 50,
  spdX: 30,
  y: 40,
  spdY: 5,
  name: "P"
};

var enemyList = {};

// get distance between player and enemy < 10 => colliding
getDistanceBetweenEntity = function(entity1, entity2) {
  //return distance(number)
  var vx = entity1.x - entity2.x;
  var vy = entity1.y - entity2.y;
  return Math.sqrt(vx * vx + vy * vy);
};

testCollisionEntity = function(entity1, entity2) {
  // return if colliding (true/false)
  var distance = getDistanceBetweenEntity(entity1, entity2);
  return distance < 30;
};

Enemy = function(id, x, y, spdX, spdY) {
  var enemy = {
    x: x,
    spdX: spdX,
    y: y,
    spdY: spdY,
    name: "E",
    id: id
  };

  enemyList[id] = enemy;
};

updateEntity = function(something) {
  something.x += something.spdX;
  something.y += something.spdY;
  ctx.fillText(something.name, something.x, something.y);

  if (something.x < 0 || something.x > WIDTH) {
    // console.log(message);
    something.spdX = -something.spdX;
  }

  if (something.y < 0 || something.y > HEIGHT) {
    // console.log(message);
    something.spdY = -something.spdY;
  }
};

update = function() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  for (var key in enemyList) {
    updateEntity(enemyList[key]);

    var isColliding = testCollisionEntity(player, enemyList[key]);
    if (isColliding) {
      //   console.log("Colliding!");
    }
  }

  updateEntity(player);
};

Enemy("E1", 150, 350, 10, 15);
Enemy("E2", 250, 350, 10, -15);
Enemy("E3", 250, 150, 10, -8);

setInterval(update, 40);
