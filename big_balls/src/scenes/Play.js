class Play extends Phaser.Scene {
    constructor() {
        super("playScene");//playScene is a Scene
    }

    preload() {
        this.load.image('temp', './assets/Untitled.png');
    }

    create() {
        // define keys
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //create player
        this.player = new Ball(this, 450, 450, 'temp');
    }

    update() {
        this.player.update();
    }
}