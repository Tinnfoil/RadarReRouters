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
        this.toggleResetButton(false);
        //this.redoButton.setScrollFactor(0); // fix to camera
        this.redoButton.on('pointerdown', () => { this.events.emit('resetLevel'); });
        this.goEnabled = false;

        this.levelNum = this.add.text(screenWidth, screenHeight, 'Level 1').setOrigin(1,1);

        this.exitButton = this.add.text(0, 0, '<- Exit To Title').setOrigin(0);
        this.exitButton.setAlpha(0.25);
        this.exitButton.setInteractive()
        this.exitButton.on('pointerdown', () => { this.events.emit('exitToTitle') });
        this.exitButton.on('pointerover', () => { this.exitButton.scale = 1.1;  this.exitButton.setAlpha(1);});
        this.exitButton.on('pointerout', () => { this.exitButton.scale = 1;  this.exitButton.setAlpha(0.25); });

        this.cameras.main.fadeIn(200);
    }

    setLevelNumber(number){
        if(this.levelNum != null){  
            this.levelNum.text = "Level " + number;
        }
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

    toggleResetButton(on = true){
        if(on){
            this.redoButton.alpha = 1;
        }
        else{
            this.redoButton.alpha = .5;
        }
    }
}