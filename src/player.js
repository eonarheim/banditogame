

var Player = ex.Actor.extend({	
      lastFire: Date.now(),
      hit: false,
      lastHit: Date.now(),
      goingLeft: true,
      goingRight: false,
      constructor: function(x, y, width, height, controllerIndex){
            ex.Actor.apply(this, [x, y, width, height]);
            
            this.controllerIndex = controllerIndex;
            //this.collisionType = ex.CollisionType.Active;

            this.gunSprite = Resources.GunSprite.asSprite();                        
            this.spriteSheet = new ex.SpriteSheet(controllerIndex === 0? Resources.RobitoSpriteSheet : Resources.RobitoSpriteSheetRed, 8, 1, 32, 32);
            
            // configure animations
            this.leftAnim = this.spriteSheet.getAnimationBetween(engine, 3, 7, 100);
            //this.leftAnim.scale.setTo(4, 4);
            this.leftAnim.loop = true;
            
            this.rightAnim = this.spriteSheet.getAnimationBetween(engine, 3, 7, 100);
            this.rightAnim.flipHorizontal = true;
            //this.rightAnim.scale.setTo(4, 4);
            this.rightAnim.loop = true;
            
            this.leftIdleAnim = this.spriteSheet.getAnimationByIndices(engine, [3, 3, 3, 3, 3, 3, 3, 3, 2], 200);
            //this.leftIdleAnim.scale.setTo(4, 4);
            this.leftIdleAnim.loop = true;
            
            this.rightIdleAnim = this.spriteSheet.getAnimationByIndices(engine, [3, 3, 3, 3, 3, 3, 3, 3, 2], 200);
            this.rightIdleAnim.flipHorizontal = true;
            //this.rightIdleAnim.scale.setTo(4, 4);
            this.rightIdleAnim.loop = true;
            
            this.leftDamageAnim = this.spriteSheet.getAnimationByIndices(engine, [0, 1, 0, 1], 400);
            //this.leftDamageAnim.scale.setTo(4, 4);
            this.leftDamageAnim.loop = true;
            
            this.rigthDamageAnim = this.spriteSheet.getAnimationByIndices(engine, [0, 1, 0, 1], 400);
            this.rigthDamageAnim.flipHorizontal = true;
            //this.rigthDamageAnim.scale.setTo(4, 4);
            this.rigthDamageAnim.loop = true;
            
            
            
             
            this.gun = new ex.Actor(0, this.getHeight()/5, 20, 20);
                   
            
            this.add(this.gun);
                                                
            this.addDrawing("left", this.leftAnim);
            this.addDrawing("right", this.rightAnim);
            this.addDrawing("leftIdle", this.leftIdleAnim);
            this.addDrawing("rightIdle", this.rightIdleAnim);
            this.addDrawing("leftDamage", this.leftDamageAnim);
            this.addDrawing("rightDamage", this.rigthDamageAnim);
            
            this.setDrawing("leftIdle");
            
            this.barrel = new Barrel(controllerIndex === 0 ? 20 : engine.getWidth() - 20 - 32*4, 20, engine);
            this.crosshair = new CrossHair(engine.getWidth()/2, engine.getHeight()/2, engine, this);
            this.battery = new Battery(controllerIndex === 0 ? 20 : engine.getWidth() - 20 - 32*4, 400);
            
            this.collisionType = ex.CollisionType.Passive;
            
            engine.add(this.crosshair);
            engine.add(this.barrel);
            engine.add(this.battery);
	},
      
      onInitialize: function(){
            this.gunSprite = Resources.GunSprite.asSprite().clone();
            //this.gunSprite.scale.setTo(4, 4);
            this.gun.addDrawing("default", this.gunSprite);   
      },      

	update: function(engine, delta){
            ex.Actor.prototype.update.apply(this, [engine, delta]);
            
            var mapCollision = tm.collides(this);
            if(mapCollision) {
                  this.x += mapCollision.x;
                  this.y += mapCollision.y;
            }
            
            // clear move
            this.dx = 0;
            this.dy = 0;
            
            
            // todo find first active pad
            // todo alternate input method needs to be keyboard and mouse
            var pad = engine.input.gamepads.at(this.controllerIndex);
            
            // sticks
            var leftAxisY = pad.getAxes(ex.Input.Axes.LeftStickY);
            var leftAxisX = pad.getAxes(ex.Input.Axes.LeftStickX);
            var rightAxisX = pad.getAxes(ex.Input.Axes.RightStickX);
            var rightAxisY = pad.getAxes(ex.Input.Axes.RightStickY);
            
            
            var rightVector = new ex.Vector(rightAxisX, rightAxisY);
            var crossHairVector = rightVector.scale(400/4);
            var leftVector = new ex.Vector(leftAxisX, leftAxisY);
            var magnitude = leftVector.distance()
            
            if(rightVector.distance() > .1){
               this.gun.rotation = rightVector.toAngle();
               this.crosshair.x = crossHairVector.x + this.x;
               this.crosshair.y = crossHairVector.y + this.y;                              
            }
                        
            if(magnitude > .2){
            	leftVector = leftVector.normalize();
            	this.dx = leftVector.x * Config.PlayerSpeed;
            	this.dy = leftVector.y * Config.PlayerSpeed;
            }
            
            if (engine.input.keyboard.isHeld(ex.Input.Keys.W)) {
               this.dy = -Config.PlayerSpeed;
            }
            
            if (engine.input.keyboard.isHeld(ex.Input.Keys.S)) {
               this.dy = Config.PlayerSpeed;
            }
            
            if (engine.input.keyboard.isHeld(ex.Input.Keys.A)) {
               this.dx = -Config.PlayerSpeed;
            }
            
            if (engine.input.keyboard.isHeld(ex.Input.Keys.D)) {
               this.dx = Config.PlayerSpeed;
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
            
            if(!this.hit){
                  if(this.dx > 0){
                     
                     this.setDrawing("right");
                     
                     this.goingRight = true;
                     this.goingLeft = false;
                  }
                  if(this.dx < 0){
                     
                     this.setDrawing("left");
                     
                     this.goingLeft = true;
                     this.goingRight = false;
                  }
                  
                  if(this.dx === 0){
                     if(this.goingRight){
                        if (this.dy === 0){
                           this.setDrawing("rightIdle");
                        }else{
                           this.setDrawing("right")
                        }
                     }
                     if(this.goingLeft){
                        if ( this.dy === 0){
                           this.setDrawing("leftIdle");
                        }else{
                            this.setDrawing("left"); 
                        }
                     }               
                  }
            }
            
            var currentTime = Date.now();
            if(currentTime - this.lastHit > Config.PlayerHitInterval && this.hit){                  
                  this.hit = false;
            }
            
            
            this.setZIndex(this.y);
            this.crosshair.setZIndex(this.y + 500);
	},
      
      debugDraw: function(ctx){
            ex.Actor.prototype.debugDraw.apply(this, [ctx]);		
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, Config.BaddieTargetRadius, 0, Math.PI*2)
		ctx.closePath();
		ctx.strokeStyle = 'red';
		ctx.stroke();
            
            ctx.beginPath();
		ctx.arc(this.x, this.y, Config.PlayerRadius, 0, Math.PI*2);
		ctx.closePath();
		ctx.strokeStyle = 'blue';
		ctx.stroke();
	
      },

	fire: function(scene){
		var currentTime = Date.now();
		if(currentTime - this.lastFire > Config.PlayerFireInterval && this.barrel.ammo && !this.barrel.reloading){
			this.barrel.fire();
			var bulletOffset = new ex.Vector(30/4, 0);
			bulletOffset = bulletOffset.rotate(this.gun.rotation, ex.Vector.Zero);
			var bullet = new Bullet(this.gun.getWorldX() + bulletOffset.x, 
                                          this.gun.getWorldY() + bulletOffset.y, 
                                          ex.Vector.fromAngle(this.gun.rotation),
                                          'player');
                                          
                  
			scene.add(bullet);
                  this.scene.camera.shake(2, 2, 150);
			this.lastFire = currentTime;
		}

		if(currentTime - this.lastFire > Config.PlayerFireInterval && this.barrel.ammo === 0){
			Resources.EmptySound.play();
			this.lastFire = currentTime;
		}
	},
      
      takeDamage: function(value){
            this.hit = true;  
            this.lastHit = Date.now();
            value = value || 1;
            
            this.battery.level = Math.max((this.battery.level - value), 0);
            Resources.DamageSound.play();
            if(this.goingRight){
                  this.setDrawing("rightDamage");     
            }
            
            if(this.goingLeft){
                  this.setDrawing("leftDamage");
            }           
      }



});