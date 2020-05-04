class Play extends Phaser.Scene {
    constructor() {
        super("playScene"); //playScene is a Scene
    }

    "use strict";

    preload() {
        this.load.image('lion', './assets/lion_run_custom.png');
        this.load.image('grass', './assets/grass.jpg');
        this.load.image('background', './assets/background.jpg');
        this.load.image('rock', './assets/rock_scaled_custom.png');
        this.load.image('is_it_the_dawn_brigade', './assets/just_a_bird_custom.png');
        this.load.image('claw', './assets/claw.png');
        this.load.image('claw2', './assets/claw2.png');
        this.load.image('zebra', './assets/zebra_new.png');
        this.load.image('mate', './assets/lion_mate_custom.png');
        this.load.image('uglyBastard', './assets/lion_mate_evil.png');
        this.load.image('dad', './assets/lion_dad.png');
        this.load.image('kid', './assets/lion_cub_custom.png');

        this.load.image('healthBar', './assets/Health Bar.png');
        this.load.image('hungerBar', './assets/Hunger Bar.png');
        this.load.image('emptyBar', './assets/Empty Bar.png');

        // load spritesheet
        this.load.spritesheet('attack', './assets/lion_run_attack-Sheet.png', {
            frameWidth: 269,
            frameHeight: 137,
            startFrame: 0,
            endFrame: 9
        });
        this.load.spritesheet('sex', './assets/lion_mating.png', {
            frameWidth: 480,
            frameHeight: 260,
            startFrame: 0,
            endFrame: 16
        });
        this.load.spritesheet('mature', './assets/lion_cub_evo-Sheet.png', {
            frameWidth: 269,
            frameHeight: 137,
            startFrame: 0,
            endFrame: 13
        });
        this.load.spritesheet('evil_lion', './assets/lion_mate_evil_attack-Sheet.png', {
            frameWidth: 269,
            frameHeight: 148,
            startFrame: 0,
            endFrame: 6
        });
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
        this.player = new Player(this, 300, 69, 'lion', 0, 600, 100).setOrigin(0, 0);
        this.physics.world.enable(this.player);
        this.player.setGravityY(6969);
        this.player.setBounce(0);

        //create ground
        this.ground = this.physics.add.sprite(0, 900, 'grass').setOrigin(0, 0);
        this.ground.displayWidth = this.sys.game.config.width;
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
        this.mate = new Fucker(this, game.config.width + (420 * 30), 690, 'mate', 0, 'good').setOrigin(0, 0);
        this.physics.world.enable(this.mate);
        this.mate.setImmovable();

        //create ugly bastard
        this.uglyBastard = new Fucker(this, game.config.width + 177031, 1690, 'uglyBastard', 0, 'ntr').setOrigin(0, 0); //690 height when on screen
        this.physics.world.enable(this.uglyBastard);
        this.uglyBastard.setImmovable();

        //create attack
        this.claw = new Attack(this, 400, 1690, 'claw', this.player).setOrigin(0, 0);
        this.claw2 = new Attack(this, 400, 1690, 'claw2', this.player).setOrigin(0, 0);
        this.claw3 = new Attack(this, 400, 1690, 'claw2', this.player).setOrigin(0, 0);

        //create food
        this.zebra = new Food(this, game.config.width + 3000, 660, 'zebra', 0, 30).setOrigin(0, 0);

        //create dad and kid
        this.dad = this.add.sprite(100, 1700, 'dad').setOrigin(0, 0); //100, 700 while on screen
        this.kid = this.add.sprite(100, 1790, 'kid').setOrigin(0, 0); //100, 790 while on screen

        //create collision
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.rock, this.checkCollision, null, this);
        this.physics.add.collider(this.player, this.bird, this.checkCollision, null, this);
        this.physics.add.collider(this.player, this.mate, this.checkCollision, null, this);
        this.physics.add.collider(this.player, this.uglyBastard, this.checkCollision, null, this);

        //create lifebar
        this.emptyBar = this.add.sprite(350, 100, 'emptyBar').setOrigin(0.5);
        this.healthBar = this.add.sprite(350, 100, 'healthBar').setOrigin(0.5);

        //create hunger bar
        this.emptyBar2 = this.add.sprite(1200, 100, 'emptyBar').setOrigin(0.5);
        this.hungerBar = this.add.sprite(1200, 100, 'hungerBar').setOrigin(0.5);

        //create lifespan bar and stats
        var lifeTextConfig = {
            title: {
                fontFamily: 'Courier',
                fontSize: '36px',
                color: '#FFFFFF',
                align: 'left',
            },
            text: {
                fontFamily: 'Courier',
                fontSize: '28px',
                color: '#FFFFFF',
                align: 'left',
            }
        }
        this.lifeTitle = this.add.text(100, 40, "Health", lifeTextConfig.title);
        this.lifeText = this.add.text(110, 90, this.player.life, lifeTextConfig.text);

        //create hunger stats
        var hungerTextConfig = {
            title: {
                fontFamily: 'Courier',
                fontSize: '36px',
                color: '#FFFFFF',
                align: 'left',
            },
            text: {
                fontFamily: 'Courier',
                fontSize: '28px',
                color: '#FFFFFF',
                align: 'left',
            }
        }
        this.hungerTitle = this.add.text(1320, 40, "Hunger", hungerTextConfig.title);
        this.hungerText = this.add.text(1390, 90, this.player.hunger, hungerTextConfig.text);

        // animation config
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('attack', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        this.anims.create({
            key: 'fucking',
            frames: this.anims.generateFrameNumbers('sex', {
                start: 0,
                end: 16,
                first: 0
            }),
            frameRate: 30
        });

        this.anims.create({
            key: 'grow',
            frames: this.anims.generateFrameNumbers('mature', {
                start: 0,
                end: 13,
                first: 0
            }),
            frameRate: 13
        });

        this.anims.create({
            key: 'lion_ntr',
            frames: this.anims.generateFrameNumbers('evil_lion', {
                start: 0,
                end: 6,
                first: 0
            }),
            frameRate: 12
        });
    }

    update() {
        this.background.tilePositionX += 12;
        this.player.update();
        this.rock.update();
        this.bird.update();
        this.claw.update();
        this.zebra.update();
        this.mate.update();
        this.uglyBastard.update()

        //hungerBar updates based on food
        this.hungerBarUpdate(this.player, this.hungerBar, this.hungerText);

        //healthBar updates based on playtime + collision
        this.healthBarUpdate(this.player, this.healthBar, this.lifeText);

        if (this.checkClawCollision(this.claw, this.zebra)) {
            this.sound.play('claw_hit');
            this.player.feed(20);
            this.hungerBarUpdate(this.player, this.hungerBar, this.hungerText);
            this.zebra.reset();
        }
        if (this.checkClawCollision(this.claw, this.uglyBastard)) {
            this.sound.play('claw_hit');
            this.uglyBastard.reset();
        }

        if (this.checkClawCollision(this.claw, this.bird)) {
            this.sound.play('claw_hit');
            this.player.feed(5);
            this.hungerBarUpdate(this.player, this.hungerBar, this.hungerText);
            this.bird.reset();
        }

        if (this.player.isDead()) {
            //player dead
            this.scene.start("gameOverScene");
        }

        this.healthBarUpdate(this.player, this.healthBar, this.lifeText);
        this.hungerBarUpdate(this.player, this.hungerBar, this.hungerText);
    }

    healthBarUpdate(player, bar, barText) {
        if (player.life <= player.maxLife && player.life >= 0) {
            barText.text = Math.round(player.life);
            bar.setScale(player.life / player.maxLife, 1);
            bar.setPosition(350 - ((player.maxLife - player.life) / 2), 100);
        }
    }

    hungerBarUpdate(player, bar, barText) {
        if (player.hunger <= player.maxHunger && player.hunger >= 0) {
            barText.text = Math.round(player.hunger);
            bar.setScale(player.hunger / player.maxHunger, 1);
            bar.setPosition(1200 + ((player.maxHunger - player.hunger) * 2.5), 100);
        }
    }

    checkClawCollision(claw, object) {
        // simple AABB checking
        if (claw.x < object.x + object.width &&
            claw.x + claw.width > object.x &&
            claw.y < object.y + object.height &&
            claw.height + claw.y > object.y) {
            return true;
        } else {
            return false;
        }
    }

    checkCollision(player, object) {
        if (!player.isInvincible()) {
            switch (object.type) {
                case "rock":
                    if (player.body.touching.right) {
                        //necessary to prevent multi-collision bug
                        player.beInvincible();
                        player.takeDamage(30);
                        this.sound.play('got_hit');
                        this.healthBarUpdate(this.player, this.healthBar, this.lifeText);
                        player.beInvincible();
                        this.time.delayedCall(100, () => {
                            player.dontBeInvincible();
                        }, null, this);
                    }
                    break;
                case "bird":
                    if (player.body.touching.right || player.body.touching.up) {
                        player.takeDamage(20);
                        this.sound.play('got_hit');
                        this.healthBarUpdate(this.player, this.healthBar, this.lifeText);
                        //is it the dawn brigade?
                        let dawnBiga = Math.floor(Math.random() * Math.floor(2)); // 0 or 1
                        if(dawnBiga == 0){
                            this.sound.play('dawn_brigade');
                        }
                        else{
                            this.sound.play('just_a_bird');
                        }
                        //necessary to prevent multi-collision bug
                        player.beInvincible();
                        this.time.delayedCall(100, () => {
                            player.dontBeInvincible();
                        }, null, this);
                    }
                    break;
                case "good":
                    //code for fucking, play animation
                    player.alpha = 0; // make player invisible
                    player.beInvincible(); // make player invincible
                    let fuck = this.add.sprite(player.x, 600, 'sex').setOrigin(0, 0);
                    fuck.anims.play('fucking'); // play fucking animation
                    this.sound.play('yamete');
                    //remove player from screen for a bit
                    player.y = 10000;
                    fuck.on('animationcomplete', () => { // callback after animation completes
                        player.y = 600; // reset player position
                        player.alpha = 1; // make player visible again
                        fuck.destroy(); // remove explosion sprite

                        //dad and kids show up on screen
                        this.dad.y = 700;
                        this.kid.y = 790;

                        player.dontBeInvincible(); // remove i-frames;
                        this.rock.reset();
                        this.bird.reset();
                    });

                    //old mate goes off screen
                    this.mate.y = 1690;
                    //ugly bastard comes on screen
                    this.uglyBastard.y = 690;
                    this.uglyBastard.x = game.config.width + (420 * 30);

                    raiseKid = this.time.delayedCall(25000, () => {
                        this.newGeneration();
                    }, null, this);
                    //25 seconds until maturity
                    break;
                case "ntr":
                    if (player.body.touching.right) {
                        //kill the kids and get ntred
                        player.beInvincible();
                        let ntr = this.add.sprite(player.x, 600, 'evil_lion').setOrigin(0, 0);
                        ntr.anims.play('lion_ntr');
                        this.claw2.x = 100;
                        this.claw3.x = 100;
                        this.claw2.y = 700;
                        this.claw3.y = 790;
                        this.sound.play('claw_hit');
                        this.uglyBastard.reset();
                        ntr.on('animationcomplete', () => { // callback after animation completes
                            ntr.destroy(); // remove explosion sprite

                            //remove dad and kids
                            this.dad.y = 1700;
                            this.kid.y = 1790;
                            this.claw2.y = 1700;
                            this.claw3.y = 1790;

                            //code for fucking, play animation
                            player.alpha = 0; // make player invisible
                            let fuck = this.add.sprite(player.x, 600, 'sex').setOrigin(0, 0);
                            fuck.anims.play('fucking'); // play fucking animation
                            this.sound.play('yamete');
                            //remove player from screen for a bit
                            player.y = 10000;
                            fuck.on('animationcomplete', () => { // callback after animation completes
                                player.y = 600; // reset player position
                                player.alpha = 1; // make player visible again
                                fuck.destroy(); // remove explosion sprite

                                //dad and kids show up on screen
                                this.dad.y = 700;
                                this.kid.y = 790;

                                player.dontBeInvincible(); // remove i-frames;

                                raiseKid.remove();
                                raiseKid = this.time.delayedCall(25000, () => {
                                    this.newGeneration();
                                }, null, this);
                                this.uglyBastard.reset();
                                this.rock.reset();
                                this.bird.reset();
                            });
                        });

                    }
                    break;
            }
        }
    }

    newGeneration() {
        //growth cutscene
        this.kid.y = 1790; //move kid offscreen
        this.dad.y = 1700; //move dad offscreen
        this.player.alpha = 0;
        this.player.beInvincible();
        let evolve = this.add.sprite(this.kid.x, 750, 'mature').setOrigin(0, 0);
        evolve.anims.play('grow'); // play animation
        this.sound.play('mushroom');
        evolve.on('animationcomplete', () => { // callback after animation completes
            evolve.destroy(); // remove explosion sprite
            this.player.alpha = 1;
            //reset mate
            this.mate.x = game.config.width + (420 * 69);
            this.mate.y = 690;
            //reset obstacles
            this.rock.reset();
            this.bird.reset();
            //reset zebra
            this.zebra.reset();
            //move ntr lion offscreen
            this.uglyBastard.y = 1690;
            this.uglyBastard.x = game.config.width + (420 * 30);
            this.player.dontBeInvincible();
        });
        //max out hunger and lifespan
        this.player.reset();

    }
}