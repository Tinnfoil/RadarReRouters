class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000')
        this.grid = this.add.tileSprite(-screenWidth, -screenHeight, screenWidth * 3, screenHeight * 3, 'backgroundgrid').setOrigin(0, 0);
        this.grid.setScrollFactor(0);

        // Set Keyboard controls
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Set up the mouse
        this.mouse = this.input.activePointer;
        this.drawInterval = 0;
        this.lastlastX =  -1;
        this.lastlastY = 1;
        this.lastX = 0;
        this.lastY = 0;
        this.mouseFreeze = true;
        this.drawing = false;

        // Initialize the path the boat will follow
        this.boatPath = null;

        // Initialize Island
        //this.island = this.add.sprite(0, 0, 'island').setOrigin(0, 0);
        //this.island.scale = .4;

        // Initialize the gameobject the player will use as the boat
        this.playerBoat = new PlayerBoat(this, null, border, screenHeight - border);
        this.trailGhost = null; this.lastPointx = 0; this.lastPointy = 0;

        // Create UI Scene
        this.scene.launch('uiScene');
        this.ui = this.scene.get('uiScene');
        this.ui.events.on('followPath', this.FollowPath, this);
        this.ui.events.on('resetLevel', this.ResetLevel, this);

        // Create level and initialize it
        this.levelNumber;
        this.level = this.SetLevel(1);
        this.level.startLevel();

        // For pausing updates while transitioning
        this.isCameraMove = false;

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

    }

    CheckDraw(){
        if(this.boatPath == null){
            this.mouseFreeze = false;
        }
    }

    FollowPath(){
        if(this.boatPath == null || !this.ui.goEnabled){return;}

        if(this.trailGhost != null){
            this.trailGhost.Destroy(); this.trailGhost = null;
        }
        
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
            duration: (pathlength * 15) / 2,
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
        if(this.trailGhost != null){this.trailGhost.Destroy(); this.trailGhost = null;}
        this.playerBoat = new PlayerBoat(this, null, this.level.startX, this.level.startY);
        this.graphics.clear();
        this.mouseFreeze = true;
        this.ui.turnOffGoButton();
        if(this.drawFinger != null){this.drawFinger.destroy();} 
        this.level.resetLevel();
    }

    update(time, delta) {  
        
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.FollowPath();
        }
 
        if (this.mouse.isDown && this.drawInterval <= 0 && this.mouseFreeze == false) {
            let touchVec = this.cameras.main.getWorldPoint(this.mouse.x, this.mouse.y);
            let touchX = touchVec.x;
            let touchY = touchVec.y;
            if(this.boatPath == null){

                this.boatPath = this.add.path(touchX, touchY);
                this.lastX = touchX;
                this.lastY = touchY;
                this.lastlastX = this.lastX - 1;
                this.lastlastY = this.lastY + 1; 
                this.lastPointx = this.boatPath.getStartPoint().x; this.lastPointy = this.boatPath.getStartPoint().y; this.lastPointIndex = 0;
            }
            else if((this.drawing == true && (Math.abs(this.lastX - touchX) > 8 || Math.abs(this.lastY - touchY) > 8)) ||
            (this.drawing == false && (Math.abs(this.lastX - touchX) < 40 && Math.abs(this.lastY - touchY) < 40))){
                if(this.level.checkLandHover(touchX, touchY)){
                    console.log("Drawing");
                    this.graphics.clear()
    
                    this.drawInterval = Math.min(Math.max(Math.abs(this.lastX - touchX) +  Math.abs(this.lastY - touchY) - 16, 2), 8)
    
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
    
                    this.level.checkHover(touchX, touchY);     
                    if(this.drawFinger != null){this.drawFinger.destroy();}     

                    if(this.trailGhost != null){this.trailGhost.PauseFollow()}

                    this.drawing = true;
                }
                else{   // Prompt the player they cant draw near land
                    this.mouse.isDown = false
                }
            }

        }
        else{
            this.drawInterval -= delta;
        }

        if(this.boatPath != null && this.mouse.isDown == false && this.drawing == true){
            if(this.level.ExitPoint.hovered == false){
                this.drawFinger = this.add.sprite(this.boatPath.getEndPoint().x, this.boatPath.getEndPoint().y, 'drawfinger').setOrigin(0, 0);
                if(this.trailGhost == null) {
                    this.createTrailGhost(this.boatPath, 0);
                }
            }
            else{
                this.ui.turnOnGoButton();
            }

            if(this.trailGhost != null){
                this.trailGhost.Follow(this.lastPointx, this.lastPointy , 0);
            }
            this.drawing = false;
        }

        if (!this.isCameraMove) {
            this.level.checkCollisions(this.playerBoat);
        }
        this.level.updateSFX();
        this.playerBoat.update(time, delta); 

    }

    SetLevel(levelnum = null){
        this.levelNumber = levelnum;
        this.lastLevel = this.level; // add reference to current level before transitoning
        switch(levelnum) {
            case 1:
                this.level = new Level1(this);
                break;
            case 2:
                this.level = new Level2(this);
                break;
            case 3:
                this.level = new Level3(this);
                break;
            default:
                this.levelNumber = 1;
                this.level = new Level1(this);
        }
        //this.level.createLevel(); // create new level before transitoning
        this.levelTransition();
        return this.level;
    }

    createTrailGhost(path, interpolation){
        this.trailGhost = new TrailGhost(this, path, path.getStartPoint().x, path.getStartPoint().y, 'playerboat', interpolation);   
    }

    levelTransition() {
        this.ui.turnOffGoButton();
        this.isCameraMove = true;
        if(this.lastLevel != null){
            this.lastLevel.stopLevel();
        }
        this.cameras.main.pan(this.level.centerX, this.level.centerY, 3000, 'Sine.easeInOut', false, this.transistionCallback);
        this.cameras.main.zoomTo(this.level.zoomLevel, 3000, 'Sine.easeInOut');
    }
    
    transistionCallback(cam = null, progress = 0) {
        if(this.lastLevel != null){
            this.lastLevel.updateSFX();
        }
        // update tilesprite
        this.grid.tilePositionX = this.cameras.main.scrollX;
        this.grid.tilePositionY = this.cameras.main.scrollY;
        this.grid.tileScale = this.cameras.main.zoom;
        //console.log (this.cameras.main.scrollX, this.cameras.main.scrollY);
        if (progress == 1) {
            console.log("transition complete");
            this.isCameraMove = false;
            if(this.lastLevel != null){
                this.lastLevel.clearLevel();
                this.lastLevel = null;
                this.ResetLevel();
            }             
        }
    }  
}