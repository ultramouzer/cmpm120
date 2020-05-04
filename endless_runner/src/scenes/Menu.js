class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");//menuScene is a Scene
    }

    preload() {
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('claw_whiff','./assets/main6a_Sword_Woosh.wav');
        this.load.audio('claw_hit','./assets/main44_Sword_Sweetspot.wav');
        this.load.audio('got_hit','./assets/main2d.wav');
        this.load.audio('jump', './assets/mario_jump_cut.wav');
        this.load.audio('yamete', './assets/Filthy_Frank_YAMETE_custom.wav');
        this.load.audio('dawn_brigade', './assets/is_it_the_dawn_brigade.wav');
        this.load.audio('just_a_bird', './assets/it_was_just_a_bird.wav');
        this.load.audio('mushroom', './assets/Mario_Mushroom.wav');
    }

    create() {
        // menu display
        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            backgroundColor: '#177013',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer*4, 'Untitled Lion Game', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#420690';
        menuConfig.color = '#FFFFFF';
        this.add.text(centerX, centerY - textSpacer*3, 'Press up to jump', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - textSpacer*2, 'Press -> for sideways attack', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - textSpacer, 'Press down for downwards attack', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Don\'t get hit by Rocks and Birds', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer,'Attack the Zebras and Birds for food to refill hunger', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer*2,'Raise a family and attack other lions to defend your pride', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer*3,'If you run out of life or hunger, game over', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer*4,'Press -> to start', menuConfig).setOrigin(0.5);

        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRight)) {
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }
}