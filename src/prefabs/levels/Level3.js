class Level3 extends BaseLevel{
    constructor(scene) {
        // scene, time, exit offset x, exit offset y
        super(scene, 10000, gameWidth, -gameHeight); 
    }

    createLevel(){
        console.log("Level 2 Creation");
        this.createObjective(0.5, 0.5, 'bum');
        
        this.createEnemy(
            null, 
            [1, 0.7,
            0, 0.4],
            1,
            0, 
            'enemyboat',
            'a'
        );

        this.createEnemy(
            null, 
            [1, 0.5,
            0, 0.1],
            1,
            0.5, 
            'enemyboat',
            'd'
        );
    }
}