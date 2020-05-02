class Food extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, foodValue) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add to existing, displayList, updateList
        this.food = foodValue;
    }

    update() {
        if(this.x >= -400){
            this.x -= 10;
        } else {
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width + 2000 + Math.floor(Math.random() * 1000);
    }
}