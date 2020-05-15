class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");//playScene is a Scene
    }

    preload() {

    }

    create() {
        // define keys
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        
    }
}