let config = {
    type: Phaser.AUTO,
    width: 680,
    height: 400,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);