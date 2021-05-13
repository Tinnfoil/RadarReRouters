class Level1 extends BaseLevel{
    constructor(scene) {
        super(scene); 
    }

    createLevel(){
        console.log("Level 1 Creation");
        this.objectivepoint = this.createObjective(gameWidth/2, gameHeight/2);
    }
}