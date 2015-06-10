/// <reference path="../lib/excalibur-0.5.0.d.ts" />



var Baddie = ex.Actor.extend({
	lastChange: Date.now(),
	lastFire: Date.now(),
	constructor: function(x, y) {
		ex.Actor.apply(this, [x, y, Config.BaddieWidth, Config.BaddieHeight]);
		
		this.collisionType = ex.CollisionType.Passive;
				
		var healthbar = new ex.SpriteSheet(Resources.HealthBarSpriteSheet, 31, 1, 32, 32);
		healthbar = healthbar.getAnimationForAll(engine, 100);
		this.healthbar = healthbar.sprites;
		this.healthbar.forEach(function(s){
			s.scale.setTo(4, 4);
		});
		
		var spriteSheet = new ex.SpriteSheet(Resources.BaddieSpriteSheet, 5, 1, 32, 32);
		
		var anim = spriteSheet.getAnimationBetween(engine, 1, 6, 100);
		anim.scale.setTo(4, 4);
		anim.loop = true;
		
		this.health = this.MAXHEALTH = 10;
		
		this.leftAnim = anim;
		this.rightAnim = spriteSheet.getAnimationBetween(engine, 1, 6, 100);
		this.rightAnim.flipHorizontal = true;
		this.rightAnim.scale.setTo(4, 4);
		this.rightAnim.loop = true;
		
		this.leftIdleAnim = spriteSheet.getAnimationByIndices(engine, [1, 1, 1, 1, 1, 0], 100);
		this.leftIdleAnim.scale.setTo(4, 4);
		this.leftIdleAnim.loop = true;
		
		
		this.rightIdleAnim = spriteSheet.getAnimationByIndices(engine, [1, 1, 1, 1, 1, 0], 100);
		this.rightIdleAnim.flipHorizontal = true;
		this.rightIdleAnim.scale.setTo(4, 4);
		this.rightIdleAnim.loop = true;
				
		
		this.addDrawing('left', this.leftAnim);
		this.addDrawing('right', this.rightAnim);
		this.addDrawing('leftIdle', this.leftIdleAnim);
		this.addDrawing('rightIdle', this.rightIdleAnim);
		
		
		this.setDrawing('leftIdle');
	},
	
	onInitialize: function(){		
		this.gunSprite = Resources.ShotgunSprite.asSprite().clone();
		this.gunSprite.scale.setTo(4, 4);
		this.gun = new ex.Actor(0, this.getHeight()/8, 32*4, 20);
		this.gun.addDrawing(this.gunSprite);
		this.gun.anchor.setTo(.15, .5);
		
		this.addChild(this.gun);
		
		this.changeLocation();	
		
	},
	
	
	changeLocation: function(){
		/*var currentTime = Date.now();
		if(currentTime - this.lastChange > Config.BaddieChangeInterval + ex.Util.randomInRange(200, 1000)){
			var angle = ex.Util.randomInRange(0, 2 * Math.PI);
			var magnitude = ex.Vector.fromAngle(angle);
			magnitude = magnitude.scale(Config.BaddieSpeed);
			this.dx = magnitude.x;
			this.dy = magnitude.y;
			this.lastChange = currentTime;
		}*/
		
		var randomAngle = ex.Util.randomInRange(0, 2*Math.PI);
		var targetX = Config.PlayerRadius * Math.cos(randomAngle) + player.x;
		var targetY = Config.PlayerRadius * Math.sin(randomAngle) + player.y;
		
		var that = this;
		this.moveTo(targetX, targetY, Config.BaddieSpeed).asPromise().then(function(){
			that.fire(engine.currentScene);			
		});
		
		this.gun.rotation = (new ex.Vector(targetX, targetY).minus(new ex.Vector(this.x, this.y))).toAngle();
		
	},
	
	update: function(engine, delta){
		ex.Actor.prototype.update.apply(this, [engine, delta]);
		
		if(this.dx > 0){
			this.goingRight = true;
			this.goingLeft = false;
			this.setDrawing('right');
		}
		
		if(this.dx < 0){
			this.goingRight = false;
			this.goingLeft = true;
			this.setDrawing('left');
		}		
		
		if(this.dx === 0){
			if(this.goingRight){
				this.setDrawing('leftIdle');
			}
			
			if(this.goingLeft){
				this.setDrawing('rightIdle');
			}
		}
		
		//this.changeDir();
		
		if(this.gun){
			
			if(this.dx < 0){
				this.gunSprite.flipVertical = true;
			}else{
				this.gunSprite.flipVertical = false;
			}
		}
				
		this.setZIndex(this.y);			
	},
	
	draw: function(ctx, delta){
		ex.Actor.prototype.draw.apply(this, [ctx, delta]);
		
		var index = Math.max(this.MAXHEALTH - this.health, 0);		
		
		this.healthbar[index].draw(ctx, this.x - this.getWidth()/2, this.y-140);
	},
	
	fire: function(scene){
		
		this.gun.rotation = (new ex.Vector(player.x, player.y)).minus(new ex.Vector(this.x, this.y)).toAngle();
		
		var currentTime = Date.now();
		if(currentTime - this.lastFire > Config.BaddieFireInterval){			
			var bulletOffset = new ex.Vector(120, 0);
			bulletOffset = bulletOffset.rotate(this.gun.rotation, ex.Vector.Zero);
			var bullet = new Bullet(this.gun.getWorldX() + bulletOffset.x,  
				                    this.gun.getWorldY() + bulletOffset.y, 
									ex.Vector.fromAngle(this.gun.rotation));
			bullet.owner = 'baddie';
									
			scene.add(bullet);

			this.lastFire = currentTime;
		}
	},
})