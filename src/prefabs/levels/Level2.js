class Level2 extends BaseLevel{
    constructor(scene) {
        super(scene); 
    }

    createLevel(){
        console.log("Level 2 Creation");
        this.createObjective(gameWidth/2 - 50, gameHeight/2, 'bum');
        this.createObjective(gameWidth/2 - 350, gameHeight/2 + 100, 'bum');
        this.createObjective(gameWidth/2 + 200, gameHeight/2 - 100, 'bum');

        this.createEnemy(
            null, 
            [1000, 300,
            -50, 400], 
            3,
            0, 
            'enemyboat',
            'a'
        );
            

    }
}