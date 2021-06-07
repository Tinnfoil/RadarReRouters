class Level1 extends BaseLevel{
    constructor(scene) {
        // scene, time, exit offset x, exit offset y
        super(scene, 10000, gameWidth, -gameHeight); 
    }

    createLevel(){
        console.log("Level 1 Creation");
        //this.createObjective(0.5, 0.5, 'bum');
        //this.createObjective(gameWidth/2 - 300, gameHeight/2 + 100, 'bum');
        //this.createObjective(gameWidth/2 + 200, gameHeight/2 - 200, 'bum');
        //this.createFinalObjective(screenWidth/2 + 300, screenHeight/2 - 300, 'bum');

        this.createEnemy(
            null, 
            [1, 0.6,
            0, 0.4], 
            .5,
            0, 
            'enemyboat',
            'g'
        );

        //this.createLand(0.2, 0.25, 0);
    }
}