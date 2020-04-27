class Attack extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing, displayList, updateList
    }

    update() {
        //attack input
        if(keyRight.isDown) {
            this.x = 600;
            this.y = 800;
        }
        else {
            this.y = 1690;
        }
    }
}