class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, points, time, startAt, sprite, sfx_key, flipx) {
        super(scene, path, points[0], points[1], sprite); 
        scene.add.existing(this);

        this.scale = 0.175;
        // size of circular radius to check collisions
        this.colRad = 30;
        this.flipX = flipx;

        if (points.length > 4) {
            // taken from the phaser examples:
            // https://phaser.io/examples/v3/view/paths/followers/rotate-to-path
            this.path = new Phaser.Curves.Spline(points);
        } else {
            this.path = new Phaser.Curves.Line(points);
        }
        this.time = time;

        // allow to either spawn in the middle of the path, or before
        if(startAt < 0) {
            this.delay = -(startAt * this.time);
            this.startAt = 0;
            this.visible = false;
        } else {
            this.delay = 0;
            this.startAt = startAt;
            this.visible = true;
            // set the position based on start point during camera move before reset
            let startAtPoint = this.path.getPoint(this.startAt);
            this.x = startAtPoint.x;
            this.y = startAtPoint.y;
        }

        // draw path for debug purposes
        this.graphics = scene.add.graphics();
        this.graphics.lineStyle(1, 0xffffff, 0.5);
        this.path.draw(this.graphics, 128);

        this.circlegraphics = scene.add.graphics({ lineStyle: { width: 2, color: 0xff0000, alpha: .3 }, fillStyle: { color: 0xff0000 }});
        this.circle = new Phaser.Geom.Circle(this.x, this.y, this.colRad );

        this.sfx = new SpatialSound(scene, this, sfx_key, 1.5, true);
        this.sfx.play(this.scene.music.getSeek());

        this.anims.play('ship');
    }

    start() {
        this.visible = true;
        let pathlength = this.path.getLength();

        // reset the path origin
        let startPoint = this.path.getStartPoint();
        this.x = startPoint.x;
        this.y = startPoint.y;

        this.startFollow({
            from: 0,            // points allow a path are values 0–1
            to: 1,
            delay: this.delay,       // give ships a offset, not totally in sync
            duration: this.time,
            ease: 'Power0',
            hold: 0,
            repeat: -1,
            yoyo: false,  
        }, this.startAt);
    }


    update() {
        this.sfx.update();
        if(config.debug == true){
            this.circlegraphics.clear();
            this.circle.x = this.x; this.circle.y = this.y;
            this.circlegraphics.strokeCircleShape(this.circle);
        }
        //this.graphics.drawCircle(this.x, this.y, this.colRad);
    }

    DestroySelf(){
        this.sfx.stop();
        this.graphics.clear();
        this.circlegraphics.clear();
        this.destroy();
    }
}