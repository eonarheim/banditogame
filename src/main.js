

var engine = new ex.Engine({canvasElementId: "game", displayMode: ex.DisplayMode.FullScreen});
engine.backgroundColor = new ex.Color(255, 198, 84);
engine.setAntialiasing(false);
engine.input.gamepads.enabled = true;
engine.currentScene.camera.lerp = true;

document.oncontextmenu = function () {
	// do nothing on right click
	return false;
}


var loader = new ex.Loader();
for(var resouce in Resources){
	if(!Resources[resouce].length){
		loader.addResource(Resources[resouce]);
	}else{
		Resources[resouce].forEach(function(r){
			loader.addResource(r);
		});
	}
}



var players = [];
var player = new Player(engine.getWidth()/2, engine.getHeight()/2 , 32*2.5, 32*2.5, 0);
players.push(player);

var addPlayer = function(){
	var newPlayer = new Player(engine.getWidth()/2, engine.getHeight()/2 , 32*2.5, 32*2.5, 1);
	players.push(newPlayer);
	engine.add(newPlayer);
}


var cactus = new Cactus(400, 200);
var cactus2 = new Cactus(600, 400);
var cactus3 = new Cactus(500, 700);


for(var i = 0; i < 20; i++){
	engine.add(new Rock(ex.Util.randomIntInRange(-2000, 2000), ex.Util.randomIntInRange(-2000, 2000)));
}

for(var i = 0; i < 50; i++){
	engine.add(new Cactus(ex.Util.randomIntInRange(-2000, 2000), ex.Util.randomIntInRange(-2000, 2000)));
}


var baddies = [];

for(var i = 0; i < 5; i++){
	(function(){
		var tempBaddie = new Baddie(500, 500);
		baddies.push(tempBaddie);
		engine.add(tempBaddie);
	})();
	
}


// todo this is bad use ex timers in baddies to vary movement
setInterval(function(){ baddies.forEach(function(b){b.changeLocation();}) }, 6000);

engine.add(player);

engine.add(cactus);
engine.add(cactus2);
engine.add(cactus3);



var currentControllers = [];
var cameraVel = new ex.Vector(0, 0);
engine.on('update', function(){
	var playerAvg = players.reduce(function(last, current, i){
		return new ex.Vector(last.x + current.x, last.y + current.y);
	}, ex.Vector.Zero.clone()).scale(1/players.length);
	
	var focus = engine.currentScene.camera.getFocus().toVector();
	var position = new ex.Vector(playerAvg.x, playerAvg.y);
	
	var stretch = position.minus(focus).scale(Config.CameraElasticity);
	cameraVel = cameraVel.plus(stretch);
	
	var friction = cameraVel.scale(-1).scale(Config.CameraFriction);
	cameraVel = cameraVel.plus(friction);
	
	focus = focus.plus(cameraVel);
	engine.currentScene.camera.setFocus(focus.x, focus.y);
	
	currentControllers = engine.input.gamepads._pads.filter(function(p){
		return p.connected;
	});
	if(currentControllers.length > players.length){
		addPlayer();
	}
});


engine.input.keyboard.on("down", function(ev){
   if(ev.key === ex.Input.Keys.Q){
      engine.isDebug = !engine.isDebug;
   }
});

engine.start(loader).then(function(){
	// game loaded
	console.log("Game loaded");
	
	
});