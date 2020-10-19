// Creacion de escena
let gameScene = new Phaser.Scene('Jueguito');
let player;
let bg;
let platforms;
let lastPointer;
let running = false;
let matrix = [];
let items;
let score = 0;
let scoreString;
let trophy;
let trophyX;

// Configuracion del juego
let config = {
    type: Phaser.AUTO,
    width:  600,
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
    
    this.load.image('longBrownPlatform', 'assets/ground/long brown platform.png');

    // Carga de items
    this.load.image('bananas', 'assets/items/Bananas.png');

    this.load.image('copa', 'assets/items/End.png');
    
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
    // Creacion de la base principal 
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
    
    // Formula utilizada para generar el valor minimo y maximmo -> Math.floor(Math.random() * (max - min + 1)) + min

    randomPlatforms();
    // Generación usando la matriz
    for(let i=0; i<5; i++) {
        for(let j=0; j<3; j++) {
            if ( matrix[i][j] === 1){
                // Switch para generacion segun el nivel del eje X
                switch (i) {
                    // Swtich para en base a la matriz generar plataformas aleatoriamente
                    case 0:
                            // Cada caso cuenta con un funcion random para generar un valor nuevo dentro del rango permitido
                            switch (j) {
                                case 0:
                                        platforms.create(Math.floor(Math.random() * 122 + 1) + 69, 300, 'longBrownPlatform');
                                    break;
                                case 1:
                                        platforms.create(Math.floor(Math.random() * 77 + 1) + 239, 300, 'longBrownPlatform');
                                    break;
                                case 2:
                                        platforms.create(Math.floor(Math.random() * 122 + 1) + 409, 300, 'longBrownPlatform');
                                    break;
                                default:
                                        alert('Error al generar el mundo, favor de recargar el sitio');
                                    break;
                            }
                        break;
                    case 1: 
                            switch (j) {
                                case 0:
                                        platforms.create(Math.floor(Math.random() * 122 + 1) + 69, 230, 'longBrownPlatform');
                                    break;
                                case 1:
                                        platforms.create(Math.floor(Math.random() * 77 + 1) + 239, 230, 'longBrownPlatform');
                                    break;
                                case 2:
                                        platforms.create(Math.floor(Math.random() * 122 + 1) + 409, 230, 'longBrownPlatform');
                                    break;
                                default:
                                        alert('Error al generar el mundo, favor de recargar el sitio');
                                    break;
                            }
                        break;
                    case 2:
                            switch (j) {
                                case 0:
                                        platforms.create(Math.floor(Math.random() * 122 + 1) + 69, 160, 'longBrownPlatform');
                                    break;
                                case 1:
                                        platforms.create(Math.floor(Math.random() * 77 + 1) + 239, 160, 'longBrownPlatform');
                                    break;
                                case 2:
                                        platforms.create(Math.floor(Math.random() * 122 + 1) + 409, 160, 'longBrownPlatform');
                                    break;
                                default:
                                        alert('Error al generar el mundo, favor de recargar el sitio');
                                    break;
                            }
                        break;
                    case 3:
                            switch (j) {
                                case 0:
                                        trophyX = Math.floor(Math.random() * 122 + 1) + 69;
                                        platforms.create(trophyX, 90, 'longBrownPlatform');
                                    break;
                                case 1:
                                        trophyX = Math.floor(Math.random() * 77 + 1) + 239;
                                        platforms.create(trophyX, 90, 'longBrownPlatform');
                                    break;
                                case 2:
                                        trophyX = Math.floor(Math.random() * 122 + 1) + 409;
                                        platforms.create(trophyX, 90, 'longBrownPlatform');
                                    break;
                                default:
                                        alert('Error al generar el mundo, favor de recargar el sitio');
                                    break;
                            }   
                        break;
                    case 4:
                            switch (j) {
                                case 0:
                                        platforms.create(Math.floor(Math.random() * 122 + 1) + 69, 40, 'longBrownPlatform');
                                    break;
                                case 1:
                                        platforms.create( Math.floor(Math.random() * 77 + 1) + 239, 40, 'longBrownPlatform');
                                    break;
                                case 2:
                                        platforms.create(Math.floor(Math.random() * 122 + 1) + 409, 40, 'longBrownPlatform');
                                    break;
                                default:
                                        alert('Error al generar el mundo, favor de recargar el sitio');
                                    break;
                            }
                        break;
                    default:
                            alert('Error al generar el mundo, favor de recargar el sitio');
                        break;
                }
            }
        }
    }

    // Generacion de plataformas, Altura maxima: 50, Altura minima: 300, Diferencia maxima: 70, Distancia maxima entre plataformas: 250, Bordes: 40


    player = this.physics.add.sprite(50, 350, 'player');
    player.setCollideWorldBounds(true);

    //Creacion de animaciones

    // Animaciones de jugador
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

    // Colocar items

    items = this.physics.add.group({
        key: 'bananas',
        repeat: 4,
        setXY: { x: 45, y: 0, stepX: Math.floor(Math.random() * (120 + 1)) + 40 }
    });

    trophy = this.physics.add.group({
        key: 'copa',
        setXY: { x: trophyX, y: 50}
    });

    scoreString = this.add.text(16, 16, 'Marcador: ' + score, { fontSize: '16px', fill: '#000' });

    // Collider del personaje con las plataformas
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(items, platforms);
    this.physics.add.collider(trophy, platforms);

    this.physics.add.overlap(player, items, collectItems, null, this);
    this.physics.add.overlap(player, trophy, collectTrophy, null, this);
}

function update () {
    this.input.on('pointerdown', function (pointer) {
        if(player.body.touching.down){
            player.anims.play('jump', true);
            player.setVelocityY(-230);
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

// Algoritmo para generacion aleatoria

function randomPlatforms() {
    // Inicializacion de matriz que simula el tablero de 5x3
    for(let i=0; i<5; i++) {
        matrix[i] = [];
        for(let j=0; j<3; j++) {
            matrix[i][j] = 0;
        }
    }

    
    // Generacion aleatoria
    for(let i=0; i<5; i++) {
        
        // Generacion de plataformas en eje X
        let r1 = Math.floor(Math.random() * 3);
        let r2 = Math.floor(Math.random() * 3);
        
        // En caso de coincidir los numeros aleatorios, solo se generará una plataforma
        if(r1 === r2){
            matrix[i][r1] = 1;
        }
        else { // En caso de ser valores diferentes generara dos plataformas en ese eje X
            matrix[i][r1] = 1;
            matrix[i][r2] = 1; 
        }
    }
}

// Funcion en caso de que se colecte un item
function collectItems(player, items) {
    items.disableBody(true, true);

    score += 5;
    scoreString.setText('Marcador: ' + score);
}

function collectTrophy(player, trophy) {
    trophy.disableBody(true, true);

    score += 20;
    scoreString.setText('Marcador: ' + score);
    this.registry.destroy();
    this.events.off();
    this.scene.restart();
}