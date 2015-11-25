var Gem = ex.Actor.extend({
  
   constructor: function(x, y, gemType){
      ex.Actor.apply(this, [x, y, 16, 16]);
      this.gemType = gemType === undefined ? Math.floor(Math.random() * 4) : gemType;
      this.collisionType = ex.CollisionType.Fixed;

   },
   
   onInitialize: function(){
      
      var sprite = gems.sprites[this.gemType];
      
      //sprite.scale.setTo(4, 4);
      this.addDrawing("default", sprite);
      
      //this.moveTo(this.y + 3).moveTo(this.y).repeatForever();
   },

   update: function(engine, delta){
      ex.Actor.prototype.update.apply(this, [engine, delta]);
      this.setZIndex(this.y);
   }
});