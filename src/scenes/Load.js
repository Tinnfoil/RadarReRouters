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
        this.load.atlas('atlas',            "spritesheet.png", "sprites.json");
        this.load.image('titlescreen',      "Title_Screen.png");
        this.load.image('startbutton',      "Start_Button.png");
        this.load.image("gobutton",         "Go_Button.png");
        this.load.image("restart",          "Restart.png");
        this.load.image("playerboat",       "Green_Ship.png");
        this.load.image("drawfinger",       "TestFinger.png");
        this.load.image("island1",          "Island_1.png");
        this.load.image("island2",          "Island_2.png");
        this.load.image("island3",          "Island_3.png");
        this.load.image("island4",          "Island_4.png");
        this.load.image("island5",          "Island_5.png");
        this.load.image("enemyboat",        "Red_Ship.png");
        this.load.image("backgroundgrid",   "Grid.png");
        this.load.image("objective",        "Objective.png");
        this.load.image("exitpoint",        "Exit_Flag.png");
        this.load.image('winscreen',        "Win_Screen.png");
        this.load.image('returnbutton',     "Return_Button.png");
        this.load.image('g_part',           "particle.png");
        this.load.image('w_part',           "whitepart.png");

        // Load audio:
        this.load.path = './assets/audio/';

        this.load.audio('ambience', 'ambience.mp3');
        
        this.load.audio('a_l', 'a_l.mp3');
        this.load.audio('a_r', 'a_r.mp3');
        this.load.audio('c_l', 'c_l.mp3');
        this.load.audio('c_r', 'c_r.mp3');
        this.load.audio('e_l', 'e_l.mp3');
        this.load.audio('e_r', 'e_r.mp3');
        this.load.audio('f_l', 'f_l.mp3');
        this.load.audio('f_r', 'f_r.mp3');
        this.load.audio('g_l', 'g_l.mp3');
        this.load.audio('g_r', 'g_r.mp3');
        this.load.audio('blip_l', 'blip_l.mp3');
        this.load.audio('blip_r', 'blip_r.mp3');
        this.load.audio('draw_l', 'draw_l.mp3');
        this.load.audio('draw_r', 'draw_r.mp3');
        this.load.audio('boom_l', 'boom_l.mp3');
        this.load.audio('boom_r', 'boom_r.mp3');
        this.load.audio('bum_l',  'bum_l.wav');
        this.load.audio('bum_r',  'bum_r.wav');

        this.load.audio('bass', 'bass.mp3');
        this.load.audio('snare', 'snare.mp3');
        this.load.audio('lead', 'lead.mp3');
        this.load.audio('hats', 'hats.mp3');
        this.load.audio('drums', 'drums.mp3');
        this.load.audio('synth', 'synth.mp3');
    }

    create() {
        this.anims.create({
            key: 'sub',
            frames: this.anims.generateFrameNames('atlas', {
                prefix: 'GreenShip',
                start: 1,
                end: 6,
                suffix: '',
                zeroPad: 1
            }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'ship',
            frames: this.anims.generateFrameNames('atlas', {
                prefix: 'RedShip',
                start: 1,
                end: 6,
                suffix: '',
                zeroPad: 1
            }),
            frameRate: 4,
            repeat: -1
        });

        this.scene.start('menuScene');
    }
}