class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, lifespan) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add to existing, displayList, updateList

        this.life = lifespan;

    }

    update() {
        //boundries
        this.x = 300;
        this.setVelocityX(0);

        //actions
        if(Phaser.Input.Keyboard.JustDown(keyUp) && this.body.touching.down){
            this.airborn = true;
            //code for jump
            this.setVelocityY(-2500);
            //this.airborn = false;
        }
        if(Phaser.Input.Keyboard.JustDown(keyDown) && !this.body.touching.down){
            //code for fast-fall
            //this.airborn = false;
            this.setVelocityY(2500);
        }

        //collision
        /*if(this.body.touching.right){
            console.log("rock");
            //code for hitting thing
        }
        if(this.body.touching.up){
            console.log("bird");
            //code for hitting thing
        }*/
    }
}