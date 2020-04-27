class Obstacle extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, lifespanValue){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.lValue = lifespanValue;
    }

    update(){
        if(this.x >= -400){
            this.setVelocityX(-1500);
        } else {
            this.x = game.config.width;
        }
    }
}