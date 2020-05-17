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
        
        //create colliders
        this.physics.add.collider(this.player, this.tokens, this.tokenCollision, null, this);
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

    tokenCollision(player, object){
        if(!player.isInvincible){
            switch(object.type){
                case "token":
                    console.log("Collided with a token!");
                    object.destroy();
                    game.settings.destroyedToken = true;
                    break;
            }
        }
    }
}