let config = { 
    type:   Phaser.AUTO,
    width:  900,
    height: 900,
    scene:  [/*Menu,*/ Play/*, GameOver*/],
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyUp, keyDown, keyLeft, keyRight, keySpace;