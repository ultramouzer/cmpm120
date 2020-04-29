class Fucker extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, type){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.type = type;
    }

    update(){
        if(this.x >= -400){
            this.setVelocityX(-1500);
        } else {
            this.x = game.config.width;
        }

        if(this.hostile == "good"){

        }
        else if(this.hostile == "ntr"){
            if(this.body.touching.up){
                this.reset();
            }
        }
    }

    reset(){
        //code for death and respawning
        this.x = game.config.width;
    }
}