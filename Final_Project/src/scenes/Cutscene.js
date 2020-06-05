class Cutscene extends Phaser.Scene {
    constructor(){
        super("CutsceneScene");
    }

    "use strict";
    preload() {
        //Load art
        this.load.video('rain', './Assets/Video/Rainy Day 4k FREE STOCK FOOTAGE.mp4', 'loadeddata', false, true);
        this.load.audio('sfx_rain', './Assets/Sounds/raining.wav');
        //from Lowell Productions Stock Footage
        //https://www.youtube.com/watch?v=TLUERuTN3AU
    }

    create(){
        this.music = this.sound.add('sfx_rain');
        var vid = this.add.video(-300, 0, 'rain').setOrigin(0,0);
        this.music.play();
        vid.play(true);
    }

    update(){
        //5000 = 5 seconds
        this.time.delayedCall(6900, () => {
            this.music.stop();
            this.scene.start('creditsScene');
        }, null, this);
    }
}