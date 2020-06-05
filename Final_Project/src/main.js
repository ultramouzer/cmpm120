let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 720,
    scene: [Menu, Play, Cutscene],
    scale: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics:{
        default:'arcade',
        arcade:{debug:false}
    },
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyUp, keyDown, keyLeft, keyRight, keySpace, keyF;

// game settings
game.settings = {
    maxTokens: 4,
    defaultTokenSpeed: 100,
}

game.global = {
    timeDilation: 1,
    destroyedTokens: false,
}