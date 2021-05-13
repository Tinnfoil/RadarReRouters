class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, points, speed, sprite) {
        super(scene, path, points[0], points[1], sprite); 
        scene.add.existing(this);

        this.scale = 0.15;
        this.texture.flipY = true;

        // taken from the phaser examples:
        // https://phaser.io/examples/v3/view/paths/followers/rotate-to-path
        this.path = new Phaser.Curves.Spline(points);

        // draw path for debug purposes
        let graphics = scene.add.graphics();
        graphics.lineStyle(1, 0xffffff, 0.5);
        this.path.draw(graphics, 128);

        let pathlength = this.path.getLength();

        // start along path
        this.startFollow({
            from: 0,            // points allow a path are values 0–1
            to: 1,
            delay: 0,
            duration: (pathlength / speed ) * 10,
            ease: 'Power0',
            hold: 0,
            repeat: -1,
            yoyo: false,
            rotateToPath: true
        });
    }
}