class Music extends Phaser.GameObjects.GameObject{
    constructor(scene, layers, volume) {
        super(scene)
        this.scene = scene;

        this.baseVolume = volume;

        this.musicLayers = [];
        for (let i = 0; i < layers.length; i++) {
            this.musicLayers[i] = this.scene.sound.add(layers[i], 
                {volume: 0, loop: true})
        }

        this.layerNum = -1;
        this.isPlaying = false;
    }

    getSeek() {
        if (this.isPlaying) 
            return this.musicLayers[0].seek;
        else 
            return 0;
    }

    addLayer() {
        this.layerNum += 1;
        if (this.layerNum == 0) {
            this.startPlayback();
            this.musicLayers[0].volume = this.baseVolume;
        }
        console.log(this.layerNum);
    }

    fadeInLayer (progress) {
        if (this.layerNum < this.musicLayers.length) {
            this.musicLayers[this.layerNum].volume = progress * this.baseVolume;
        }
    }

    startPlayback() {
        this.musicLayers.forEach(layer => {
            layer.play();
        });
        this.isPlaying = true;
    }

    stopPlayback() {
        this.musicLayers.forEach(layer => {
            layer.stop();
        });
    }
}