class LandMass extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        let key;
        let colBlueprint;
        // determine type of landmass
        switch(type) {
            default:
                type = 0;
                key = 'island'
                colBlueprint = [
                    [0.5, 0.5, 100]
                    [0.5, 0.5, 50]
                ]   
        }
        super (scene, x, y, key)
        scene.add.existing(this);
        this.setOrigin(0.5);
        this.scale = 0.4;

        
    }
}