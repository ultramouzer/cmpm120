class Attack extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, player, frame,) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing, displayList, updateList
        this.player = player;
        this.scene = scene;
        this.cooldown = false;
    }

    update() {
        //attack input
        if(keyRight.isDown) {
            this.x = 600;
            this.y = this.player.getY();
        }
        else if (keyDown.isDown) {
            this.x = 500;
            this.y = this.player.getY() + 100;
        }
        else {
            this.y = 1690;
        }
    }
}