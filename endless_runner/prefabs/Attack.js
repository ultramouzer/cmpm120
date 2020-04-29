class Attack extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, player, frame,) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing, displayList, updateList
        this.player = player;
    }

    update() {
        //attack input
        if(keyRight.isDown) {
            this.x = 600;
            this.y = this.player.getY();
        }
        else {
            this.y = 1690;
        }
    }
}