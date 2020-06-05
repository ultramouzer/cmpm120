//there was nothing in the assignment description to tell me to write this,
//but I was required to for the endless runner so I will do it anyways.
//Edmund Liang
//Heral Hamor
//game name: Raindrop
//6/5/2020
//Creative tilt:
//pixel art was created by Herald Hamor to adhere to our rain theme
//rain theme adheres to the growth/scaling theme because raindrops 
//grow in size when they combine.
//I created a control scheme that I though was interesting, adheres
//to our theme, and didn't make the game a completely boring cakewalk.
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 720,
    scene: [Menu, Play, Cutscene, Credits],
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