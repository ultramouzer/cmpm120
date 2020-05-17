class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame,) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing, displayList, updateList
        this.scale = 1;
        this.growth = 100
        this.isInvincible = false;
    }

    update() {
        /*if(keyUp.isDown && this.limit < 200){
            this.grow();
        }*/
        if(keyDown.isDown && this.growth > 100){
            this.shrink();
        }

        if(keyLeft.isDown){
            this.x -= 10;
        }
        if(keyRight.isDown){
            this.x += 10;
        }
    }

    getGrowth(){
        return this.growth;
    }

    grow(){
        if(this.growth <= 990){
            this.growth += 10;
            this.scale += 0.1;
            this.setScale(this.scale);
        }
    }

    shrink(){
        if(this.growth >= 110){
            this.growth -= 10;
            this.scale -= 0.1;
            this.setScale(this.scale);
        }
    }
}