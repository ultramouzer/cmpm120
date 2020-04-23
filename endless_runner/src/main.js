let config = { 
    type:   Phaser.AUTO,
    width:  690,
    height: 900,
    scene:  [Menu, Play],
}

let game = new Phaser.Game(config);
let highScore = 0;
// define game settings
game.settings = {
    //spaceshipSpeed: 3,
    //gameTimer: 60000    
}

// reserve keyboard vars
let keyUP, keyDOWN, keyLEFT, keyRIGHT;