class Level4 extends BaseLevel{
    constructor(scene) {
        super(scene, 10000, gameWidth + 300, -200); 
    }

    createLevel(){
        console.log("Level 4 Creation");
        //this.createFinalObjective(screenWidth/2 + 300, screenHeight/2 - 300, 'bum');
        this.createEnemy(
            null, 
            [1, 0.4,
            0, 0.5], 
            .5,
            0, 
            'enemyboat',
            'g'
        );
        this.createEnemy(
            null, 
            [.3, 1,
            .4, 0.6,
            0, 0.3], 
            .5,
            .5, 
            'enemyboat',
            'f'
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
            'a'
        );

        this.createLand(0.3, 0.3, 3);
        this.createLand(0.7, 0.8, 2, .6);
    }
    
    createObjectives () {
        this.createObjective(0.7, 0.3, 'bum');
        this.createObjective(0.6, 0.4, 'bum');
        this.createObjective(0.4, 0.6, 'bum');
    }
}