class LevelWin extends BaseLevel{
    constructor(scene) {
        super(scene, 10000); 
    }

    createLevel(){
        this.winScreen = this.scene.add.sprite(this.startX + gameWidth/2, this.startY - gameHeight/2, 'winscreen').setOrigin(.5);
        this.winScreen.setDepth(0);
        /*
        this.createObjective(0.7, 0.3, 'bum');
        
        this.createEnemy(
            null, 
            [1, 0.6,
            0, 0.4], 
            1,
            0, 
            'enemyboat',
            'd'
        );

        this.createLand(0.7, 0.7, 0);
        */
    }
}