class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");//menuScene is a Scene
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('sfx_shine', './assets/fox1c_shine.wav');
    }

    create() {
        // menu display
        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            backgroundColor: '#177013',
            color: '#420690',
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

        this.add.text(centerX, centerY - textSpacer*2, 'ROCKET PATROL Bros Melee', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - textSpacer, 'Use <-> arrows to move and (F) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY, 'Press (D) to Shine', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, 'Press <- if you are a game journalist', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer*2,'Press -> otherwise', menuConfig).setOrigin(0.5);

        //this.scene.start("playScene");

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 4500    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
}