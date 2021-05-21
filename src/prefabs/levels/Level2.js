class Level2 extends BaseLevel{
    constructor(scene, exitX = gameWidth, exitY = -gameHeight) {
        super(scene, exitX, exitY); 
    }

    createLevel(){
        console.log("Level 2 Creation");
        this.createObjective(screenWidth/2 - 50, screenHeight/2, 'bum');
        this.createObjective(screenWidth/2 - 350, screenHeight/2 - 150, 'bum');
        this.createObjective(screenWidth/2 + 200, screenHeight/2 + 150, 'bum');
        //this.createFinalObjective(screenWidth/2 + 300, screenHeight/2 - 300, 'bum');
        
        this.createEnemy(
            null, 
            [1000, 300,
            -50, 400], 
            3,
            0, 
            'enemyboat',
            'a'
        );
    }
}