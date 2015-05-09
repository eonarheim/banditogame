

var Bullet = ex.Actor.extend({
	constructor: function(x, y, direction){
		ex.Actor.apply(this, [x, y, Config.BulletSize, Config.BulletSize]);
		var bulletSprite =  Resources.BulletSprite.asSprite();
		bulletSprite.scale.setTo(2, 2);
		this.addDrawing("default", bulletSprite);

		this.dx = direction.x * Config.BulletSpeed;
		this.dy = direction.y * Config.BulletSpeed;

		this.on("exitviewport", function(){
			this.kill();
		});
	},

	update: function(engine, delta){
		ex.Actor.prototype.update.apply(this, [engine, delta]);

		var direction = new ex.Vector(this.dx, this.dy).toAngle();

		this.rotation = direction;

      this.setZIndex(this.y);

	}

});