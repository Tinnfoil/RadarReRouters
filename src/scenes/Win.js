
class Win extends Phaser.Scene{
    constructor(){
        super("winScene");
    }

    preload() {
        this.load.image('winscreen', "Win_Screen.png");
        this.load.image('returnbutton', "Return_Button.png");
    }

    create() {
        this.cameras.main.pan(gameWidth/2, gameHeight/2, 0);
        this.titleScreen = this.add.sprite(0, 0, 'winscreen').setOrigin(0, 0);

        this.startButton = this.add.sprite(game.config.width/2, game.config.height/3, 'returnbutton');
        this.startButton.setInteractive();

        this.startButton.on('pointerover', () => { this.startButton.alpha = .5;});
        this.startButton.on('pointerout', () => { this.startButton.alpha = 1;});
        this.startButton.on('pointerdown', () => { this.scene.start('menuScene');});
    }

    update() {

    }
}


