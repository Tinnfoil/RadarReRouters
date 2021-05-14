
class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.image('titlescreen', "./assets/Title_Screen.png");
        this.load.image('startbutton', "./assets/Start_Button.png");
    }

    create() {
        this.titleScreen = this.add.sprite(0, 0, 'titlescreen').setOrigin(0, 0);

        this.startButton = this.add.sprite(game.config.width/2, game.config.height/3, 'startbutton');

        this.scene.start('playScene');  
    }

    update() {
           
    }
}

// init() prepares ant data for the scene
// prefloat() prepares any assets we'll need for the scene
// create() adds objects to the scene
// update() is a loop that runs continuously and llows use to update game objects

