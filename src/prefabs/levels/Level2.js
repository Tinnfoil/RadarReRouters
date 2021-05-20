class Level2 extends BaseLevel{
    constructor(scene, x = 0, y = 0) {
        super(scene, x, y); 
    }

    createLevel(){
        console.log("Level 2 Creation");
        this.createObjective(gameWidth/2 - 50, gameHeight/2, 'bum');
        this.createObjective(gameWidth/2 - 350, gameHeight/2 - 150, 'bum');
        this.createObjective(gameWidth/2 + 200, gameHeight/2 + 150, 'bum');
        this.createFinalObjective(gameWidth/2 + 300, gameHeight/2 - 300, 'bum');
        
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