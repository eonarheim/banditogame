

var Player = ex.Actor.extend({	
	lastFire: Date.now(),
	constructor: function(x, y, width, height, barrel){
		ex.Actor.apply(this, [x, y, width, height]);

      //this.collisionType = ex.CollisionType.Active;

		this.gunSprite =  Resources.GunSprite.asSprite();
      this.spriteSheet = new ex.SpriteSheet(Resources.RobitoSpriteSheet, 12, 1, 64, 64);
      this.downAnim = this.spriteSheet.getAnimationBetween(engine, 0, 5, 100);
      this.upAnim = this.spriteSheet.getAnimationBetween(engine, 6, 11, 100);
      this.idleDownAnim = this.spriteSheet.getSprite(0);
      this.idleUpAnim = this.spriteSheet.getSprite(6);

		this.gunSprite.scale.setTo(4, 4);

      //this.gun = new ex.Actor(width/2, height/4, 20, 20);
      this.gunAnchor = new ex.Actor(width/2 + this.x, height/4 + this.y);      
      this.gun = new ex.Actor(x, y, 20, 20);
      this.gun.addDrawing("default", this.gunSprite);

      
      engine.add(this.gun, 0);
      this.gun.follow(this.gunAnchor, 12);

      this.idleDownAnim.scale.setTo(4, 4);
      this.downAnim.scale.setTo(4, 4);
      this.downAnim.loop = true;

      this.idleUpAnim.scale.setTo(4, 4);
      this.upAnim.scale.setTo(4, 4);
      this.upAnim.loop = true;

		this.addDrawing("up", this.upAnim);
      this.addDrawing("idleUp", this.idleUpAnim);
      this.addDrawing("down", this.downAnim);
      this.addDrawing("idleDown", this.idleDownAnim);
      this.setDrawing("idleDown");

		this.barrel = barrel;
	},

	update: function(engine, delta){
		ex.Actor.prototype.update.apply(this, [engine, delta]);
      this.gunAnchor.dx = this.dx;
      this.gunAnchor.dy = this.dy;
      this.gunAnchor.update(engine, delta);
		// clear move
		this.dx = 0;
		this.dy = 0;


		// todo find first active pad
		// todo alternate input method needs to be keyboard and mouse
		var pad = engine.input.gamepads.at(0);

		// sticks
		var leftAxisY = pad.getAxes(ex.Input.Axes.LeftStickY);
		var leftAxisX = pad.getAxes(ex.Input.Axes.LeftStickX);
		var rightAxisX = pad.getAxes(ex.Input.Axes.RightStickX);
		var rightAxisY = pad.getAxes(ex.Input.Axes.RightStickY);


		var rightVector = new ex.Vector(rightAxisX, rightAxisY);
		var leftVector = new ex.Vector(leftAxisX, leftAxisY);
		var magnitude = leftVector.distance()

      if(rightVector.distance() > .1){
		   this.gun.rotation = rightVector.toAngle();
      }

		if(magnitude > .2){
			leftVector = leftVector.normalize();
			this.dx = leftVector.x * Config.PlayerSpeed;
			this.dy = leftVector.y * Config.PlayerSpeed;
		}

		if(pad.getButton(ex.Input.Buttons.RightTrigger) > .1){
			this.fire(engine.currentScene);
		}

		if(pad.getButton(ex.Input.Buttons.LeftTrigger) > .1){
			this.barrel.reload();
		}

      if(pad.getButton(ex.Input.Buttons.Face2)){
         engine.currentScene.camera.setFocus(this.x, this.y);
      }

      if(this.dy > 0){
         
         this.setDrawing("down");
         this.gun.setZIndex(this.y + 3);
         this.goingDown = true;
         this.goingUp = false;
      }
      if(this.dy < 0){
         
         this.setDrawing("up");
         this.gun.setZIndex(this.y - 3);
         this.goingUp = true;
         this.goingDown = false;
      }

      if(this.dy === 0){
         if(this.goingUp){
            this.setDrawing("idleUp");
         }
         if(this.goingDown){
            this.setDrawing("idleDown");
         }
      }

      this.setZIndex(this.y);
	},

	fire: function(scene){
		var currentTime = Date.now();
		if(currentTime - this.lastFire > Config.PlayerFireInterval && this.barrel.ammo && !this.barrel.reloading){
			this.barrel.fire();
			var bulletOffset = new ex.Vector(90, -30);
			bulletOffset = bulletOffset.rotate(this.gun.rotation, ex.Vector.Zero);
			var bullet = new Bullet(this.gun.getWorldX() + bulletOffset.x, this.gun.getWorldY() + bulletOffset.y, ex.Vector.fromAngle(this.gun.rotation));
			scene.add(bullet);
         this.scene.camera.shake(15, 15, 150);
			this.lastFire = currentTime;
		}

		if(currentTime - this.lastFire > Config.PlayerFireInterval && this.barrel.ammo === 0){
			Resources.EmptySound.play();
			this.lastFire = currentTime;
		}
	}



});