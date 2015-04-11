

var Player = ex.Actor.extend({
	constructor: function(x, y, width, height, color){
		ex.Actor.apply(this, [x, y, width, height, color]);
		var gunSprite =  Resources.GunSprite.asSprite();
		gunSprite.scale.setTo(4, 4);
		this.addDrawing("default", gunSprite);
	},

	update: function(engine, delta){
		ex.Actor.prototype.update.apply(this, [engine, delta]);
		// clear move
		this.dx = 0;
		this.dy = 0;

		// todo find first active pad
		// todo alternate input method needs to be keyboard and mouse
		var pad = engine.input.gamepads.at(1);

		// sticks
		var leftAxisY = pad.getAxes(ex.Input.Axes.LeftStickY);
		var leftAxisX = pad.getAxes(ex.Input.Axes.LeftStickX);
		var rightAxisX = pad.getAxes(ex.Input.Axes.RightStickX);
		var rightAxisY = pad.getAxes(ex.Input.Axes.RightStickY);


		var rightVector = new ex.Vector(rightAxisX, rightAxisY);
		var leftVector = new ex.Vector(leftAxisX, leftAxisY);
		var magnitude = leftVector.distance()

		this.rotation = rightVector.toAngle();

		if(magnitude > .2){
			leftVector = leftVector.normalize();
			this.dx = leftVector.x * Config.PlayerSpeed;
			this.dy = leftVector.y * Config.PlayerSpeed;
		}
	},

	fire: function(){

	}



});