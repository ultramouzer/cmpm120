class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, lifespan, hunger) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add to existing, displayList, updateList

        this.scene = scene;
        this.life = lifespan;
        this.maxLife = lifespan;
        this.hunger = hunger;
        this.maxHunger = hunger;
        this.hasKids = false;
        this.invincible = false;
    }

    isInvincible(){
        return this.invincible;
    }

    beInvincible(){
        this.invincible = true;
    }

    dontBeInvincible(){
        this.invincible = false;
    }

    getY(){
        return this.y;
    }

    pregnant(){
        this.hasKids == true;
    }

    isMother(){
        return this.hasKids;
    }

    feed(value){
        if(value + this.hunger >= this.maxHunger){
            this.hunger = this.maxHunger;
        }
        else {
            this.hunger += value;
        }
    }

    takeDamage(value){
        this.life -= value;
    }

    isDead(){
        if(this.life <= 0 || this.hunger <= 0){
            return true;
        }
    }

    update() {
        //boundries
        this.x = 300;
        this.setVelocityX(0);

        //actions
        if(Phaser.Input.Keyboard.JustDown(keyUp) && this.body.touching.down){
            this.airborn = true;
            //code for jump
            this.scene.sound.play('jump');
            this.setVelocityY(-2500);
            //this.airborn = false;
        }
        if(Phaser.Input.Keyboard.JustDown(keyDown) && !this.body.touching.down){
            //code for fast-fall
            //this.airborn = false;
            this.setVelocityY(2500);
        }

        //decrease lifespan
        this.life -= 0.1;
        //decrease hunger
        this.hunger -= 0.1;
    }

    reset(){
        this.life = this.maxLife;
        this.hunger = this.maxHunger;
    }
}