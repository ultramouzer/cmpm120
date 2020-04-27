class Food extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, rocket, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing, displayList, updateList
    }

    update() {
        if(this.x >= -400){
            this.x -= 10;
        } else {
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
    }
}