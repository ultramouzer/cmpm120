// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
  
        scene.add.existing(this); // add to existing, displayList, updateList
        this.isFiring = false;    // track rocket's firing status

        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= 47) {
                this.x -= 3;
            }
            else if(keyRIGHT.isDown && this.x <= 578) {
                this.x += 3;
            }
        }

        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
        // move rocket left button
        if(keyLEFT.isDown && this.isFiring) {
            this.x -= 1;
        }
        // move rocket right button
        if(keyRIGHT.isDown && this.isFiring) {
            this.x += 1;
        }
        // if fired, move up
        if(this.isFiring && this.y >= 108) {
            this.y -= 2;
        }
        // reset on miss
        if(this.y <= 108) {
            this.isFiring = false;
            this.y = 431;
        }
    }

    // reset rocket
    reset() {
        this.isFiring = false;
        this.y = 431;
    }
}