class BaseLevel extends Phaser.GameObjects.GameObject{
    constructor(scene) {
        super(scene, 0, 0); 
        this.scene = scene;
        this.ObjectiveList = new Phaser.Structs.List();
    }

    createLevel(){
        console.log("No Level to create");
    }

    createObjective(x, y){
        this.objectivepoint = new ObjectivePoint(this.scene, x, y);
        this.ObjectiveList.add(this.objectivepoint);
    }
}