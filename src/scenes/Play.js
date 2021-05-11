class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image("playerboat", "./assets/Null Sprite.png");
        this.load.image("gobutton", "./assets/TestGoButton.png");
    }

    create() {
        this.cameras.main.setBackgroundColor('#559955')
        // Set up the mouse
        this.mouse = this.input.activePointer;
        this.drawInterval = 0;
        this.lastX = -1000;
        this.lastY = -1000;
        this.mouseFreeze = false;

        // Initialize the path the boat will follow
        this.boatPath = null;

        this.playerBoat = null;

        // Set up graphics for the boat path line
        this.graphics = this.add.graphics({
            x: 0,
            y: 0,
            lineStyle: {
                width: 1,
                color: 0x000000,
                alpha: 1
            },
            fillStyle: {
                color: 0xffffff,
                alpha: 1
            },
        
            add: true
        });

        this.goButton = this.add.sprite(gameWidth - 128, gameHeight - 32, 'gobutton').setOrigin(0, 1);
        this.goButton.setInteractive();
        this.goButton.on('pointerdown', () => { this.FollowPath(); });
    }

    FollowPath(){
        console.log("Called");
        let x = this.boatPath.getStartPoint().x;
        let y = this.boatPath.getStartPoint().y;  
        
        this.playerBoat = this.add.follower(this.boatPath, x, y, 'playerboat').setScale(0.5);
        let pathlength = this.boatPath.getLength();
       
        this.playerBoat.startFollow({
            from: 0,            // points allow a path are values 0–1
            to: 1,
            delay: 0,
            duration: (pathlength * 10) / 2,
            ease: 'Power0',
            hold: 0,
            repeat: -1,
            yoyo: false,
            rotateToPath: true
        });
        this.mouseFreeze = true;
        this.drawInterval = 0;
    }

    update(time, delta) {  
        //var pointer = this.input.activePointer;
        if (this.mouse.isDown && this.drawInterval > 10 && this.mouseFreeze == false) {
            let touchX = this.mouse.x;
            let touchY = this.mouse.y;
            if(this.boatPath == null){
                this.boatPath = this.add.path(touchX, touchY);
                this.lastX = touchX;
                this.lastY = touchY;
            }
            else if(Math.abs(this.lastX - touchX) > 1.5 || Math.abs(this.lastY - touchY) > 1.5){
                console.log("Drawing");
                this.drawInterval = 0;
                this.boatPath.lineTo(touchX, touchY);
                this.boatPath.draw(this.graphics);
                this.lastX = touchX;
                this.lastY = touchY;
            }
        }
        else{
            this.drawInterval += delta;
        }

    }
}