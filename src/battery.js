


var Battery = ex.UIActor.extend({
	level: 10,
	maxLevel: 10,
	constructor: function(x, y){
		ex.UIActor.apply(this, [x, y, 32, 76]);
		this.anchor.setTo(0, 0);
		this.sprites = new ex.SpriteSheet(Resources.BatterySpriteSheet, 11, 1, 32, 78).sprites;
		this.sprites.forEach(function(s){
			//s.scale.setTo(4, 4);	
		});
		
	},
	
	update: function(engine, delta){
		ex.UIActor.prototype.update.apply(this, [engine, delta]);
		
		this.y = engine.getHeight() - this.getHeight() - 20;
		
	},
	
	draw: function(ctx, delta){
		ex.UIActor.prototype.draw.apply(this, [ctx, delta]);
		
		this.sprites[this.maxLevel - this.level].draw(ctx, this.x, this.y);
	}
	
	
	
})