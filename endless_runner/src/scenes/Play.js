class Play extends Phaser.Scene {
    constructor() {
        super("playScene");//playScene is a Scene
    }

    preload() {
        //no assets yet
        this.load.image('lion', './assets/lion_run_scaled.png');
        this.load.image('grass', './assets/grass.jpg');
        this.load.image('background', './assets/background.jpg');
        this.load.image('rock', './assets/rock_scaled.png');
        this.load.image('is_it_the_dawn_brigade', './assets/just_a_bird.png');
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
        this.player = new Player(this, 300, 69, 'lion', 0, 1000).setOrigin(0, 0);
        this.physics.world.enable(this.player);
        this.player.setGravityY(6969);
        
        //create ground
        this.ground = this.physics.add.sprite(0, 900, 'grass').setOrigin(0, 0);
        this.ground.displayWidth=this.sys.game.config.width;
        this.ground.setImmovable();

        //create rock
        this.rock = new Obstacle(this, game.config.width, 690, 'rock', 0, 30).setOrigin(0, 0);
        this.physics.world.enable(this.rock);
        this.rock.setImmovable();
        
        //is it the dawn brigade?
        this.bird = new Obstacle(this, game.config.width + 990, 400, 'is_it_the_dawn_brigade', 0, 30).setOrigin(0, 0);
        //no, it was just a bird
        this.physics.world.enable(this.bird);
        this.bird.setImmovable();
        

        //create collision
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.rock, this.checkCollision, null, this);
        this.physics.add.collider(this.player, this.bird, this.checkCollision, null, this);
    }

    update() {
        this.background.tilePositionX += 12;
        this.player.update();
        this.rock.update();
        this.bird.update();
    }

    checkCollision(player, object) {
        if(object == this.rock && this.player.body.touching.right){
            console.log("The lion has collided with a rock!");
            player.life = player.life - 30;
            console.log(player.life);
        } else if (object == this.bird && this.player.body.touching.right){
            console.log("The lion has collided with a bird!");
            player.life = player.life - 20;
            console.log(player.life);
        }
    }
}