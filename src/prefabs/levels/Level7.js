class Level7 extends BaseLevel{
    constructor(scene) {
        super(scene, 10000, gameWidth + 300, -500); 
    }

    createLevel(){

         this.createObjective(0.5, 0.5, 'bum');
        this.createObjective(0.4, 0.4, 'bum');
        this.createObjective(0.6, 0.6, 'bum');

        this.createEnemy(
            null, 
            [.7, 0,
            0, .7], 
            .5,
            0, 
            'enemyboat',
            'd'
        );

        this.createEnemy(
            null, 
            [1, .3,
            .3, 1], 
            .5,
            0, 
            'enemyboat',
            'd'
        );

        this.createEnemy(
            null, 
            [1, 0,
            0, 1], 
            .5,
            0, 
            'enemyboat',
            'd'
        );

        this.createEnemy(
            null, 
            [.3, 0,
            1, .7], 
            .5,
            0, 
            'enemyboat',
            'd'
        );

        this.createEnemy(
            null, 
            [0, 0,
            1, 1], 
            .5,
            0, 
            'enemyboat',
            'd'
        );

        this.createEnemy(
            null, 
            [0, .3,
            .7, 1], 
            .5,
            0, 
            'enemyboat',
            'd'
        );
    }
}