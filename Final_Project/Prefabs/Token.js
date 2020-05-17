class Token extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing, displayList, updateList
        this.score = 10;
        this.speed = Math.random(0, game.settings.defaultTokenSpeed);
    }

    update(){
        this.y -= this.speed;

        if(this.y <= 0 - this.height){
            console.log("destroying");
            this.destroy();
            game.settings.destroyedToken = true;
        }
    }

    /*reset(){
        this.x = Math.random(400, 800);
        this.y = game.config.height;
    }*/
}