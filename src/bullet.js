

var Bullet = ex.Actor.extend({
	owner: null,
	constructor: function(x, y, direction){
		ex.Actor.apply(this, [x, y, Config.BulletSize, Config.BulletSize]);
		var bulletSprite =  Resources.BulletSprite.asSprite();
		bulletSprite.scale.setTo(2, 2);
		this.addDrawing("default", bulletSprite);

		this.dx = direction.x * Config.BulletSpeed;
		this.dy = direction.y * Config.BulletSpeed;

		this.collisionType = ex.CollisionType.Active;
		
		this.on("exitviewport", function(){
			this.kill();
		});
		
		
		this.on('collision', function(ce){	
			if(ce.other === player && ce.actor.owner !== 'player'){
				engine.currentScene.camera.shake(10, 10, 1000);
				player.takeDamage();
				this.kill();	
			}
			
			if(ce.other !== player && ce.actor.owner === 'player'){
				ce.other.health -= 5;
				this.kill();
			}
			
			
		});
	},

	update: function(engine, delta){
		ex.Actor.prototype.update.apply(this, [engine, delta]);

		var direction = new ex.Vector(this.dx, this.dy).toAngle();

		this.rotation = direction;

      	this.setZIndex(this.y);

	}

});