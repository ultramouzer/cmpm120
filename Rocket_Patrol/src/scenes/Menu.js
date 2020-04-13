class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");//menuScene is a Scene
    }

    create() {
        this.add.text(20,20, "Rocket Patrol Menu");
        this.scene.start("playScene");
    }
}