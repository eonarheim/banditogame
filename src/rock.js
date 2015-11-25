

var Rock = ex.Actor.extend({
	constructor: function(x, y){
		ex.Actor.apply(this, [x, y, 32*3, 32*3]);
		var sprites = (new ex.SpriteSheet(Resources.RockSpriteSheet, 2, 1, 32, 32)).sprites;
		sprites.forEach(function(s) {
			//s.scale.setTo(4, 4);
		});
		
		this.collisionType = ex.CollisionType.Fixed;
		
		this.addDrawing("default", sprites[ex.Util.randomIntInRange(0, sprites.length)]);		
	},
	update: function(engine, delta) {
		ex.Actor.prototype.update.apply(this, [engine, delta]);
		this.setZIndex(this.y);
	}
});