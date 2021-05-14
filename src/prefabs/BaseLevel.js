class BaseLevel extends Phaser.GameObjects.GameObject{
    constructor(scene) {
        super(scene, 0, 0); 
        this.scene = scene;
        this.ObjectiveList = new Phaser.Structs.List(this.scene);
        this.EnemyList = new Phaser.Structs.List(this.scene);
    }

    createLevel(){
        console.log("No Level to create");
    }

    createObjective(x, y){
        let objectivepoint = new ObjectivePoint(this.scene, x, y);
        this.ObjectiveList.add(objectivepoint);
    }

    createEnemy(path, points, speed, delay, sprite, sfx_key){
        let enemy = new Enemy(this.scene, path, points, speed, delay, sprite, sfx_key);
        this.EnemyList.add(enemy);
    }

    checkCollisions(playerBoat){
        for (let i = 0; i < this.ObjectiveList.length; i++) {
            //console.log(Phaser.Math.Distance.BetweenPoints(playerBoat, this.ObjectiveList.getAt(i)), (playerBoat.colRad + this.ObjectiveList.getAt(i).colRad));
            if(Phaser.Math.Distance.BetweenPoints(playerBoat, this.ObjectiveList.getAt(i)) <  playerBoat.colRad + this.ObjectiveList.getAt(i).colRad) 
            {
                console.log("collided with objective");
                this.ObjectiveList.getAt(i).DestroySelf();
                this.ObjectiveList.removeAt(i);
                i--;
            }
        }

        for (let i = 0; i < this.EnemyList.length; i++) {
            if(Phaser.Math.Distance.BetweenPoints( playerBoat, this.EnemyList.getAt(i)) < playerBoat.colRad + this.EnemyList.getAt(i).colRad)
            {
                console.log("collided with enemy boat");
            }
        }
    }

    updateSFX() {
        for (let i = 0; i < this.EnemyList.length; i++) {
            this.EnemyList.getAt(i).update();
        }
    }
}