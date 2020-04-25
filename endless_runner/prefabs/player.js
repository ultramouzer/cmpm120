class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add to existing, displayList, updateList
        this.airborn = false;
    }

    update() {
        //movement
        if(keyLeft.isDown && this.x < game.config.width && !this.airborn){
            this.x -= 3;
        }
        if(keyRight.isDown && this.x > 0 && !this.airborn){
            this.x += 3;
        }
        if(Phaser.Input.Keyboard.JustDown(keyUp) && !this.airborn){
            this.airborn = true;
            //code for jump
            this.airborn = false;
        }
        if(Phaser.Input.Keyboard.JustDown(keyDown) && this.airborn){
            //code for fast-fall
            this.airborn = false;
        }
    }
}