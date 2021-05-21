class UI extends Phaser.Scene {
    constructor() {
        super("uiScene");
        Phaser.Scene.call(this, {key: 'uiScene'});
    }
    preload() {
        this.load.image("gobutton", "./assets/TestGoButton.png");
        this.load.image("restart",  "./assets/Restart.png");
    }

    create() {

        // Draw Go button as fixed UI element
        this.goButton = this.add.image(screenWidth - 128, screenHeight - 96, 'gobutton').setOrigin(0, 0);
        this.goButton.setInteractive();
        //this.goButton.setScrollFactor(0); // fix to camera
        this.goButton.on('pointerdown', () => { this.events.emit('followPath'); });

        // Draw redo button as fixed UI element
        this.redoButton = this.add.image(screenWidth - 32, screenHeight - 128 - 32, 'restart').setOrigin(0,0);
        this.redoButton.setInteractive();
        //this.redoButton.setScrollFactor(0); // fix to camera
        this.redoButton.on('pointerdown', () => { this.events.emit('resetLevel'); });
    }
}