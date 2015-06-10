

var CrossHair = ex.Actor.extend({
	constructor: function(x, y, engine, player) {
		ex.Actor.apply(this, [x, y]);
		var crossHairSprite =  Resources.CrossHairSprite.asSprite();
		crossHairSprite.scale.setTo(4, 4);
		this.addDrawing('default', crossHairSprite);
		var that = this;
		engine.input.pointers.primary.on("move", function (pe) {
			that.x = pe.x;
			that.y = pe.y;
			player.gun.rotation = new ex.Vector(pe.x - player.x, pe.y - player.y).toAngle();
			
            if(that.x < player.x){
               player.gunSprite.flipVertical = true;
            }else{
               player.gunSprite.flipVertical = false;   
            }
		});
		
		engine.input.pointers.primary.on("down", function(pe){
			if(pe.button === ex.Input.PointerButton.Left){
				player.fire(engine.currentScene);
			}else{
				player.barrel.reload();
			}
		});
		
		
	},
	
	onInitialize: function (engine){
		this.setZIndex(player.getZIndex()-99);
	},
	
});