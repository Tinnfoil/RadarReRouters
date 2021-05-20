class FinalObjectivePoint extends Phaser.GameObjects.Sprite {
    constructor(scene, positionX, positionY, sfx_key) {
        super(scene, positionX, positionY, 'objective'); 
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        
        this.colRad = 20;

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