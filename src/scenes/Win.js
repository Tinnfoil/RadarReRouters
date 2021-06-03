
class Win extends Phaser.Scene{
    constructor(){
        super("winScene");
    }

    preload() {
    }

    create() {
        //this.cameras.main.pan(gameWidth/2, gameHeight/2, 0);
        this.winScreen = this.add.sprite(0, 0, 'winscreen').setOrigin(0, 0);

        this.returnButton = this.add.sprite(game.config.width/2, game.config.height/3, 'returnbutton');
        this.returnButton.setInteractive();

        this.returnButton.on('pointerover', () => { this.returnButton.alpha = .5;});
        this.returnButton.on('pointerout', () => { this.returnButton.alpha = 1;});
        this.returnButton.on('pointerdown', () => { this.scene.start('menuScene');});
    }

    update() {

    }
}


