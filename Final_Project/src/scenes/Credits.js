class Credits extends Phaser.Scene {
    constructor(){
        super("creditsScene");
    }

    "use strict";

    create(){
        // Temporary Menu Text 
        // Will replace in future version
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'center', 
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;

        this.add.text(centerX - 200, centerY - 120, 'Programmed by Edmund Liang and Herald Hamor', menuConfig);
        this.add.text(centerX - 125, centerY - 90, 'Art by Herald Hamor', menuConfig);
        this.add.text(centerX - 200, centerY - 30, 'Video from from Lowell Productions Stock Footage', menuConfig);
        this.add.text(centerX - 180, centerY, 'https://www.youtube.com/watch?v=TLUERuTN3AU', menuConfig);
        this.add.text(centerX - 155, centerY + 60, 'Water drop sound by gkillhour', menuConfig);
        this.add.text(centerX - 200, centerY + 90, 'https://freesound.org/people/gkillhour/sounds/267221/', menuConfig);
        this.add.text(centerX - 155, centerY + 150, 'Press F to play again', menuConfig);
        

        // menu controls
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.start('playScene');
        }
    }
}