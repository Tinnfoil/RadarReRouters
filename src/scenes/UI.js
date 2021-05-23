class UI extends Phaser.Scene {
    constructor() {
        super("uiScene");
        Phaser.Scene.call(this, {key: 'uiScene'});
    }

    create() {
        // Draw Go button as fixed UI element
        this.goButton = this.add.image(screenWidth - 128, screenHeight - 96, 'gobutton').setOrigin(0, 0);
        this.goButton.setInteractive();
        //this.goButton.setScrollFactor(0); // fix to camera
        this.goButton.on('pointerdown', () => { this.events.emit('followPath'); });
        this.turnOffGoButton();

        // Draw redo button as fixed UI element
        this.redoButton = this.add.image(screenWidth - 32, screenHeight - 128 - 32, 'restart').setOrigin(0,0);
        this.redoButton.setInteractive();
        //this.redoButton.setScrollFactor(0); // fix to camera
        this.redoButton.on('pointerdown', () => { this.events.emit('resetLevel'); });
        this.goEnabled = false;

    }

    turnOnGoButton(){
        if(this.goButton == null) return;
        this.goEnabled = true;
        this.goButton.alpha = 1;
    }

    turnOffGoButton(){
        if(this.goButton == null) return;
        this.goEnabled = false;
        this.goButton.alpha = .5;
    }
}