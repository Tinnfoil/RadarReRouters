class Level6 extends BaseLevel{
    constructor(scene) {
        super(scene, 10000, gameWidth, 200); 
    }

    createLevel(){
        console.log("Level 6 Creation");
        //this.createObjective(0.2, 0.85, 'bum');
       // this.createObjective(0.55, 0.1, 'bum');
        //this.createObjective(0.6, 0.4, 'bum');
       // this.createObjective(0.7, 0.3, 'bum');
        //this.createFinalObjective(screenWidth/2 + 300, screenHeight/2 - 300, 'bum');
      
        this.createEnemy(
            null, 
            [1, 0.5,
            0, 0.5], 
            1.5,
            0, 
            'enemyboat',
            'd'
        );
        this.createEnemy(
            null, 
            [1, 0.5,
            0, 0.5], 
            1.5,
            .5, 
            'enemyboat',
            'd'
        );
        this.createEnemy(
            null, 
            [.3, 1,
            .35, 0.6,
            .2, 0.3,
            .4, 0], 
            1.5,
            .5, 
            'enemyboat',
            'd'
        );
        this.createEnemy(
            null, 
            [.3, 1,
            .35, 0.6,
            .2, 0.3,
            .4, 0], 
            1.5,
            0, 
            'enemyboat',
            'd'
        );

        this.createLand(0.3, 0.35, 3, .2);
        this.createLand(0.4, 0.25, 2, .3);
        this.createLand(0.6, 0.25, 4);
        this.createLand(0.47, 0.75, 2);
        this.createLand(0.65, 0.6, 5);
    }
}