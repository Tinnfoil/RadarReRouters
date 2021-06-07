class ObjectivePoint extends Phaser.GameObjects.Sprite {
    constructor(scene, positionX, positionY, sfx_key) {
        super(scene, positionX, positionY, 'objective'); 
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        
        this.setOrigin(0.5);

        this.colRad = 20;

        this.alpha = .5;
        this.scale = .15;
        this.hovered = false;

        // objective 'pickup' sfx
        this.sfx = new SpatialSound(scene, this, sfx_key, 0.1, false);
    }

    update(time, delta) {
        
    }

    Hover(){
        this.alpha = 1;
        this.scale = .2;
        this.hovered = true;
    }

    Collect() {
        this.sfx.play();
        this.DestroySelf();
    }

    DestroySelf(){
        this.destroy();
    }


}