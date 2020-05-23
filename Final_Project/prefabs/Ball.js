class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame,) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing, displayList, updateList
        this.scale = 1;
        this.growth = 100;
        this.isInvincible = false;

        this.purgeSound = scene.sound.add('sfx_purge');
    }

    update() {
        // become more difficult to controll the larger you grow
        if(keyUp.isDown){
            //this.y -= 20 * (1/game.global.timeDilation);
            this.body.velocity.y -= 20 * (1/(game.global.timeDilation/2));
        }

        if(keyDown.isDown){
            //this.y += 20 * (1/game.global.timeDilation);
            this.body.velocity.y += 20 * (1/(game.global.timeDilation/2));
        }

        if(keyLeft.isDown){
            //this.x -= 20 * (1/game.global.timeDilation);
            this.body.velocity.x -= 20 * (1/(game.global.timeDilation/2));
        }

        if(keyRight.isDown){
            //this.x += 20 * (1/game.global.timeDilation);
            this.body.velocity.x += 20 * (1/(game.global.timeDilation/2));
        }

        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.shrink();
        }
    }

    getGrowth(){
        return this.growth;
    }

    grow(){
        if(this.growth < 5000){
            this.growth += 20;
            this.scale += 0.2;
            
            this.setScale(this.scale);
        }
        console.log(this.growth);
    }

    shrink(){
        this.purgeSound.play();
        this.scale -= 0.2;
        game.global.timeDilation -= 0.1;
        console.log(game.global.timeDilation);
        this.setScale(this.scale);
    }
}