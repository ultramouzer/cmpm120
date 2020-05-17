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
        this.player = new Ball(this, game.config.width / 2, 250, 'ball');
        this.physics.world.enable(this.player);

        //create tokens
        this.tokens = this.physics.add.group({
            defaultKey: 'token',
            runChildUpdate: true
        });    

        for(var i = 0; i < game.settings.maxTokens; i++){
            this.generateTokens(Phaser.Math.RND.between(200, 600), game.config.height);
        }

        this.physics.world.enable(this.tokens);

        //create temporary rectangles (will replace with a tilemap later on)
        this.add.rectangle(game.config.width / 8,0, 30, 720, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width * 7 / 8, 0, 30, 720, 0xFFFFFF).setOrigin(0,0);
        
        //create colliders
        this.physics.add.collider(this.player, this.tokens, this.tokenCollision, null, this);
    }

    update() {
        this.player.update();
        this.tokens.preUpdate();

        if(game.global.destroyedToken){
            this.generateTokens(Phaser.Math.RND.between(200, 600), game.config.height);
            game.global.destroyedToken = false;
        }
    }

    generateTokens(x, y){
        this.tokens.add(new Token(this, x, y, 'token', 0));
    }

    tokenCollision(player, object){
        console.log("Collided with a token!");
        //object.destroy();
        object.reset();
        game.global.destroyedToken = true;
        player.grow();
        this.timeDilation();
    }

    timeDilation(){
        if(game.global.timeDilation > 0){
            console.log("Beginning time dilation!");
            game.global.timeDilation -= 0.01;
            console.log(game.global.timeDilation);
        } else {
            console.log("Max time dilation reached!");
        }
    }
}