class BaseLevel extends Phaser.GameObjects.GameObject{
    constructor(scene, x = 0, y = 0, w = gameWidth, h = gameHeight) {
        super(scene, x, y); 
        this.scene = scene;
        this.ObjectiveList = new Phaser.Structs.List(this.scene);
        this.EnemyList = new Phaser.Structs.List(this.scene);
        this.ExitPoint = null;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.camera = this.scene.cameras.main;

        this.createLevel();
    }

    createLevel(){
        console.log("No Level to create");
    }

    moveToLevel() {
        this.camera.pan(this.x + this.w/2, this.y + this.h/2, 5000, 'Sine.easeInOut');
    }

    resetLevel(){
        this.clearLevel();
        this.createLevel();
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
    }

    createObjective(x, y, sfx_key){
        let objectivepoint = new ObjectivePoint(this.scene, x + this.x, y + this.y, sfx_key);
        this.ObjectiveList.add(objectivepoint);
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

        // Win condition
        if(this.ObjectiveList.length == 0){
            
            // Now check for LZ for final objective
            if(Phaser.Math.Distance.BetweenPoints(playerBoat, this.ExitPoint) <  playerBoat.colRad + this.ExitPoint.colRad) 
            {
                this.ExitPoint.getAt(i).Collect();
                this.scene.SetLevel(this.scene.levelNumber+1);
            }

        }

        for (let i = 0; i < this.EnemyList.length; i++) {
            if(Phaser.Math.Distance.BetweenPoints( playerBoat, this.EnemyList.getAt(i)) < playerBoat.colRad + this.EnemyList.getAt(i).colRad)
            {
                console.log("collided with enemy boat");
                this.scene.ResetLevel();
            }
        }
    }

    updateSFX() {
        for (let i = 0; i < this.EnemyList.length; i++) {
            this.EnemyList.getAt(i).update();
        }
    }
}