class Rock extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, lifespanValue){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.lValue = lifespanValue;
    }

    update(){
        if(this.x >= 0){
            this.x -= 1;
        } else {
            this.x = game.config.width;
        }
    }
}