class Obstacle extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, lifespanValue, type){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.lValue = lifespanValue;
        this.type = type;
        this.speed = -1500;
    }

    update(){
        if(this.x >= -400){
            this.setVelocityX(this.speed);
        } else {
            this.reset();
        }
    }

    chooseRandomSpeed(){
        this.speed = -2000 + Math.floor(Math.random() * 1000)
    }

    reset(){
        this.x = game.config.width + Math.floor(Math.random() * 1500);
        this.chooseRandomSpeed();
    }
}