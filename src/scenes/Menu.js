
class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    create() {
        this.titleScreen = this.add.sprite(0, 0, 'titlescreen').setOrigin(0, 0);

        this.startButton = this.add.sprite(game.config.width/2, game.config.height/3, 'startbutton');
        this.startButton.setInteractive();

        this.startButton.on('pointerover', () => { this.startButton.alpha = .5;});
        this.startButton.on('pointerout', () => { this.startButton.alpha = 1;});
        this.startButton.on('pointerdown', () => { this.scene.start('playScene');});

        if (globalAudio == null) {
            this.scene.launch('globalAudioScene');
            console.log("called");
            this.globalAudio = this.scene.get('globalAudioScene');
            globalAudio = this.globalAudio
        }
    }
}

// init() prepares ant data for the scene
// prefloat() prepares any assets we'll need for the scene
// create() adds objects to the scene
// update() is a loop that runs continuously and llows use to update game objects

