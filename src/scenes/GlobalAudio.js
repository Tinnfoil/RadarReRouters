class GlobalAudio extends Phaser.Scene {
    constructor() {
        super("globalAudioScene");
        Phaser.Scene.call(this, {key: 'globalAudioScene'});
    }

    create() {
        this.oceanAmbience = this.sound.add('ambience', {volume: 0.15, loop: true})
        this.oceanAmbience.play();
    }
}