class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload() {
        
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

        this.add.text(centerX, centerY - textSpacer, 'Game Over', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#420690';
        menuConfig.color = '#FFFFFF';
        this.add.text(centerX, centerY, 'Press -> to play again', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer,'Press <- to return to title', menuConfig).setOrigin(0.5);

        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRight)) {
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        else if (Phaser.Input.Keyboard.JustDown(keyLeft)) {
            this.sound.play('sfx_select');
            this.scene.start("menuScene");
        }
    }
}