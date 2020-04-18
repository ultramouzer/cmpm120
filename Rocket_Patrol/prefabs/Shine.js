class Shine extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing, displayList, updateList
        this.isShining = false;;

        this.sfxRocket = scene.sound.add('fox1c_shine');
    }

    update() {
        if(keyD.isDown) {
            this.x = this.p1Rocket.x;
            this.y = this.p1Rocket.y;
        }
        else if(!keyD.isDown){
            this.x = 1000;
            this.y = 1000;
        }
    }

    reset() {

    }
}