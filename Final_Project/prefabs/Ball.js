class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame,) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing, displayList, updateList
        this.scale = 1;
        this.limit = 500
        this.isInvincible = false;
    }

    update() {
        /*if(keyUp.isDown && this.limit < 200){
            this.grow();
        }
        if(keyDown.isDown && this.limit > 50){
            this.shrink();
        }*/

        if(keyLeft.isDown){
            this.x -= 10;
        }
        if(keyRight.isDown){
            this.x += 10;
        }
    }

    grow(){
        this.limit += 10;
        this.scale += 0.1;
        this.setScale(this.scale);
    }

    shrink(){
        this.limit -= 10;
        this.scale -= 0.1;
        this.setScale(this.scale);
    }
}