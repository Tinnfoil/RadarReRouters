
class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.image('titlescreen', "./assets/Title_Screen.png");
        this.load.image('startbutton', "./assets/Start_Button.png");
        this.load.audio('a_l', './assets/audio/drone_a_l.wav');
        this.load.audio('a_r', './assets/audio/drone_a_r.wav');
        this.load.audio('d_l', './assets/audio/drone_d_l.wav');
        this.load.audio('d_r', './assets/audio/drone_d_r.wav');
    }

    create() {
        this.titleScreen = this.add.sprite(0, 0, 'titlescreen').setOrigin(0, 0);

        this.startButton = this.add.sprite(game.config.width/2, game.config.height/3, 'startbutton');
        this.startButton.setInteractive();

        this.startButton.on('pointerover', () => { this.startButton.alpha = .5;});
        this.startButton.on('pointerout', () => { this.startButton.alpha = 1;});
        this.startButton.on('pointerdown', () => { this.scene.start('playScene');});
    }

    update() {

    }
}

// init() prepares ant data for the scene
// prefloat() prepares any assets we'll need for the scene
// create() adds objects to the scene
// update() is a loop that runs continuously and llows use to update game objects

