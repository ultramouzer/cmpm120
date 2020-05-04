// Edmund Liang
// Herald Hamor
// Untitled Lion Game
// 5/4/2020 2:10 AM
// Technically interesting. 
// Game creates an illusion of player creating and raising 
// a child and playing as the new child once it reaches maturity.
// Some mechanics are themed around lions, including
// enemy male lions who will try to kill the male lion
// and steal his girl (you).
// Used timers and collision checks liberally.
// Created lifebars that update and tick-down in real-time.
let config = { 
    type:   Phaser.AUTO,
    width:  1600,
    height: 900,
    scene:  [Menu, Play, GameOver],
    physics:{
        default:'arcade',
        arcade:{debug:false}
    }
}

let game = new Phaser.Game(config);
let highScore = 0;
// define game settings
game.settings = {
    //spaceshipSpeed: 3,
    //gameTimer: 60000    
}

// reserve keyboard vars
let keyUp, keyDown, keyLeft, keyRight, keySpace;

// reserver timer var
let raiseKid;