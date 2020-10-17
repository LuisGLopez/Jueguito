// Creacion de escena
let gameScene = new Phaser.Scene('Jueguito');

// cargar assets
gameScene.preload = function() {
    // Cargar las imagenes
    this.load.image('background', 'assets/backgrounds/Purple.png')
    this.load.image('player', 'assets/player/Jump (32x32).png')
};

gameScene.create = function() {
    // crear el backfground sprite
    this.add.sprite(0, 0, 'background');
};

// Configuracion del juego
let config = {
    type: Phaser.AUTO,
    width:  1136,
    height: 640,
    scene: gameScene
};

// Creación de juego con la configuracion
let game = new Phaser.Game(config);
