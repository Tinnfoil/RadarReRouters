class TrailGhost extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, positionX, positionY, texture, startAt = 0) {
        super(scene, path, positionX, positionY, texture); 

        scene.add.existing(this);               // add to existing scene, displayList, updateList
        this.scene = scene;

        this.alpha = .2;
        this.scale = .175;
        if(path != null){
            this.path = path;
            this.savedPath = path;
            this.Follow(startAt);
        }
    }

    Destroy(){   
        this.destroy();
    }

    Follow(x, y, startAt){
        this.setActive(true);
        this.resumeFollow();
        this.following = true;
        this.x = x;
        this.y = y;
        this.setPath(this.savedPath);
        if(this.path == null) return;
        let pathlength = this.path.getLength()
        this.startFollow({
            from: 0,            // points allow a path are values 0–1
            to: 1,
            delay: 0,
            duration: (pathlength * 15) / 2,
            ease: 'Power0',
            hold: 0,
            repeat: -1,
            yoyo: false,
            //rotateToPath: true
        }, (startAt));
    }

    PauseFollow(){
        this.setActive(false);
        this.stopFollow();
        //this.setPath(null);
    }

    update(time, delta) {
        
    }
}