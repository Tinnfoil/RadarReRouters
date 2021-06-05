class Level7 extends BaseLevel{
    constructor(scene) {
        super(scene, 10000, gameWidth + 300, -500); 
    }

    createLevel(){

        //this.createObjective(0.5, 0.5, 'bum');
        this.createObjective(0.3, 0.5, 'bum');
        this.createObjective(0.6, 0.6, 'bum');


        this.createEnemy(
            null, 
            [1, .4,
            .4, 1], 
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

        this.createLand(0.5, 0.65, 3, .3);
        this.createLand(0.65, 0.47, 3, .3);
    }
}