class Level2 extends BaseLevel{
    constructor(scene) {
        super(scene, 10000, gameWidth + 300, -400); 
    }

    createLevel(){
        console.log("Level 2 Creation");
        this.createObjective(0.7, 0.3, 'bum');
        //this.createObjective(0.6, 0.4, 'bum');
        //this.createObjective(0.4, 0.6, 'bum');
        //this.createFinalObjective(screenWidth/2 + 300, screenHeight/2 - 300, 'bum');
        
        this.createEnemy(
            null, 
            [1, 0.3,
            0.6, 0.7,
            0.5, 0.3,
            0, 0.6], 
            1,
            0.5, 
            'enemyboat',
            'a'
        );

        //this.createLand(0.2, 0.2, 0);
    }
}