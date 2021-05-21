class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, points, speed, delay, sprite, sfx_key) {
        super(scene, path, points[0], points[1], sprite); 
        scene.add.existing(this);

        this.scale = 0.15;
        // size of circular radius to check collisions
        this.colRad = 20;
        this.flipY = true;

        if (points.length > 4) {
            // taken from the phaser examples:
            // https://phaser.io/examples/v3/view/paths/followers/rotate-to-path
            this.path = new Phaser.Curves.Spline(points);
        } else {
            this.path = new Phaser.Curves.Line(points);
        }

        this.delay = delay;
        this.speed = speed;
        this.visible = false;

        // draw path for debug purposes
        this.graphics = scene.add.graphics();
        this.graphics.lineStyle(1, 0xffffff, 0.5);
        this.path.draw(this.graphics, 128);

        this.circlegraphics = scene.add.graphics({ lineStyle: { width: 2, color: 0xff0000, alpha: .5 }, fillStyle: { color: 0xff0000 }});
        this.circle = new Phaser.Geom.Circle(this.x, this.y, this.colRad );

        this.sfx = new SpatialSound(scene, this, sfx_key, 0.33, true, 150, 600);
        
    }

    start() {
        this.visible = true;
        let pathlength = this.path.getLength();

        // start along path
        this.startFollow({
            from: 0,            // points allow a path are values 0–1
            to: 1,
            delay: this.delay,       // give ships a offset, not totally in sync
            duration: (pathlength / this.speed ) * 10,
            ease: 'Power0',
            hold: 0,
            repeat: -1,
            yoyo: false,
            rotateToPath: true
        });

        this.sfx.play();
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