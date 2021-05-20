class FinalObjectivePoint extends Phaser.GameObjects.Sprite {
    constructor(scene, positionX, positionY, sfx_key) {
        super(scene, positionX, positionY, 'exitpoint'); 
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        
        this.colRad = 20;

        // objective 'pickup' sfx
        this.sfx = new SpatialSound(scene, this, sfx_key, 0.25, false, 100, 600);
    }

    update(time, delta) {
        
    }

    Collect() {
        this.sfx.play();
        this.DestroySelf();
    }

    DestroySelf(){
        this.destroy();
    }


}