/*
Title: Sub-Sono

Kenny Doan
Harrison Kurtz
Collin Rowell

Some Notes:
This game is intended to be played with a mouse and keyboard
So it may be difficult to play with a trackpad.

[Left Arrow <-] to go to the previous level
[Right Arrow ->] to go to the next level

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
    scene: [Load, Menu, GlobalAudio, Play, UI, Win],
    debug: false
}

let game = new Phaser.Game(config);



// Set Globals
let ui = null;
let globalAudio = null;
let border = 64;
let centerX      = game.config.width/2;
let centerY      = game.config.height/2;
let screenWidth  = game.config.width;
let screenHeight = game.config.height;
let gameWidth    = screenWidth - (2 * border);
let gameHeight   = screenHeight - (2 * border);

let screenRatio = screenWidth/screenHeight;

let transitionTime = 3000;

// Set Keyboard keys
let keySPACE;
let keyR;
let keyLEFT;
let keyRIGHT;