

var Bullet = ex.Actor.extend({
	owner: null,
	constructor: function(x, y, direction, owner){
		ex.Actor.apply(this, [x, y, Config.BulletSize, Config.BulletSize]);
		var bulletSprite =  Resources.BulletSprite.asSprite();
		bulletSprite.scale.setTo(2, 2);
		this.addDrawing("default", bulletSprite);

		this.owner = owner;
		var speed = Config.BulletSpeed;
		if(this.owner === 'player'){
			speed = Config.PlayerBulletSpeed;
		}

		this.dx = direction.x * speed;
		this.dy = direction.y * speed;

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
				ce.other.health -= 4;
				this.kill();
			}
			
			if(ce.other instanceof Cactus){
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