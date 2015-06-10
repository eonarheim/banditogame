


var Cactus = ex.Actor.extend({
   constructor: function(x, y){
      ex.Actor.apply(this, [x, y, Config.CactusWidth, Config.CactusHeight]);
      
      this.collisionType = ex.CollisionType.Fixed;

   },
   
   onInitialize: function(){
      var cactusPicker = Math.floor(Math.random() * 3);
      var sprite = Resources.Cactii[cactusPicker].asSprite();
      sprite.flipHorizontal = Math.random() > .5 ? true : false;
      sprite.scale.setTo(4, 4);
      this.addDrawing("default", sprite);
      
      this.anchor.setTo(.5, Config.Cactii[cactusPicker].anchory);
      this.setWidth(Config.Cactii[cactusPicker].width);
      this.setHeight(Config.Cactii[cactusPicker].height);
   },

   update: function(engine, delta){
      ex.Actor.prototype.update.apply(this, [engine, delta]);
      this.setZIndex(this.y);
   }
});


var CactusFactory = function(){


}





