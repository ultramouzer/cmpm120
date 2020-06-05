class Play extends Phaser.Scene {
    constructor() {
        super("playScene");//playScene is a Scene
    }

    preload() {
        //Load art
        this.load.image('player', './Assets/Art/RaindropPlayer.png');
        this.load.image('token', './Assets/Art/RaindropTokenSmall.png');
        this.load.image('wall', './Assets/Art/Wall.png');
        this.load.image('sky', './Assets/Art/Rainy_Sky.png');
        this.load.image('cloud', './Assets/Art/Cloud.png');
        this.load.image('fog', './Assets/Art/Fog.png');

        //Load sound
        this.load.audio('sfx_absorb', './Assets/Sounds/protoAbsorb.wav');
        this.load.audio('sfx_purge', './Assets/Sounds/protoPurge.wav');
    }

    create() {
        //define keys
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //create temporary stars (will replace later on)
        this.sky = this.add.tileSprite(0, 0, 800, 720, 'sky').setOrigin(0,0);

        //create background clouds
        this.cloud1 = new Cloud(this, 200, 400, 'cloud', 5);
        this.physics.world.enable(this.cloud1);
        this.cloud1.setDragX(100);
        this.cloud1.setDragY(100);
        this.cloud1.setMaxVelocity(50,50);
        this.cloud1.setImmovable();

        this.cloud2 = new Cloud(this, 400, 200, 'cloud', 5);
        this.physics.world.enable(this.cloud2);
        this.cloud2.setDragX(100);
        this.cloud2.setDragY(100);
        this.cloud2.setMaxVelocity(50,50);
        this.cloud2.setImmovable();

        this.cloud3 = new Cloud(this, 600, 600, 'cloud', 5);
        this.physics.world.enable(this.cloud3);
        this.cloud3.setDragX(100);
        this.cloud3.setDragY(100);
        this.cloud3.setMaxVelocity(50,50);
        this.cloud3.setImmovable();

        //create player
        this.player = new Ball(this, game.config.width / 2, 250, 'player');
        this.physics.world.enable(this.player);
        this.player.setDragY(100);
        this.player.setDragX(100);
        this.player.setMaxVelocity(400, 400);
        this.player.setImmovable();

        //create tokens
        this.tokens = this.physics.add.group({
            defaultKey: 'token',
            runChildUpdate: true
        });    

        //initial generation of tokens
        for(var i = 0; i < game.settings.maxTokens; i++){
            this.generateTokens(Phaser.Math.RND.between(200, 600), game.config.height);
        }

        this.physics.world.enable(this.tokens);

        //create temporary rectangles (will replace with a tilemap later on)
        /*this.leftRect = this.physics.add.image(game.config.width / 8, 0, 'wall').setOrigin(0,0);
        this.rightRect = this.physics.add.image(game.config.width * 7 / 8, 0, 'wall').setOrigin(0,0);
        this.leftRect.setImmovable();
        this.rightRect.setImmovable();*/

        //create fog
        //this.fog = this.physics.add.image(480, 360, 'fog');
        this.fog = new Fog(this, 480, 360, 'fog', 10);
        this.physics.world.enable(this.fog);
        this.fog.setDragX(100);
        this.fog.setDragY(100);
        this.fog.setMaxVelocity(50,50);
        this.fog.setImmovable();

        //create colliders
        this.physics.add.collider(this.player, this.tokens, this.tokenCollision, null, this);
        this.physics.add.collider(this.player, this.leftRect);
        this.physics.add.collider(this.player, this.rightRect);
    }

    update() {
        //updates for prefabs
        this.player.update();
        this.tokens.preUpdate();
        this.cloud1.update();
        this.cloud2.update();
        this.cloud3.update();
        this.fog.update();

        //stars movement
        this.sky.tilePositionY -= 3 * game.global.timeDilation;

        //if player has destroyed a token then game will spawn one in
        if(game.global.destroyedToken){
            console.log("Respawning tokens!");
            console.log(this.tokens.countActive() + 1);
            while(this.tokens.countActive() < game.settings.maxTokens){
                this.generateTokens(Phaser.Math.RND.between(200, 600), game.config.height);
            }
            game.global.destroyedToken = false;
        }

        //check for win condition
        if(this.player.getGrowth() >= 4000){
            this.scene.start('CutsceneScene');
            //this.scene.start('menuScene');
        }
    }

    //generates a token at a random location
    generateTokens(x, y){
        y = y + 400 * Math.random();
        this.aToken = new Token(this, x, y, 'token', 0);
        this.physics.world.enable(this.aToken);
        this.aToken.setDragY(100);
        this.aToken.setDragX(100);
        this.aToken.setMaxVelocity(500, 500);
        this.tokens.add(this.aToken);
    }

    //collision with token
    tokenCollision(player, object){
        console.log("Collided with a token!");
        this.sound.play('sfx_absorb');
        this.sound.setVolume(0.05);
        this.sound.rate = 1 - ((1 - game.global.timeDilation) / 2);
        object.destroy();
        object.reset();
        game.global.destroyedToken = true;
        player.grow();
        this.timeDilation();
    }

    //time dilation management 
    //guide: (1 is normal speed, 0 is full freeze, 2 is 2x speed)
    timeDilation(){
        if(game.global.timeDilation < 10){//set maximum speed here
            console.log("Beginning time dilation!");
            game.global.timeDilation += 0.2;
            console.log(game.global.timeDilation);
        } else {
            console.log("Max time dilation reached!");
        }
    }
    //random text
}
