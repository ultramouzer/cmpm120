class Play extends Phaser.Scene {
    constructor() {
        super("playScene");//playScene is a Scene
    }

    preload() {
        //no assets yet
        this.load.image('lion', './assets/lion_run_scaled.png');
        this.load.image('grass', './assets/grass.jpg')
        this.load.image('background', './assets/background.jpg')
        this.load.image('rock', './assets/rock.jpg')
    }

    create() {
        //background tilesprite
        this.background = this.add.tileSprite(0, 0, 1600, 900, 'background').setOrigin(0, 0);

        // define keys
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //create player
        this.player = new Player(this, 69, 69, 'lion').setOrigin(0, 0);
        this.physics.world.enable(this.player);
        this.player.setGravityY(6969);
        
        //create ground
        this.ground = this.physics.add.sprite(0, 900, 'grass').setOrigin(0, 0);
        this.ground.displayWidth=this.sys.game.config.width;
        this.ground.setImmovable();

        //create rock
        this.rock = new Rock(this, game.config.width, 880, 'rock', 0, 30).setOrigin(0, 0);
        
        //create collision
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.rock);
    }

    update() {
        this.background.tilePositionX += 12;
        this.player.update();
    }
}