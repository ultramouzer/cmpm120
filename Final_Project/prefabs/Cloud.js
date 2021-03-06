class Cloud extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, speed, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing, displayList, updateList
        this.speed = speed;
    }

    update(){
        if(game.global.timeDilation >= 0){
            this.body.setVelocityY(-2 * this.speed * game.global.timeDilation);
        }

        if(this.y <= 0 - this.height){
            console.log("Replacing cloud");
            this.reset();
            game.global.destroyedTokens = true;
        }

        if(keyUp.isDown){
            this.body.velocity.y -= this.speed;
        }

        if(keyDown.isDown){
            this.body.velocity.y += this.speed;
        }

        if(keyLeft.isDown){
            this.body.velocity.x -= this.speed;
        }

        if(keyRight.isDown){
            this.body.velocity.x += this.speed;
        }

        //wrap around X axis
        if(this.x < 0){
            this.x = game.config.width;
        }
        if(this.x > game.config.width){
            this.x = 0;
        }
    }

    reset(){
        this.x = 800 * Math.random();
        this.y = game.config.height + 10 * Math.random();
    }
}
