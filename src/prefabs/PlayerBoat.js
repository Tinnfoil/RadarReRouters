class PlayerBoat extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, positionX, positionY) {
        super(scene, path, positionX, positionY, 'playerboat'); 

        scene.add.existing(this);               // add to existing scene, displayList, updateList
        //scene.physics.add.existing(this);       // add to physics system

        this.scale = .5;
    }

    update() {
    }
}