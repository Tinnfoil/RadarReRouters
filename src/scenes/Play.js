class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image("playerboat", "./assets/Ship_01.png");
        this.load.image("gobutton", "./assets/TestGoButton.png");
        this.load.image("drawfinger", "./assets/TestFinger.png");
        this.load.image("island", "./assets/Island.png");
        this.load.image("enemyboat", "./assets/Ship_02.png");
        this.load.image("backgroundgrid", "./assets/grid.png");
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000')
        this.grid = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'backgroundgrid').setOrigin(0, 0);
        
        // Set up the mouse
        this.mouse = this.input.activePointer;
        this.drawInterval = 0;
        this.lastX = -1000;
        this.lastY = -1000;
        this.mouseFreeze = true;

        // Initialize the path the boat will follow
        this.boatPath = null;

        // Initialize Island
        this.island = this.add.sprite(0, 0, 'island').setOrigin(0, 0);
        this.island.scale = .4;

        // Initialize the gameobject the player will use as the boat
        this.playerBoat = new PlayerBoat(this, null, 64, gameHeight - 64);
        this.playerBoat.setInteractive();
        this.playerBoat.on('pointerdown', () => { this.mouseFreeze = false;});

        // add enemies group for collision detection
        this.enemies = this.add.group();
        // Initialize Enemy Boat
        this.enemies.add(new Enemy(this, null, [
            1000, 300,
            500, 100,
            300, 500,
            -50, 200 
        ], 1, 'enemyboat').setOrigin(0.5));

        // Draw indicator for drawing
        this.drawFinger = this.add.sprite(105, game.config.height - 64, 'drawfinger').setOrigin(0, 0);

        // Set up graphics for the boat path line
        this.graphics = this.add.graphics({
            x: 0,
            y: 0,
            lineStyle: {
                width: 1,
                color: 0xffffff,
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
        
       // this.playerBoat = this.add.follower(this.boatPath, x, y, 'playerboat').setScale(0.5);
        this.playerBoat.path = this.boatPath;
        this.playerBoat.x = x; this.playerBoat.y = y;
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
                this.drawFinger.destroy();
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