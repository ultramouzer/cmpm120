class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    "use strict";

    preload(){
        this.load.image('sky', './Assets/Art/Rainy_Sky.png');
    }

    create(){
        //background
        this.sky = this.add.tileSprite(0, 0, 960, 720, 'sky').setOrigin(0,0);

        //menu text
        let menuConfig = {
            fontFamily: 'Courier',
            align: 'center', 
            title:{
                fontSize: '48px',
                color: '#383838',
                padding: {
                    top: 5,
                    bottom: 5,
                },
            },
            text:{
                fontSize: '20px',
                color: '#383838',
                padding: {
                    top: 5,
                    bottom: 5,
                },
            },
        }

        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;

        this.add.text(centerX - 110, centerY - 64, 'Raindrop', menuConfig.title);
        this.add.text(centerX - 100, centerY, 'Press "F" to play', menuConfig.text);
        this.add.text(centerX - 150, centerY + 64, 'Use Arrow Keys to blow wind', menuConfig.text);
        this.add.text(centerX - 200, centerY + 94, 'Collect other rain droplets to Grow', menuConfig.text);
        this.add.text(centerX - 140, centerY + 124, 'Grow as large as you can', menuConfig.text);


        // menu controls
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update(){
        this.sky.tilePositionY -= 3;

        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.start('playScene');
        }
    }
}