class BaseLevel extends Phaser.GameObjects.GameObject{
    constructor(scene, x = 0, y = 0) {
        super(scene, x, y); 
        this.scene = scene;
        this.ObjectiveList = new Phaser.Structs.List(this.scene);
        this.EnemyList = new Phaser.Structs.List(this.scene);
        this.ExitPoint = null;

        this.x = x;
        this.y = y;

        this.camera = this.scene.cameras.main;

        this.createLevel();
    }

    createLevel(){
        console.log("No Level to create");
    }

    startLevel() {
        for (let i = 0; i < this.EnemyList.length; i++) {
            this.EnemyList.getAt(i).start();
        }
    }

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
            
        for (let i = 0; i < this.EnemyList.length; i++) {
            this.EnemyList.getAt(i).DestroySelf();
            this.EnemyList.removeAt(i);
            i--;
        }

        if(this.ExitPoint != null){this.ExitPoint.DestroySelf();}
    }

    createObjective(x, y, sfx_key){
        let objectivepoint = new ObjectivePoint(this.scene, x + this.x, y + this.y, sfx_key);
        this.ObjectiveList.add(objectivepoint);
    }

    createFinalObjective(x, y, sfx_key){
        let finalobjectivepoint = new FinalObjectivePoint(this.scene, x + this.x, y + this.y, sfx_key);
        this.ExitPoint = finalobjectivepoint;
    }

    createEnemy(path, points, speed, delay, sprite, sfx_key){
        // Compute world path from local path coods
        let worldPoints = points;
        for (let i = 0; i < points.length; i++) {
            if (i % 2) {
                worldPoints[i] += this.y;
            } else {
                worldPoints[i] += this.x;
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
                this.ObjectiveList.getAt(i).Hover();
            }
        }

        /*
        for (let i = 0; i < this.EnemyList.length; i++) {
            if(Phaser.Math.Distance.BetweenPoints( playerBoat, this.EnemyList.getAt(i)) < playerBoat.colRad + this.EnemyList.getAt(i).colRad)
            {
                console.log("collided with enemy boat");
                this.scene.ResetLevel();
            }
        }
        */
    }

    updateSFX() {
        for (let i = 0; i < this.EnemyList.length; i++) {
            this.EnemyList.getAt(i).update();
        }
    }
}