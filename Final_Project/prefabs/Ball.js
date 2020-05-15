class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame,) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing, displayList, updateList
        this.scale = 1;
        this.limit = 100
    }

    update() {
        if(keyUp.isDown && this.limit < 200){
            this.limit += 10;
            this.scale += 0.1;
            this.setScale(this.scale);
        }
        if(keyDown.isDown && this.limit > 50){
            this.limit -= 10;
            this.scale -= 0.1;
            this.setScale(this.scale);
        }
        if(keyLeft.isDown){
            this.x -= 10;
        }
        if(keyRight.isDown){
            this.x += 10;
        }
    }
}