class Load extends Phaser.Scene {
    constructor() {
        super ('loadScene');
    }

    // Inspired by Nathan Altice's Paddle Parkour loading screen
    // see: https://github.com/nathanaltice/PaddleParkourP3/blob/master/src/scenes/Load.js
    preload() {
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xFFFFFF, 1);
            loadingBar.fillRect(centerX - (centerX * value), centerY, screenWidth * value, border/2);
        });
        this.load.on('complete', () =>  {
            loadingBar.destroy();
        });

        this.load.path = './assets/';
        // Load graphics:
        this.load.image('titlescreen', "Title_Screen.png");
        this.load.image('startbutton', "Start_Button.png");
        this.load.image("gobutton",    "TestGoButton.png");
        this.load.image("restart",     "Restart.png");
        this.load.image("playerboat",  "Ship_01.png");
        this.load.image("drawfinger",  "TestFinger.png");
        this.load.image("island",      "Island.png");
        this.load.image("enemyboat",   "Ship_02.png");
        this.load.image("backgroundgrid", "Grid.png");
        this.load.image("objective",      "TestObjective.png");
        this.load.image("exitpoint",      "exit.png");
        // Load audio:
        this.load.audio('a_l', 'audio/drone_a_l.wav');
        this.load.audio('a_r', 'audio/drone_a_r.wav');
        this.load.audio('d_l', 'audio/drone_d_l.wav');
        this.load.audio('d_r', 'audio/drone_d_r.wav');
        this.load.audio('blip_l', 'audio/blips_l.wav');
        this.load.audio('blip_r', 'audio/blips_r.wav');
        this.load.audio('bum_l',  'audio/bum_l.wav');
        this.load.audio('bum_r',  'audio/bum_r.wav');
    }

    create() {
        this.scene.start('menuScene');
    }
}