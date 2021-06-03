class LandMass extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        let key;
        let colBlueprint;
        let scale = 1;
        // determine type of landmass
        switch(type) {
            default:
                type = 0;
                key = 'island'
                scale = .4;
                colBlueprint = [
                    [.5, .5, 120]
                ]   
        }
        super (scene, x, y, key)
        scene.add.existing(this);
        this.setOrigin(0.5);
        this.scale = scale;
        this.colRad = (this.width + this.height) * this.scale / 4;

        this.colliders = [];
        //console.log(this.width, this.height);
        this.circlegraphics = scene.add.graphics({ lineStyle: { width: 2, color: 0x0000ff, alpha: .5 }, fillStyle: { color: 0xff0000 }});
        this.createColliders(colBlueprint);
    }

    createColliders(blueprint){
        let offsetx = this.width / 2 * this.scale;
        let offsety = this.height / 2 * this.scale;
        //console.log(offsetx, offsety);
        for (var i = 0; i < blueprint.length; i++) {
             //console.log(blueprint[i], blueprint[i][0], blueprint[i][1], blueprint[i][2]);
             let xpos =  blueprint[i][0] * this.width * this.scale - offsetx + this.x;
             let ypos =  blueprint[i][1] * this.height * this.scale - offsety + this.y;
             //console.log(xpos, ypos);
             this.colliders[i] = [xpos, ypos, blueprint[i][2]];
        }

        for (var i = 0; i < this.colliders.length; i++) {
            //console.log(this.colliders[i], this.colliders[i][0], this.colliders[i][1], this.colliders[i][2]);
            if(config.debug == true){
                let circle = new Phaser.Geom.Circle(this.colliders[i][0], this.colliders[i][1], this.colliders[i][2]);
                this.circlegraphics.strokeCircleShape(circle);
            }
        }

    }
}