

var Health = ex.Actor.extend({
	constructor: function(x, y){
		ex.Actor.apply(this, [x, y, 32*2, 32*2]);
		
		var ss = new ex.SpriteSheet(Resources.HealthDropSpriteShee, 4, 1, 32, 32);
		var anim = ss.getAnimationByIndices(engine, [0, 1, 2, 3, 2, 1], 200);
		anim.loop = true;
		anim.scale.setTo(4, 4);
		this.addDrawing("default", anim);
		
		this.collisionType = ex.CollisionType.Passive;
		
		this.on('collision', function(ce){
			if(ce.other === player){
				battery.level = Math.min(battery.level + 1, battery.maxLevel);
				this.kill();
			} 
		});
		
	},
	update: function(engine, delta) {
		ex.Actor.prototype.update.apply(this, [engine, delta]);
		this.setZIndex(this.y);
	}
	
});