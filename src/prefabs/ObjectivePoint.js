class ObjectivePoint extends Phaser.GameObjects.Sprite {
    constructor(scene, positionX, positionY, sfx_key) {
        super(scene, positionX, positionY, 'objective'); 
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        
        this.colRad = 20;

        // objective 'pickup' sfx
        this.sfx = new SpatialSound(scene, this, sfx_key, 0.25, false, 100, 600);
    }

    update(time, delta) {
        
    }

    DestroySelf(){
        this.sfx.play();
        this.destroy();
    }


}