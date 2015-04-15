
var Barrel = ex.UIActor.extend({
	frames: [],
	currentFrame: 0,
	reloading: false,
	currentReloadTime: 0,
	ammo: Config.Ammo,
	constructor: function(x, y, engine){
		ex.UIActor.apply(this, [x, y, 32*4, 32*4]);
		this.anchor.setTo(0, 0);
		var barrelSheet = new ex.SpriteSheet(Resources.BarrelSpriteSheet, 7, 1, 32, 32);
		var that = this;
		this.frames = barrelSheet.sprites;

		this.frames.map(function(s, i){
			s.scale.setTo(4, 4);
			that.addDrawing(i, s);
		});
		
	},

	update: function(engine, delta){
		ex.UIActor.prototype.update.apply(this, [engine, delta]);
		if(this.reloading){
			this.currentReloadTime += delta;

			

			if(this.currentReloadTime > (Config.ReloadTime/Config.Ammo)){
				this.ammo++;
				this.currentFrame = Config.Ammo - this.ammo;
				this.currentReloadTime = 0;
				Resources.ReloadSound.play();
			}

			if(this.ammo >= Config.Ammo){
				this.reloading = false;
				this.currentFrame = 0;
				this.currentReloadTime = 0;
			}
		}
		this.setDrawing(this.currentFrame);
	},

	reload: function(){
		if(!this.reloading){
			this.reloading = true;
		}
	},

	fire: function(){
		if(this.currentFrame < 6 && !this.reloading){
			this.currentFrame++;
			this.ammo--;
			Resources.FireSound.play();
		}
	}
})