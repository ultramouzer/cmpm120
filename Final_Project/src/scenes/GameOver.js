class GameOver extends Phaser.Scene {
    constructor(){
        super("GameOverScene");
    }

    "use strict";
    preload() {
        //Load art

    }

    create(){
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
        let centerY = game.config.h
        
        this.add.text(centerX - 125, centerY, 'Press "F" to play again', menuConfig);


        // menu controls
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.start('playScene');
        }
    }
}