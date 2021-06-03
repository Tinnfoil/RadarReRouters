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
        this.load.image('titlescreen',          "Title_Screen.png");
        this.load.image('startbutton',          "Start_Button.png");
        this.load.image("gobutton",             "Go_Button.png");
        this.load.image("restart",              "Restart.png");
        this.load.image("playerboat",           "Green_Ship.png");
        this.load.image("drawfinger",           "TestFinger.png");
        this.load.image("island",               "Island.png");
        this.load.image("verticalisland",       "Island_2.png");
        this.load.image("smallisland",          "Island_3.png");
        this.load.image("cornerisland",         "Island_4.png");
        this.load.image("horizontalisland",     "Island_5.png");
        this.load.image("enemyboat",            "Red_Ship.png");
        this.load.image("backgroundgrid",       "Grid.png");
        this.load.image("objective",            "Objective.png");
        this.load.image("exitpoint",            "Exit_Flag.png");
        this.load.image('winscreen',            "Win_Screen.png");
        this.load.image('returnbutton',         "Return_Button.png");

        // Load audio:
        this.load.path = './assets/audio/';

        this.load.audio('a_l', 'drone_a_l.wav');
        this.load.audio('a_r', 'drone_a_r.wav');
        this.load.audio('d_l', 'drone_d_l.wav');
        this.load.audio('d_r', 'drone_d_r.wav');
        this.load.audio('blip_l', 'blips_l.wav');
        this.load.audio('blip_r', 'blips_r.wav');
        this.load.audio('bum_l',  'bum_l.wav');
        this.load.audio('bum_r',  'bum_r.wav');

        this.load.audio('hat', 'hi-hat.mp3');
        this.load.audio('kick', 'kick.mp3');
        this.load.audio('snare', 'snare.mp3');
        this.load.audio('cym', 'cym.mp3');
    }

    create() {
        this.scene.start('menuScene');
    }
}