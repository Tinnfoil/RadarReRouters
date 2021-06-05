class Level5 extends BaseLevel{
    constructor(scene) {
        // scene, time, exit offset x, exit offset y
        super(scene, 10000, gameWidth, -gameHeight); 
    }

    createLevel(){
        console.log("Level 5 Creation");
        this.createObjective(0.7, 0.8, 'bum');

        this.createEnemy(
            null, 
            [1, 0.3,
            0.6, 0.7,
            0.4, 0.5,
            0, 0.6], 
            .4,
            0.5, 
            'enemyboat',
            'a'
        );
        /*   
        this.createEnemy(
            null, 
            [1000, 400,
            600, 200,
            250, 500,
            -50, 300],
            1.45,
            5000,
            'enemyboat',
            'd'
        ); */

        this.createLand(0.4, 0.8, 1);
        this.createLand(0.4, 0.2, 2);
    }
}