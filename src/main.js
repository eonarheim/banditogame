

var engine = new ex.Engine({canvasElementId: "game", displayMode: ex.DisplayMode.FullScreen});
engine.backgroundColor = new ex.Color(255, 198, 84);
engine.setAntialiasing(false);
engine.input.gamepads.enabled = true;
engine.currentScene.camera.lerp = true;

var loader = new ex.Loader();
for(var resouce in Resources){
	loader.addResource(Resources[resouce]);
}
var barrel = new Barrel(20, 20, engine);
var player = new Player(engine.getWidth()/2, engine.getHeight()/2 , 100, 200, barrel);

var cactus = new Cactus(400, 200);
var cactus2 = new Cactus(600, 400);
var cactus3 = new Cactus(500, 700);


engine.add(player);
engine.add(barrel);

engine.add(cactus);
engine.add(cactus2);
engine.add(cactus3);


engine.input.keyboard.on("down", function(ev){
   if(ev.key === ex.Input.Keys.D){
      engine.isDebug = !engine.isDebug;
   }
});

engine.start(loader).then(function(){
	// game loaded
	console.log("Game loaded");
});