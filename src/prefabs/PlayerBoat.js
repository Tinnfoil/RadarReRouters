class PlayerBoat extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, positionX, positionY) {
        super(scene, path, positionX, positionY, 'playerboat'); 

        scene.add.existing(this);               // add to existing scene, displayList, updateList
        this.scene = scene;

        this.scale = .15;

        this.lastX = positionX; // For finding the difference from last position
        this.lastY = positionY;
        
        this.updateInterval = 0;
        this.targetAngle = 0;
        // a circle radius to check collisions from
        this.colRad = 20;

        this.setInteractive();
        this.on('pointerdown', () => { 
            scene.CheckDraw();
        });

        this.sfx = new SpatialSound(scene, this, 'blip', 0.5, true,  150, 600);
    }

    Destroy(){
        this.sfx.stop();
        this.destroy();
    }

    update(time, delta) {
        
        /*
        if(this.updateInterval >= 0){
                let diffx = this.x - this.lastX;
                let diffy = this.y - this.lastY;
                //console.log(-diffy, diffx);
                this.targetAngle = Math.atan2(diffy, diffx);
                let anglediff = Math.abs(this.targetAngle - this.angle);
                //console.log(.1 + anglediff / 360);
                //let angle = Phaser.Math.RadToDeg(angleDeg);
                let angleRad = Phaser.Math.Angle.RotateTo(Phaser.Math.DegToRad(this.angle), this.targetAngle, .06 + anglediff / 180)
                let angle = Phaser.Math.RadToDeg(angleRad);
                //console.log(angle);
                this.angle = angle;
                
                this.lastX = this.x;
                this.lastY = this.y;
                this.updateInterval = 0;
        }
        else{
                this.updateInterval += delta;
        }
        */

        this.sfx.update();
    }
}