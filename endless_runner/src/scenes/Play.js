class Play extends Phaser.Scene {
    constructor() {
        super("playScene");//playScene is a Scene
    }

    preload() {
        //no assets yet
        this.load.image('lion', './assets/lion.png');
        this.load.image('grass', './assets/grass.jpg')
    }

    create() {
        // define keys
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //create player
        this.player = new Player(this, game.config.width/2 - 8, 0, 'lion').setOrigin(0, 0);
        this.physics.world.enable(this.player);
        this.player.setGravityY(6969);
        
        //create ground
        this.ground = this.physics.add.sprite(0, 700, 'grass').setOrigin(0, 0);
        this.ground.displayWidth=this.sys.game.config.width;
        this.ground.setImmovable();
        
        //create collision
        this.physics.add.collider(this.player, this.ground);
    }

    update() {
        this.player.update();
    }
}