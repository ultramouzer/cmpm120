class Play extends Phaser.Scene {
    constructor() {
        super("playScene");//playScene is a Scene
    }

    preload() {
        this.load.image('ball', './assets/Ball.png');
        this.load.image('token', './assets/Token.png');
    }

    create() {
        // define keys
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //create player
        this.player = new Ball(this, 450, 250, 'ball');

        //create tokens
        this.tokens = this.add.group({
            defaultKey: 'token',
            runChildUpdate: true
        });

        this.destroyedToken = false;

        for(var i = 0; i < game.settings.maxTokens; i++){
            this.generateTokens(Phaser.Math.RND.between(200, 600), game.config.height);
        }

        //create temporary rectangles (will replace with a tilemap later on)
        
    }

    update() {
        this.player.update();
        this.tokens.preUpdate();

        if(game.settings.destroyedToken){
            this.generateTokens(Phaser.Math.RND.between(200, 600), game.config.height);
            game.settings.destroyedToken = false;
        }
    }

    generateTokens(x, y){
        this.tokens.add(new Token(this, x, y, 'token' ,0));
    }
}