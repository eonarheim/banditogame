


var Cactus = ex.Actor.extend({
   constructor: function(x, y){
      ex.Actor.apply(this, [x, y, Config.CactusWidth, Config.CactusHeight]);

      var spriteSheet = new ex.SpriteSheet(Resources.CactusSpriteSheet, 3, 1, 53, 64);
      var sprite = spriteSheet.sprites[Math.floor(Math.random() * 3)];
      sprite.flipHorizontal = Math.random() > .5 ? true : false;
      sprite.scale.setTo(4, 4);
      this.addDrawing("default", sprite);
      this.collisionType = ex.CollisionType.Fixed;

   },

   update: function(engine, delta){
      ex.Actor.prototype.update.apply(this, [engine, delta]);
      this.setZIndex(this.y);
   }
});


var CactusFactory = function(){


}





