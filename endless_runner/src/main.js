let config = { 
    type:   Phaser.AUTO,
    width:  1600,
    height: 900,
    scene:  [Menu, Play, GameOver],
    physics:{
        default:'arcade',
        arcade:{debug:true}
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