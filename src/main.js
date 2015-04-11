

var engine = new ex.Engine({canvasElementId: "game", displayMode: ex.DisplayMode.FullScreen});
engine.setAntialiasing(false);
engine.input.gamepads.enabled = true;
var loader = new ex.Loader();
for(var resouce in Resources){
	loader.addResource(Resources[resouce]);
}

var player = new Player(engine.getWidth()/2, engine.getHeight()/2 , 100, 100, ex.Color.Red);

engine.add(player);


engine.start(loader).then(function(){
	// game loaded
	console.log("Game loaded");
});