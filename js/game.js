// Creacion de escena
let gameScene = new Phaser.Scene('Jueguito');
let player;
let bg;
// cargar assets
gameScene.preload = function() {
    // Cargar las imagenes
    this.load.image('background', 'assets/backgrounds/background.png')
    this.load.spritesheet('player', 'assets/player/Idle (32x32).png', { frameWidth: 32, frameHeight: 32});
};

gameScene.create = function() {
    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;
    
    // crear el backfground sprite
    bg = this.add.sprite(0, 0, 'background');
    bg.setPosition(gameW/2, gameH/2);

    player = this.physics.add.sprite(50, 180, 'player');
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'turn',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10 }),
        frameRate: 20,
        repeat: -1
    });
};

gameScene.update = function() {
    player.anims.play('turn', true);
}

// Configuracion del juego
let config = {
    type: Phaser.AUTO,
    width:  700,
    height: 400,
    scene: gameScene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

// Creación de juego con la configuracion
let game = new Phaser.Game(config);
