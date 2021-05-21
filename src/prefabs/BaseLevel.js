class BaseLevel extends Phaser.GameObjects.GameObject{
    constructor(scene, exitX = gameWidth, exitY = -gameHeight) {
        super(scene); 
        this.scene = scene;
        this.ObjectiveList = new Phaser.Structs.List(this.scene);
        this.objectiveHoverCount = 0;
        this.EnemyList = new Phaser.Structs.List(this.scene);
        this.ExitPoint = null;

        // get the player's start point from their ending pos
        this.startX = this.scene.playerBoat.x;
        this.startY = this.scene.playerBoat.y;

        // midpoint between player and exit
        this.centerX = this.startX + exitX / 2;
        this.centerY = this.startY + exitY / 2;

        // create the exit from the supplied points
        this.createFinalObjective(this.startX + exitX, this.startY + exitY, 'bum');

        // Get the greater zoom out value from the X and Y axes
        this.zoomLevel = 1;
        let xz = Math.abs(screenWidth  / (exitX + (2 * border)));
        let yz = Math.abs(screenHeight / (exitY - (2 * border))); 

        // Get the top left most point, and the width of the screen
        // based on if the X zoom is greater
        if (xz <= yz) {
            this.originX = Math.min(this.startX, this.startX + exitX) - border;
            this.originY = this.centerY - ((this.centerX - this.originX) / screenRatio);
            this.width   = Math.abs(exitX) + (border * 2);
            this.height  = this.width / screenRatio;
            this.zoomLevel = xz;
        } 
        // based on if the Y zoom is greater
        else { 
            this.originY = Math.min(this.startY, this.startY + exitY) - border;
            this.originX = this.centerX - ((this.centerY - this.originY) * screenRatio);
            this.height  = Math.abs (exitY) + (border * 2);
            this.width   = this.height * screenRatio;
            this.zoomLevel = yz;
        }

        //this.originX = Math.min(this.startX, this.startX + exitX) + border * 2;
        //this.originY = Math.min(this.startY, this.startY);

        this.camera = this.scene.cameras.main;
        this.createLevel();
    }

    // translate the 0 to 1 X screen value to world coords
    // add border to the outside of screens, so enemies can properly
    // exit the screen before coming out on the other side
    toWorldX(xr) {
        return ((this.width + (border * 2)) * xr) + this.originX - border;
    }

    // translate the 0 to 1 Y screen value to world coords
    toWorldY(yr) {
        return ((this.height + (border * 2)) * yr) + this.originY - border;
    }

    createLevel() {
        console.log("No Level to create");
    }

    // start the enemies' path 
    startLevel() {
        for (let i = 0; i < this.EnemyList.length; i++) {
            this.EnemyList.getAt(i).start();
        }
    }

    // stop the enemies
    stopLevel() {
        for (let i = 0; i < this.EnemyList.length; i++) {
            this.EnemyList.getAt(i).stopFollow();
        }
    }

    resetLevel(){
        this.clearLevel();
        this.createLevel();
        this.startLevel();
    }

    clearLevel(){
        for (let i = 0; i < this.ObjectiveList.length; i++) {
            this.ObjectiveList.getAt(i).DestroySelf();
            this.ObjectiveList.removeAt(i);
            i--;
        }
        this.objectiveHoverCount = 0;
            
        for (let i = 0; i < this.EnemyList.length; i++) {
            this.EnemyList.getAt(i).DestroySelf();
            this.EnemyList.removeAt(i);
            i--;
        }

        if(this.ExitPoint != null){
            this.ExitPoint.UnHover();
        }
    }

    createObjective(xr, yr, sfx_key){
        let objectivepoint = new ObjectivePoint(this.scene, this.toWorldX(xr), this.toWorldY(yr), sfx_key);
        this.ObjectiveList.add(objectivepoint);
        this.objectiveHoverCount += 1;
    }

    createFinalObjective(x, y, sfx_key){
        let finalobjectivepoint = new FinalObjectivePoint(this.scene, x, y, sfx_key);
        this.ExitPoint = finalobjectivepoint;
    }

    createEnemy(path, points, speed, delay, sprite, sfx_key){
        // Compute world path from local path coods
        let worldPoints = points;
        for (let i = 0; i < points.length; i++) {
            if (i % 2) {
                worldPoints[i] = this.toWorldY(points[i]);
            } else {
                worldPoints[i] += this.toWorldX(points[i]);
            }
        }
        let enemy = new Enemy(this.scene, path, worldPoints, speed, delay, sprite, sfx_key);
        this.EnemyList.add(enemy);
    }

    checkCollisions(playerBoat){
        for (let i = 0; i < this.ObjectiveList.length; i++) {
            //console.log(Phaser.Math.Distance.BetweenPoints(playerBoat, this.ObjectiveList.getAt(i)), (playerBoat.colRad + this.ObjectiveList.getAt(i).colRad));
            if(Phaser.Math.Distance.BetweenPoints(playerBoat, this.ObjectiveList.getAt(i)) <  playerBoat.colRad + this.ObjectiveList.getAt(i).colRad) 
            {
                console.log("collided with objective");
                this.ObjectiveList.getAt(i).Collect();
                this.ObjectiveList.removeAt(i);
                i--;
            }
        }

        for (let i = 0; i < this.EnemyList.length; i++) {
            if(Phaser.Math.Distance.BetweenPoints( playerBoat, this.EnemyList.getAt(i)) < playerBoat.colRad + this.EnemyList.getAt(i).colRad)
            {
                console.log("collided with enemy boat");
                this.scene.ResetLevel();
            }
        }

        // Win condition
        if(this.ObjectiveList.length == 0){
            
            // Now check for LZ for final objective
            if(Phaser.Math.Distance.BetweenPoints(playerBoat, this.ExitPoint) <  playerBoat.colRad + this.ExitPoint.colRad) 
            {
                this.ExitPoint.Collect();
                this.ExitPoint.DestroySelf();
                this.ExitPoint = null;
                playerBoat.stopFollow();
                this.scene.SetLevel(this.scene.levelNumber+1);
            }
        
        }
    }

    checkHover(mousex, mousey){
        for (let i = 0; i < this.ObjectiveList.length; i++) {
            let obj = this.ObjectiveList.getAt(i);
            if(Math.sqrt(Math.pow(obj.y - mousey,2)+Math.pow(obj.x - mousex,2)) < (this.ObjectiveList.getAt(i).colRad + this.scene.playerBoat.colRad)) 
            {
                console.log("Hovered objective");
                if(this.ObjectiveList.getAt(i).hovered == false){this.objectiveHoverCount -= 1;}
                this.ObjectiveList.getAt(i).Hover();
            }
        }

        // Now check for LZ for final objective
        if(Math.sqrt(Math.pow(this.ExitPoint.y - mousey,2)+Math.pow(this.ExitPoint.x - mousex,2)) < this.scene.playerBoat.colRad + this.ExitPoint.colRad && this.objectiveHoverCount <= 0) 
        {
            this.ExitPoint.Hover();
        }
    }

    updateSFX() {
        for (let i = 0; i < this.EnemyList.length; i++) {
            this.EnemyList.getAt(i).update();
        }
    }
}