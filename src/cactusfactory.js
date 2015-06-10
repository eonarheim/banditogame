


var Cactus = ex.Actor.extend({
  
   cactusType: 0,
   constructor: function(x, y, cactusType){
      ex.Actor.apply(this, [x, y, Config.CactusWidth, Config.CactusHeight]);
      this.cactusType = cactusType === undefined ? Math.floor(Math.random() * 3) : cactusType;
      this.collisionType = ex.CollisionType.Fixed;

   },
   
   onInitialize: function(){
      
      var sprite = Resources.Cactii[this.cactusType].asSprite();
      sprite.flipHorizontal = Math.random() > .5 ? true : false;
      sprite.scale.setTo(4, 4);
      this.addDrawing("default", sprite);
      
      this.anchor.setTo(.5, Config.Cactii[this.cactusType].anchory);
      this.setWidth(Config.Cactii[this.cactusType].width);
      this.setHeight(Config.Cactii[this.cactusType].height);
   },

   update: function(engine, delta){
      ex.Actor.prototype.update.apply(this, [engine, delta]);
      this.setZIndex(this.y);
   }
});


var CactusFactory = function(){


}





