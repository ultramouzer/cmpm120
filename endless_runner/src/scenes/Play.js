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
        this.load.image('mate', './assets/lion_good.png');
        this.load.image('uglyBastard', './assets/lion_bad.png');
        this.load.image('dad', './assets/lion_mate.png');
        this.load.image('kid', './assets/lion_cub_scaled.png');
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
        this.rock = new Obstacle(this, game.config.width + 500, 690, 'rock', 0, 30, "rock").setOrigin(0, 0);
        this.physics.world.enable(this.rock);
        this.rock.setImmovable();
        
        //create bird
        this.bird = new Obstacle(this, game.config.width + 2000, 300, 'is_it_the_dawn_brigade', 0, 30, "bird").setOrigin(0, 0);
        this.physics.world.enable(this.bird);
        this.bird.setImmovable();

        //create mate
        this.mate = new Fucker(this, game.config.width + (420*69), 690, 'mate', 0, 'good').setOrigin(0, 0);
        this.physics.world.enable(this.mate);
        this.mate.setImmovable();

        //create ugly bastard
        this.uglyBastard = new Fucker(this, game.config.width + 177031, 1690, 'uglyBastard', 0, 'ntr').setOrigin(0, 0);//690 height when on screen
        this.physics.world.enable(this.uglyBastard);
        this.uglyBastard.setImmovable();

        //create attack
        this.claw = new Attack(this, 400, 1690, 'claw', this.player).setOrigin(0, 0);

        //create food
        this.zebra = new Food(this, 400, 660, 'zebra', 0 , 30).setOrigin(0, 0);

        //create dad and kid
        this.dad = this.add.sprite( 100, 1700, 'dad').setOrigin(0, 0);//100, 700 while on screen
        this.kid = this.add.sprite( 100, 1790, 'kid').setOrigin(0, 0);//100, 790 while on screen

        //create collision
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.rock, this.checkCollision, null, this);
        this.physics.add.collider(this.player, this.bird, this.checkCollision, null, this);
        this.physics.add.collider(this.player, this.mate, this.checkCollision, null, this);
        this.physics.add.collider(this.player, this.uglyBastard, this.checkCollision, null, this);

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
        this.mate.update();
        this.uglyBastard.update();

        if(this.checkClawCollision(this.claw, this.zebra)){
            console.log("zebra got hit");
            this.player.feed(30);
            this.zebra.reset();
        }
        if(this.checkClawCollision(this.claw, this.uglyBastard)){
            console.log("no ntr allowed");
            this.uglyBastard.reset();
        }
        if(this.checkClawCollision(this.claw, this.bird)){
            console.log("bird got hit");
            this.player.feed(10);
            this.bird.reset();
        }
    }

    checkClawCollision(claw, object) {
        // simple AABB checking
        if (claw.x < object.x + object.width && 
            claw.x + claw.width > object.x && 
            claw.y < object.y + object.height &&
            claw.height + claw.y > object. y) {
                return true;
        } else {
            return false;
        }
    }

    checkCollision(player, object) {
        switch(object.type) {
            case "rock":
                if(player.body.touching.right){
                    console.log("The lion has collided with a rock!");
                    this.player.life -= 30;
                    this.lifeText.text = this.player.life;
                }
                break;
            case "bird":
                if(player.body.touching.right){
                    console.log("The lion has collided with a bird!");
                    this.player.life -= 20;
                    this.lifeText.text = player.life;
                }
                break;
            case "good":
                //code for fucking, play animation
                console.log("baby making time");

                //dad and kids show up on screen
                this.dad.y = 700;
                this.kid.y = 790;
                //old mate goes off screen
                this.mate.y = 1690;
                //ugly bastard comes on screen
                this.uglyBastard.y = 690;
                this.uglyBastard.x = game.config.width + (420*30);
                break;
            case "ntr":
                if(player.body.touching.right){
                    //kill the kids and get ntred
                    console.log("you got ntred");
                    this.uglyBastard.reset();
                }
                break;
        }
    }
}