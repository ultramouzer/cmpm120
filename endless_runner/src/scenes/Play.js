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
        this.load.image('claw', './assets/claw.png');
        this.load.image('zebra', './assets/zebra_scaled.png');
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
        this.player = new Player(this, 300, 69, 'lion', 0, 1000, 100).setOrigin(0, 0);
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
        
        //create bird
        this.bird = new Obstacle(this, game.config.width + 990, 300, 'bird', 0, 30).setOrigin(0, 0);
        this.physics.world.enable(this.bird);
        this.bird.setImmovable();
        
        //create attack
        this.claw = new Attack(this, 400, 1690, 'claw').setOrigin(0, 0);

        //create food
        this.zebra = new Food(this, 400, 690, 'zebra', 0 , 30).setOrigin(0, 0);

        //create collision
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.rock, this.checkCollision, null, this);
        this.physics.add.collider(this.player, this.bird, this.checkCollision, null, this);

        //create lifespan stats
        let lifeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 500
        }
        this.lifeText = this.add.text(100, 100, this.player.life, lifeConfig);

        //create hunger stats
        let hungerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#CC0000',
            color: '#843605',
            align: 'right',
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 500
        }
        this.hungerText = this.add.text(1000, 100, this.player.hunger, hungerConfig);
    }

    update() {
        this.background.tilePositionX += 12;
        this.player.update();
        this.rock.update();
        this.bird.update();
        this.claw.update();
        this.zebra.update();

        if(this.checkFoodCollision(this.claw, this.zebra)){
            console.log("zebra got hit");
            this.zebra.reset();
        }
    }

    checkFoodCollision(claw, food) {
        // simple AABB checking
        if (claw.x < food.x + food.width && 
            claw.x + claw.width > food.x && 
            claw.y < food.y + food.height &&
            claw.height + claw.y > food. y) {
                return true;
        } else {
            return false;
        }
    }

    checkCollision(player, object) {
        if(object == this.rock && this.player.body.touching.right){
            console.log("The lion has collided with a rock!");
            this.player.life -= 30;
            this.lifeText.text = this.player.life;
        } else if (object == this.bird && this.player.body.touching.right){
            console.log("The lion has collided with a bird!");
            this.player.life -= 20;
            this.lifeText.text = this.player.life;
        }
    }
}