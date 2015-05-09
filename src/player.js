

var Player = ex.Actor.extend({	
	lastFire: Date.now(),
	constructor: function(x, y, width, height, barrel){
		ex.Actor.apply(this, [x, y, width, height]);
		var gunSprite =  Resources.GunSprite.asSprite();
		gunSprite.scale.setTo(4, 4);
		this.addDrawing("default", gunSprite);
		this.barrel = barrel;
	},

	update: function(engine, delta){
		ex.Actor.prototype.update.apply(this, [engine, delta]);
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
		   this.rotation = rightVector.toAngle();
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

      this.setZIndex(this.y);
	},

	fire: function(scene){
		var currentTime = Date.now();
		if(currentTime - this.lastFire > Config.PlayerFireInterval && this.barrel.ammo && !this.barrel.reloading){
			this.barrel.fire();
			var bulletOffset = new ex.Vector(90, -30);
			bulletOffset = bulletOffset.rotate(this.rotation, ex.Vector.Zero);
			var bullet = new Bullet(this.x + bulletOffset.x, this.y + bulletOffset.y, ex.Vector.fromAngle(this.rotation));
			scene.add(bullet);
			this.lastFire = currentTime;
		}

		if(currentTime - this.lastFire > Config.PlayerFireInterval && this.barrel.ammo === 0){
			Resources.EmptySound.play();
			this.lastFire = currentTime;
		}
	}



});