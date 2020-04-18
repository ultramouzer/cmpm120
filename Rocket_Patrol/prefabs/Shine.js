class Shine extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, rocket, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing, displayList, updateList
        this.isShining = false;

        this.sfxShine = scene.sound.add('sfx_shine');
        this.rocket = rocket;
    }

    update() {
        if(keyD.isDown && !this.isShining) {
            this.sfxShine.play();  // play sfx
            this.isShining = true;
        }
        if(keyD.isDown && this.isShining) {
            this.x = this.rocket.getX() - 18;
            this.y = this.rocket.getY() - 25;
        }
        else if(!keyD.isDown){
            this.x = 1000;
            this.y = 1000;
            this.isShining = false;
        }
    }
}