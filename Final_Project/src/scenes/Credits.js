class Credits extends Phaser.Scene {
    constructor(){
        super("creditsScene");
    }

    "use strict";

    preload(){
        this.load.image('sky', './Assets/Art/Rainy_Sky.png');
    }

    create(){

        // add sky
        this.sky = this.add.tileSprite(0, 0, 960, 720, 'sky').setOrigin(0,0);

        // menu text
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: '#383838',
            align: 'center', 
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;

        this.add.text(centerX - 250, centerY - 150, 'Programmed by Edmund Liang and Herald Hamor', menuConfig);
        this.add.text(centerX - 110, centerY - 120, 'Art by Herald Hamor', menuConfig);
        this.add.text(centerX - 280, centerY - 60, 'Video from from Lowell Productions Stock Footage', menuConfig);
        this.add.text(centerX - 240, centerY - 30, 'https://www.youtube.com/watch?v=TLUERuTN3AU', menuConfig);
        this.add.text(centerX - 170, centerY + 30, 'Water drop sound by gkillhour', menuConfig);
        this.add.text(centerX - 300, centerY + 60, 'https://freesound.org/people/gkillhour/sounds/267221/', menuConfig);
        this.add.text(centerX - 130, centerY + 120, 'Rain bgm by pulswelle', menuConfig);
        this.add.text(centerX - 300, centerY + 150, 'https://freesound.org/people/pulswelle/sounds/194204/', menuConfig);
        this.add.text(centerX - 130, centerY + 210, 'Press F to play again', menuConfig);

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