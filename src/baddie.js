

var Baddie = ex.Actor.extend({
	lastChange: Date.now(),
	constructor: function(x, y) {
		ex.Actor.apply(this, [x, y, Config.BaddieWidth, Config.BaddieHeight]);
		
		this.dx = ex.Util.randomInRange(-300, 300);
	    this.dy = ex.Util.randomInRange(-300, 300);
		
		var healthbar = new ex.SpriteSheet(Resources.HealthBarSpriteSheet, 31, 1, 32, 32);
		healthbar = healthbar.getAnimationForAll(engine, 100);
		healthbar.scale.setTo(4, 4);
		this.healthbar = healthbar;
		
		var spriteSheet = new ex.SpriteSheet(Resources.BaddieSpriteSheet, 5, 1, 32, 32);
		
		var anim = spriteSheet.getAnimationForAll(engine, 100);
		anim.scale.setTo(4, 4);
		anim.loop = true;
		
		this.leftAnim = anim;
		this.rightAnim = spriteSheet.getAnimationForAll(engine, 100);
		this.rightAnim.flipHorizontal = true;
		this.rightAnim.scale.setTo(4, 4);
		this.rightAnim.loop = true;
		
		
		
		
		this.addDrawing('left', this.leftAnim);
		this.addDrawing('right', this.rightAnim);
	},
	
	changeDir: function(){
		var currentTime = Date.now();
		if(currentTime - this.lastChange > Config.BaddieChangeInterval + ex.Util.randomInRange(200, 1000)){
			var magnitude = new ex.Vector.fromAngle(ex.Util.randomInRange(0, 2 * Math.PI));
			magnitude = magnitude.scale(300);
			this.dx = magnitude.x;
			this.dy = magnitude.y;
			this.lastChange = currentTime;
		}
		
	},
	
	update: function(engine, delta){
		ex.Actor.prototype.update.apply(this, [engine, delta]);
		
		if(this.dx > 0){
			this.setDrawing('right');
		}
		
		if(this.dx < 0){
			this.setDrawing('left');
		}
		
		
		this.changeDir();
		
		this.setZIndex(this.y);			
	},
	
	draw: function(ctx, delta){
		ex.Actor.prototype.draw.apply(this, [ctx, delta]);
		
		this.healthbar.currentFrame = 0;		
		this.healthbar.draw(ctx, this.x - this.getWidth()/2, this.y-140);
	}
})