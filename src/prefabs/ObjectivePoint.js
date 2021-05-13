class ObjectivePoint extends Phaser.GameObjects.Sprite {
    constructor(scene, positionX, positionY) {
        super(scene, positionX, positionY, 'objective'); 
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        
        this.colRad = 20;
    }

    update(time, delta) {
        
    }

    DestroySelf(){
        this.destroy();
    }


}