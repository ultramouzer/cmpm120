class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add to existing, displayList, updateList

    }

    update() {
        //movement
        if(keyLeft.isDown && this.x > 0){
            this.x -= 10;
        }
        if(keyRight.isDown && this.x < game.config.width - 200){
            this.x += 10;
        }
        if(Phaser.Input.Keyboard.JustDown(keyUp) && this.body.touching.down){
            this.airborn = true;
            //code for jump
            this.setVelocityY(-2500);
            //this.airborn = false;
        }
        if(Phaser.Input.Keyboard.JustDown(keyDown) && !this.body.touching.down){
            //code for fast-fall
            //this.airborn = false;
            this.setVelocityY(2500);
        }
        if(this.body.touching.down) {

        }
    }
}