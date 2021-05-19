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
        this.load.image("backgroundgrid", "./assets/Grid.png");
        this.load.image("objective", "./assets/TestObjective.png");
        this.load.image("restart",  "./assets/Restart.png");
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000')
        this.grid = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'backgroundgrid').setOrigin(0, 0);
        
        // Set up the mouse
        this.mouse = this.input.activePointer;
        this.drawInterval = 0;
        this.lastlastX =  -1;
        this.lastlastY = 1;
        this.lastX = 0;
        this.lastY = 0;
        this.mouseFreeze = true;

        // Initialize the path the boat will follow
        this.boatPath = null;

        // Initialize Island
        this.island = this.add.sprite(0, 0, 'island').setOrigin(0, 0);
        this.island.scale = .4;

        // Initialize the gameobject the player will use as the boat
        this.playerBoat = new PlayerBoat(this, null, 64, gameHeight - 64);

        // Create level and initialize it
        this.level = new Level1(this);
        this.level.createLevel();

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

        // Draw Go button
        this.goButton = this.add.sprite(gameWidth - 128, gameHeight - 96, 'gobutton').setOrigin(0, 0);
        this.goButton.setInteractive();
        this.goButton.on('pointerdown', () => { this.FollowPath(); });
    
        // Draw redo button
        this.redoButton = this.add.sprite(gameWidth - 32, gameHeight - 128 - 32, 'restart').setOrigin(0,0);
        this.redoButton.setInteractive();
        this.redoButton.on('pointerdown', () => { this.ResetLevel(); });
    }

    CheckDraw(){
        if(this.boatPath == null){
            this.mouseFreeze = false;
        }
    }

    FollowPath(){
        console.log("Start Path");
        let x = this.boatPath.getStartPoint().x;
        let y = this.boatPath.getStartPoint().y;  
        
       // this.playerBoat = this.add.follower(this.boatPath, x, y, 'playerboat').setScale(0.5);
        this.playerBoat.path = this.boatPath;
        //this.playerBoat.path = this.boatCurve;
        this.playerBoat.x = x; this.playerBoat.y = y;
        let pathlength = this.boatPath.getLength();
       
        this.playerBoat.startFollow({
            from: 0,            // points allow a path are values 0–1
            to: 1,
            delay: 0,
            duration: (pathlength * 10) / 2,
            ease: 'Power0',
            hold: 0,
            repeat: 0,
            yoyo: false,
            //rotateToPath: true
        });
        this.mouseFreeze = true;
        this.drawInterval = 0;

        this.playerBoat.sfx.play();
    }

    ResetLevel(){
        if(this.boatPath == null) return;
        //Reset Player Position
        this.boatPath.destroy(); this.boatPath = null;
        this.playerBoat.Destroy();
        this.playerBoat = new PlayerBoat(this, null, 64, gameHeight - 64);
        this.graphics.clear();
        this.mouseFreeze = true;
        this.level.resetLevel();
    }

    update(time, delta) {  
        //var pointer = this.input.activePointer;
 
        if (this.mouse.isDown && this.drawInterval <= 0 && this.mouseFreeze == false) {
            let touchX = this.mouse.x;
            let touchY = this.mouse.y;
            if(this.boatPath == null){

                this.boatPath = this.add.path(touchX, touchY);
                this.boatCurve = new Phaser.Curves.Spline([touchX, touchY]);
                this.lastX = touchX;
                this.lastY = touchY;
                this.lastlastX = this.lastX - 1;
                this.lastlastY = this.lastY + 1;
                
                this.drawFinger.destroy();
            }
            else if(Math.abs(this.lastX - touchX) > 12 || Math.abs(this.lastY - touchY) > 12){
                console.log("Drawing");
                this.graphics.clear()

                this.drawInterval = Math.min(Math.max(Math.abs(this.lastX - touchX) +  Math.abs(this.lastY - touchY) - 16, 4), 17)

                let points = [
                    this.lastX, this.lastY,     // start point
                    (this.drawInterval/17) * ((this.lastX - this.lastlastX)/4 + (touchX - this.lastX)/5) + this.lastX, 
                    (this.drawInterval/17) * ((this.lastY - this.lastlastY)/4 + (touchY - this.lastY)/5) + this.lastY,     // control point
                    touchX, touchY      // end point
                ];
                //console.log(touchX - this.lastX);
                let curve = new Phaser.Curves.QuadraticBezier(points);
                //this.boatPath.lineTo(touchX, touchY);
                this.boatPath.add(curve);
                this.boatPath.draw(this.graphics);

                this.lastlastX = this.lastX;
                this.lastlastY = this.lastY;
                this.lastX = touchX;
                this.lastY = touchY;
                //console.log(this.drawInterval);
            }
        }
        else{
            this.drawInterval -= delta;
        }

        this.level.checkCollisions(this.playerBoat);
        this.level.updateSFX();
        this.playerBoat.update(time, delta);
    }
    
}