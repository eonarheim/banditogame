

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
var barrel = new Barrel(20, 20, engine);
var player = new Player(engine.getWidth()/2, engine.getHeight()/2 , 32*3, 32*3, barrel);


var cactus = new Cactus(400, 200);
var cactus2 = new Cactus(600, 400);
var cactus3 = new Cactus(500, 700);
var battery = new Battery(20, 400);

var baddies = [];

for(var i = 0; i < 12; i++){
	(function(){
		var tempBaddie = new Baddie(500, 500);
		baddies.push(tempBaddie);
		engine.add(tempBaddie);
	})();
	
}


// todo this is bad use ex timers in baddies to vary movement
setInterval(function(){ baddies.forEach(function(b){b.changeLocation();}) }, 6000);

engine.add(player);
engine.add(barrel);
engine.add(battery);


engine.add(cactus);
engine.add(cactus2);
engine.add(cactus3);


var cameraVel = new ex.Vector(0, 0);
engine.on('update', function(){
	var focus = engine.currentScene.camera.getFocus().toVector();
	var position = new ex.Vector(player.x, player.y);
	
	var stretch = position.minus(focus).scale(Config.CameraElasticity);
	cameraVel = cameraVel.plus(stretch);
	
	var friction = cameraVel.scale(-1).scale(Config.CameraFriction);
	cameraVel = cameraVel.plus(friction);
	
	focus = focus.plus(cameraVel);
	engine.currentScene.camera.setFocus(focus.x, focus.y);
	
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