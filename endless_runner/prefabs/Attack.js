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
            //let claw = this.add.sprite(x, y, 'attack').setOrigin(0, 0);
            //claw.anims.play('attack');

            this.x = 600;
            this.y = this.player.getY();
            //this.cooldown = true;

            //claw.on('animationcomplete', () => {    // callback after animation completes
            //    this.cooldown = false;
            //});
        }
        else if (keyDown.isDown) {
            this.x = 500;
            this.y = this.player.getY() + 100;
            //this.cooldown = true;

            //claw.on('animationcomplete', () => {    // callback after animation completes
            //    this.cooldown = false;
            //});
        }
        else {
            this.y = 1690;
        }
    }
}