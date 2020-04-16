// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, direction) {
        super(scene, x, y, texture, frame);
  
        scene.add.existing(this); // add to existing, displayList, updateList
        // store pointValue
        this.points = pointValue;
        this.dir = direction;
    }

    update() {
        // move spaceship left or right
        if(this.dir == 'left') {
            this.x -= game.settings.spaceshipSpeed;
        }
        else if(this.dir == 'right'){
            this.x += game.settings.spaceshipSpeed;
        }
        // wraparound from left to right edge
        if(this.x <= 0 - this.width && this.dir == 'left') {
            this.x = game.config.width;
        }
        // wraparound from right to left edge
        if(this.x >= game.config.width - this.width && this.dir == 'right') {
            this.x = 0;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}