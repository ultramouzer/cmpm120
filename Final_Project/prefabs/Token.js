class Token extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing, displayList, updateList
        this.score = 10;
        this.speed = game.settings.defaultTokenSpeed;
    }

    update(){
        if(game.global.timeDilation >= 0){
            this.body.setVelocityY(-1 * this.speed * game.global.timeDilation);
        } else {
            console.log("Max time dilation has been reached!");
        }

        if(this.y <= 0 - this.height){
            console.log("Replacing token");
            this.reset();
            game.global.destroyedTokens = true;
        }

        if(keyUp.isDown){
            this.body.velocity.y -= 25;
        }

        if(keyDown.isDown){
            this.body.velocity.y += 25;
        }

        if(keyLeft.isDown){
            this.body.velocity.x -= 25;
        }

        if(keyRight.isDown){
            this.body.velocity.x += 25;
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
        this.y = game.config.height + 80 * Math.random();
    }
}
