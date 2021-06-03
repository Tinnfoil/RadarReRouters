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

        this.fadeInFlag = false;
    }

    addLayer() {
        if (this.layerNum == -1) {
            this.startPlayback();
        }
        this.layerNum += 1;
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
    }

    stopPlayback() {
        this.musicLayers.forEach(layer => {
            layer.stop();
        });
    }
}