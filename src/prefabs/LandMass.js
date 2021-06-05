class LandMass extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, landscale) {
        let key;
        let colBlueprint;
        let scale = 1;
        // determine type of landmass
        switch(type) {
            case 2:
                type = 2;
                key = 'island2'
                scale = landscale;
                colBlueprint = [
                    [.4, .2, 175],
                    [.55, .4, 175],
                    [.5, .8, 225]
                ]  
                break;
            case 3:
                type = 3;
                key = 'island3'
                scale = landscale;
                colBlueprint = [
                    [.5, .3, 125],
                    [.6, .5, 150],
                    [.4, .7, 150]
                ]  
                break;
            case 4:
                type = 4;
                key = 'island4'
                scale = landscale;
                colBlueprint = [
                    [.15, .2, 100],
                    [.33, .15, 125],
                    [.5, .15, 125],
                    [.75, .25, 200],
                    [.8, .5, 163],
                    [.8, .78, 188]
                ]  
                break;
            case 5:
                type = 5;
                key = 'island5'
                scale = landscale;
                colBlueprint = [
                    [.5, .5, 150],
                    [.2, .5, 125],
                    [.8, .5, 125]
                ]  
                break;
            default:
                type = 1;
                key = 'island1'
                scale = landscale;
                colBlueprint = [
                    [.5, .5, 275],
                    [.85, .15, 50],
                    [.85, .85, 25]
                ]   
        }

        for(let i = 0; i<colBlueprint.length; i++){
            colBlueprint[i][2] *= landscale;
        }

        super (scene, x, y, key)
        scene.add.existing(this);
        this.setOrigin(0.5);
        this.scale = scale;
        this.colRad = (this.width + this.height) * this.scale / 2;

        this.colliders = [];
        //console.log(this.width, this.height);
        this.circlegraphics = scene.add.graphics({ lineStyle: { width: 2, color: 0x0000ff, alpha: .8 }, fillStyle: { color: 0xff0000 }});
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

    Destroy(){
        this.circlegraphics.clear();
        this.destroy();
    }
}