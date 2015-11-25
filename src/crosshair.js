

var CrossHair = ex.Actor.extend({
	constructor: function(x, y, engine, player) {
		ex.Actor.apply(this, [x, y]);
		var crossHairSprite =  Resources.CrossHairSprite.asSprite();
		//crossHairSprite.scale.setTo(4, 4);
		this.addDrawing('default', crossHairSprite);
		this.player = player;
		var that = this;
		engine.input.pointers.primary.on("move", function (pe) {
			that.x = pe.x;
			that.y = pe.y;
			that.player.gun.rotation = new ex.Vector(pe.x - that.player.x, pe.y - that.player.y).toAngle();
			
            if(that.x < player.x){
               that.player.gunSprite.flipVertical = true;
            }else{
               that.player.gunSprite.flipVertical = false;   
            }
		});
		
		engine.input.pointers.primary.on("down", function(pe){
			if(pe.button === ex.Input.PointerButton.Left){
				that.player.fire.apply(that.player, [engine.currentScene]);
			}else{
				that.player.barrel.reload();
			}
		});
		
		
	},
	
	update: function(engine, delta){
		ex.Actor.prototype.update.apply(this, [engine, delta]);
		if(this.x < this.player.x){
           this.player.gunSprite.flipVertical = true;
        }else{
           this.player.gunSprite.flipVertical = false;   
        }
	},
	
	onInitialize: function (engine){
		this.setZIndex(this.player.getZIndex()-99);
	},
	
});