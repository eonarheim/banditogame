

var engine = new ex.Engine({canvasElementId: "game", displayMode: ex.DisplayMode.FullScreen});
engine.backgroundColor = new ex.Color(255, 198, 84);
engine.setAntialiasing(false);
engine.input.gamepads.enabled = true;
engine.currentScene.camera.lerp = true;

var map = new ex.Extensions.Tiled.TiledResource("desertmap.json");

var gems = new ex.SpriteSheet(Resources.GemSpriteSheet, 2, 2, 16, 16);

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
loader.addResource(map);



var players = [];
var player = new Player(40, 40 , 32*2.5/4, 30, 0);
players.push(player);

var addPlayer = function(index){
	var newPlayer = new Player(player.x, player.y , 32*2.5/4, 30, index);
	players.push(newPlayer);
	engine.add(newPlayer);
}

/*
var cactus = new Cactus(400, 200);
var cactus2 = new Cactus(600, 400);
var cactus3 = new Cactus(500, 700);


for(var i = 0; i < 20; i++){
	engine.add(new Rock(ex.Util.randomIntInRange(-2000, 2000), ex.Util.randomIntInRange(-2000, 2000)));
}

for(var i = 0; i < 50; i++){
	engine.add(new Cactus(ex.Util.randomIntInRange(-2000, 2000), ex.Util.randomIntInRange(-2000, 2000)));
}*/


var baddies = [];
/*
for(var i = 0; i < 5; i++){
	(function(){
		var tempBaddie = new Baddie(500, 500);
		baddies.push(tempBaddie);
		engine.add(tempBaddie);
	})();
	
}*/


// todo this is bad use ex timers in baddies to vary movement
//setInterval(function(){ baddies.forEach(function(b){b.changeLocation();}) }, 6000);

var currentControllers = [];
var cameraVel = new ex.Vector(0, 0);
engine.input.gamepads.setMinimumGamepadConfiguration({
	axis: 4,
	buttons: 8
});

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
	
	/*
	currentControllers = engine.input.gamepads._pads.filter(function(p){
		return p.connected;
	});
	if(currentControllers.length > players.length){
		addPlayer();
	}*/
});

engine.input.gamepads.on('connect', function(g){
	console.log("Gamepad connected", g);
	addPlayer(g.index);
});


engine.input.keyboard.on("down", function(ev){
   if(ev.key === ex.Input.Keys.Q){
      engine.isDebug = !engine.isDebug;
   }
});
var tm = null;
engine.start(loader).then(function(){
	// game loaded
	console.log("Game loaded");
	
	// read map properties
	var gameobjects = map.data.layers.filter(function(l) {
		return l.name === "Objects";
	})[0].objects;
	
	var spawn = gameobjects.filter(function(o){
		return o.name = "Spawn";
	})[0];
	
	gameobjects.filter(function(o){
		return o.name ="Enemy";
	}).forEach(function(e){
		var tempBaddie = new Baddie(e.x, e.y);
		baddies.push(tempBaddie);
		engine.add(tempBaddie);
	});
	
	gameobjects.filter(function(o){
		return o.name = "Gem";
	}).forEach(function(g){
		engine.add(new Gem(g.x, g.y));
	});
	
	player.x = spawn.x;
	player.y = spawn.y;
	
	engine.currentScene.camera.x = player.x;
	engine.currentScene.camera.y = player.y;
	engine.currentScene.camera.z = 4;
	
	// get a Excalibur `TileMap` instance
	tm = map.getTileMap();
	tm.data.forEach(function(c) {
		if(c.sprites[0].spriteId === 7){
			c.solid = true;
		}
	});
	
	// draw the tile map
	engine.add(tm);
	
	engine.add(player);
	
	engine.add(cactus);
	engine.add(cactus2);
	engine.add(cactus3);
});