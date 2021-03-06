class FinalObjectivePoint extends Phaser.GameObjects.Sprite {
    constructor(scene, positionX, positionY, sfx_key) {
        super(scene, positionX, positionY, 'exitpoint'); 
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        
        this.colRad = 35;

        this.UnHover();

        // objective 'pickup' sfx
        this.sfx = new SpatialSound(scene, this, sfx_key, 0.25, false);
    }

    update(time, delta) {
        
    }

    UnHover(){
        this.alpha = .5;
        this.scale = .25;
        this.hovered = false;
    }

    Hover(){
        this.alpha = 1;
        this.scale = .3;
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