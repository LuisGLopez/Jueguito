// Creacion de escena
let gameScene = new Phaser.Scene('Jueguito');
let player;
let bg;
let platforms;
let lastPointer;
let running = false;

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
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

// cargar assets
function preload () {
    // Cargar las imagenes
    // Cargar el background
    switch (Math.floor(Math.random() * 7) + 1) {
        case 1:
                this.load.image('background', 'assets/backgrounds/background.png');
            break;
        case 2:
                this.load.image('background', 'assets/backgrounds/blue background.png');
            break;
        case 3:
                this.load.image('background', 'assets/backgrounds/brown background.png');
            break;
        case 4:
                this.load.image('background', 'assets/backgrounds/gray background.png');
            break;
        case 5:
                this.load.image('background', 'assets/backgrounds/green background.png');
            break;
        case 6:
                this.load.image('background', 'assets/backgrounds/pink background.png');
            break;
        case 7:
                this.load.image('background', 'assets/backgrounds/yellow background.png');
            break;
        default:
                this.load.image('background', 'assets/backgrounds/background.png');
            break;
    }
    //Cargar sprite de personaje
    this.load.spritesheet('player', 'assets/player/Idle (32x32).png', { frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('playerRunRight', 'assets/player/Run (32x32).png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('playerRunLeft', 'assets/player/RunLeft (32x32).png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('playerJump', 'assets/player/Jump (32x32).png');
    this.load.image('playerFalling', 'assets/player/Fall (32x32).png');
    
    //Cargar sprite de piso aleatoriamente
    switch (Math.floor(Math.random() * 3) + 1) {
        case 1:
                this.load.image('ground', 'assets/ground/dirt ground.png');
            break;
        case 2:
                this.load.image('ground', 'assets/ground/brown dirt ground.png');
            break;
        case 3:
            this.load.image('ground', 'assets/ground/pink dirt ground.png');
            break;

        default:
                this.load.image('ground', 'assets/ground/dirt ground.png');
            break;
    }
        
        

}

function create () {
    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;
    
    // crear el backfground sprite
    bg = this.add.sprite(0, 0, 'background');
    bg.setPosition(gameW/2, gameH/2);
    
    platforms = this.physics.add.staticGroup();

    platforms.create(22, 400, 'ground');
    platforms.create(66, 400, 'ground');
    platforms.create(110, 400, 'ground');
    platforms.create(154, 400, 'ground');
    platforms.create(198, 400, 'ground');
    platforms.create(242, 400, 'ground');
    platforms.create(286, 400, 'ground');
    platforms.create(330, 400, 'ground');
    platforms.create(374, 400, 'ground');
    platforms.create(418, 400, 'ground');
    platforms.create(462, 400, 'ground');
    platforms.create(506, 400, 'ground');
    platforms.create(550, 400, 'ground');
    platforms.create(594, 400, 'ground');
    platforms.create(638, 400, 'ground');
    platforms.create(682, 400, 'ground');


    player = this.physics.add.sprite(50, 180, 'player');
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'runRight',
        frames: this.anims.generateFrameNumbers('playerRunRight', { start: 0, end: 11 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'runLeft',
        frames: this.anims.generateFrameNumbers('playerRunLeft', { start: 0, end: 11 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'jump',
        frames: [ { key: 'playerJump', frame: 0 } ],
        frameRate: 1
    });

    this.anims.create({
        key: 'falling',
        frames: [ { key: 'playerFalling', frame: 0 } ],
        frameRate: 1
    });

    this.physics.add.collider(player, platforms);
}

function update () {
    this.input.on('pointerdown', function (pointer) {
        

        if(player.body.touching.down){
            player.anims.play('jump', true);
            player.setVelocityY(-200);
        }


    }, this);
    
    // Detecta movimiento del cursor dentro del canvas para mover el player
    this.input.on('pointermove', function (pointer) {
        lastPointer = pointer.x;
        running = true;
        if (player.x > Math.floor(pointer.x)) {
            player.anims.play('runLeft', true);
            player.setVelocityX(-160);
        }
        else {
            player.anims.play('runRight', true);
            player.setVelocityX(160)
        }
        
    });

    // Revisa si estan cerca el valor X del puntero y del personaje para detenerlo 
    if( (Math.floor(lastPointer) - 5 ) < Math.floor(player.x) && Math.floor(player.x) < (Math.floor(lastPointer) + 5 )){
        player.setVelocityX(0);
        running = false;
    }
    
    // Revision si existe deltaY para activar animacion de caida
    if(player.body.deltaY() >= 0.1){
        player.anims.play('falling', true);
    }

    // Fix para evitar deslizar despues de caer
    if ( (player.body.touching.down && !(Math.floor(lastPointer) - 5 ) < Math.floor(player.x) && Math.floor(player.x) < (Math.floor(lastPointer) + 5 ) ) ) {
        player.anims.play('runRight', true);
    }
    else if(player.body.touching.down) {
        player.anims.play('runLeft', true);
    }


    // Revisa si el personaje toca el suelo y no se mueve activa animacion de idle
    if (player.body.touching.down && !running) {
        player.anims.play('idle', true);
    }
    
}



// Creación de juego con la configuracion

