class Level8 extends BaseLevel{
    constructor(scene) {
        super(scene, 10000, gameWidth + 500, -200); 
    }

    createLevel(){
        this.createEnemy(
            null, 
            [1, 0.5,
            0, 0.5], 
            .5,
            0, 
            'enemyboat',
            'a'
        );
        this.createEnemy(
            null, 
            [1, 0.5,
            0, 0.5], 
            .5,
            .1, 
            'enemyboat',
            'f'
        );
        this.createEnemy(
            null, 
            [1, 0.5,
            0, 0.5], 
            .5,
            .2, 
            'enemyboat',
            'g'
        );
        this.createEnemy(
            null, 
            [1, 0.5,
            0, 0.5], 
            .5,
            .3, 
            'enemyboat',
            'c'
        );
        this.createEnemy(
            null, 
            [1, 0.5,
            0, 0.5], 
            .5,
            .4, 
            'enemyboat',
            'e'
        );
        this.createEnemy(
            null, 
            [1, 0.5,
            0, 0.5], 
            .5,
            .5, 
            'enemyboat',
            'g'
        );


        this.createLand(0.4, 0.235, 2, .6);
        this.createLand(0.2, 0.75, 2, .6);
        this.createLand(0.6, 0.75, 2, .6);

        /*
        this.createObjective(0.7, 0.3, 'bum');
        
        this.createEnemy(
            null, 
            [1, 0.6,
            0, 0.4], 
            1,
            0, 
            'enemyboat',
            'd'
        );

        this.createLand(0.7, 0.7, 0);
        */
    }
    
    createObjectives () {
        this.createObjective(0.1, 0.3, 'bum');
        this.createObjective(0.25, 0.3, 'bum');

        this.createObjective(0.35, 0.7, 'bum');
        this.createObjective(0.45, 0.7, 'bum');
    }
}