class Cutscene extends Phaser.Scene {
    constructor(){
        super("CutsceneScene");
    }

    "use strict";
    preload() {
        //Load art
        this.load.video('rain', 'Assets/Video/Rainy Day 4k FREE STOCK FOOTAGE.mp4', 'loadeddata', false, true);
        //from Lowell Productions Stock Footage
        //https://www.youtube.com/watch?v=TLUERuTN3AU
    }

    create(){
        var vid = this.add.video(400, 500, 'rain');
        vid.play(true);
    }

    update(){
        //5000 = 5 seconds
        this.time.delayedCall(5000, () => {
            this.scene.start('menuScene');
        }, null, this);
    }
}