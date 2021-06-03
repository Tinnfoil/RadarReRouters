/*
Title: RadarReRouters

Kenny Doan
Harrison Kurtz
Collin Rowell

Testing
Testing commit (Collin)

*/

//Game Configuration
let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 720,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: { 
        default: 'arcade',
        arcade:{
            debug: true,
            gravity:{
                x: 0,
                y: 0
            }
        }
    },
    scene: [Load, Menu, Play, UI, Win],
    debug: true
}

let game = new Phaser.Game(config);



// Set Globals
let ui = null;
let border = 64;
let centerX      = game.config.width/2;
let centerY      = game.config.height/2;
let screenWidth  = game.config.width;
let screenHeight = game.config.height;
let gameWidth    = screenWidth - (2 * border);
let gameHeight   = screenHeight - (2 * border);

let screenRatio = screenWidth/screenHeight;

// Set Keyboard keys
let keySPACE;