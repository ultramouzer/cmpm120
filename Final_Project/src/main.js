let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 720,
    scene: [/*Menu,*/ Play],
    scale: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyUp, keyDown, keyLeft, keyRight, keySpace;

game.settings = {
    maxTokens: 5,
    defaultTokenSpeed: 2,
    destroyedTokens: false,
}