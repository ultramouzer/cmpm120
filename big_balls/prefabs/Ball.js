class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame,) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing, displayList, updateList
        this.scale = 1;
    }

    update() {
        if(keyUp.isDown){
            this.scale += 0.1;
            this.setScale(this.scale);
        }
        if(keyDown.isDown){
            this.scale -= 0.1;
            this.setScale(this.scale);
        }
        if(keyLeft.isDown){
            this.x--;
        }
        if(keyRight.isDown){
            this.x++;
        }
    }
}