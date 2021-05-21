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
    scene: [Menu, Play],
    debug: true
}

let game = new Phaser.Game(config);

// Set Globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let gameWidth = game.config.width;
let gameHeight = game.config.height;

// Set Keyboard keys
let keySPACE;