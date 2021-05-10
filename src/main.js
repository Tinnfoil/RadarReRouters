/*
Title: RadarReRouters

Kenny Doan
Harrison Kurtz
Collin Rowell

*/

//Game Configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: { 
        default: 'arcade',
        arcade:{
            //debug: true,
            gravity:{
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// Set Globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let gameWidth = game.config.width;
let gameHeight = game.config.height;