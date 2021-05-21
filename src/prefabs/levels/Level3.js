class Level3 extends BaseLevel{
    constructor(scene, exitX = gameWidth, exitY = -gameHeight) {
        super(scene, exitX, exitY); 
    }

    createLevel(){
        console.log("Level 2 Creation");
        this.createObjective(0.5, 0.5, 'bum');
        
        this.createEnemy(
            null, 
            [1, 0.7,
            0, 0.4],
            3,
            0, 
            'enemyboat',
            'a'
        );

        this.createEnemy(
            null, 
            [1, 0.5,
            0, 0.1],
            3,
            500, 
            'enemyboat',
            'a'
        );
    }
}