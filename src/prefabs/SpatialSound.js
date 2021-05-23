class SpatialSound extends Phaser.GameObjects.GameObject{
    constructor(scene, parent, key, volume, loop) {
        super(scene, parent.x, parent.y);
        this.scene = scene;
        this.parent = parent;

        this.l = this.scene.sound.add(key + '_l', {volume: volume, loop: loop});
        this.r = this.scene.sound.add(key + '_r', {volume: volume, loop: loop});

        this.base_volume = volume;
    }

    update() {
        // get coordinates of main camera, to act as our listener
        let cam_x = this.scene.cameras.main.scrollX + centerX;
        let cam_y = this.scene.cameras.main.scrollY + centerY;

        let max_dist = this.scene.cameras.main.displayWidth / 2 + border;
        let min_dist = max_dist / 3;

        // get distance between source and main camera
        let dist = Phaser.Math.Distance.Between(cam_x, cam_y, this.parent.x, this.parent.y);
        let x_dist = cam_x - this.parent.x;

        // calculate position between 0 and 1 of the source and max/min distances.
        let dist_ratio = (max_dist - dist) / (max_dist - min_dist);
        // calculate position between -1 and 1 of the panning x position
        let pan_ratio = x_dist / max_dist;

        // keep within bounds of 0 and 1
        if (dist_ratio > 1) {dist_ratio = 1}
        else if (dist_ratio < 0) {dist_ratio = 0}
        // keep within bounds of -1 and 1
        if (pan_ratio > 1) {pan_ratio = 1}
        else if (pan_ratio < -1) {pan_ratio = -1}

        // apply a simple parametric curve to ratio, closer to way we hear
        dist_ratio *= dist_ratio;
        let l_pan_ratio = ((pan_ratio * pan_ratio * pan_ratio) + 1) / 2;
        let r_pan_ratio = (-(pan_ratio * pan_ratio * pan_ratio) + 1) / 2;

        // apply spatialization to L and R channels
        this.l.volume = this.base_volume * dist_ratio * l_pan_ratio; 
        this.r.volume = this.base_volume * dist_ratio * r_pan_ratio; 
    }

    play() {
        this.l.play();
        this.r.play();
    }

    stop(){
        this.l.stop();
        this.r.stop();
    }

    remove() {
        this.scene.sound.remove();
    }
}