class Level4 extends BaseLevel{
    constructor(scene) {
        super(scene, 10000, gameWidth + 300, -200); 
    }

    createLevel(){
        console.log("Level 4 Creation");
        this.createObjective(0.7, 0.3, 'bum');
        this.createObjective(0.6, 0.4, 'bum');
        this.createObjective(0.4, 0.6, 'bum');
        //this.createFinalObjective(screenWidth/2 + 300, screenHeight/2 - 300, 'bum');
        
        this.createEnemy(
            null, 
            [1, 0.4,
            0, 0.5], 
            .4,
            0, 
            'enemyboat',
            'd'
        );
        this.createEnemy(
            null, 
            [.3, 1,
            .4, 0.6,
            0, 0.3], 
            .5,
            .5, 
            'enemyboat',
            'd'
        );
        this.createEnemy(
            null, 
            [.7, 0,
            .6, 0.3,
            .9, 0.6,
            .9, 1], 
            2,
            .5, 
            'enemyboat',
            'd'
        );

        this.createLand(0.7, 0.7, 0);
    }
}