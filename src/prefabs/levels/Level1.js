class Level1 extends BaseLevel{
    constructor(scene, exitX = gameWidth, exitY = -gameHeight) {
        super(scene, exitX, exitY); 
    }

    createLevel(){
        console.log("Level 1 Creation");
        this.createObjective(screenWidth/2, screenHeight/2, 'bum');
        //this.createObjective(gameWidth/2 - 300, gameHeight/2 + 100, 'bum');
        //this.createObjective(gameWidth/2 + 200, gameHeight/2 - 200, 'bum');
        //this.createFinalObjective(screenWidth/2 + 300, screenHeight/2 - 300, 'bum');

        this.createEnemy(
            null, 
            [1000, 300,
            500, 100,
            280, 350,
            -50, 200], 
            1.5,
            0, 
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
    }
}