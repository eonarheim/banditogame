

var Bullet = ex.Actor.extend({
	owner: null,
	life: Config.BulletLifetime,
	constructor: function(x, y, direction, owner){
		ex.Actor.apply(this, [x, y, Config.BulletSize, Config.BulletSize]);
		var bulletSprite =  Resources.BulletSprite.asSprite();
		bulletSprite.scale.setTo(.5, .5);
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
			//this.kill();
		});		
		
		this.on('collision', function(ce){	
			if(players.indexOf(ce.other) > -1 && ce.actor.owner !== 'player'){
				engine.currentScene.camera.shake(Config.CameraShake, Config.CameraShake, Config.CameraShakeDuration);
				ce.other.takeDamage();
				this.kill();	
			}
			
			if(players.indexOf(ce.other) === -1 && ce.actor.owner === 'player'){
				ce.other.health -= 10;
				this.kill();
			}
			
			if(ce.other instanceof Cactus || ce.other instanceof Rock){
				this.kill();
			}			
		});
	},

	update: function(engine, delta){
		ex.Actor.prototype.update.apply(this, [engine, delta]);
		
		var mapCollision = tm.collides(this);
		if(mapCollision) {
				this.x += mapCollision.x;
				this.y += mapCollision.y;
				this.kill();
		}
		
		this.life -= delta;
		if(this.life < 0){
			this.kill();
		}

		var direction = new ex.Vector(this.dx, this.dy).toAngle();

		this.rotation = direction;

      	this.setZIndex(this.y);

	}

});