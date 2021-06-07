class Level3 extends BaseLevel{
    constructor(scene) {
        // scene, time, exit offset x, exit offset y
        super(scene, 10000, gameWidth - 300, -gameHeight - 100); 
    }

    createLevel(){
        console.log("Level 2 Creation");
        
        this.createEnemy(
            null, 
            [1, 0.7,
            0, 0.6],
            .7,
            0, 
            'enemyboat',
            'a'
        );

        this.createEnemy(
            null, 
            [1, 0.5,
            0, 0.4],
            .7,
            0.5, 
            'enemyboat',
            'c'
        );

        this.createLand(0.1, 0.5, 5);
        this.createLand(0.9, 0.58, 5);
    }
    createObjectives() {
        this.createObjective(0.5, 0.55, 'bum');
    }
}