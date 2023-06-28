export default class precarga extends Phaser.Scene {
    // escena para optimiozar tiempos
    // carga el preload solo una vez y sirve para todo el juego
    constructor() {
      // key of the scene
      super("precarga");
    }
  
    preload() {
      // load assets
      this.load.tilemapTiledJSON("map", "./public/tilemap/basic.json");
      this.load.image("bola", "./public/assets/bola.png");
      this.load.image("menu", "./public/assets/menu.png");
      this.load.image("plato", "./public/assets/plato.png");
      this.load.image("cuchillo", "./public/assets/cuchillo.png");
      this.load.image("tilesPlataforma", "./public/assets/platform_atlass.png");
      this.load.image("tilesFondo", "./public/assets/fondo.png");
      this.load.image("botomcredito", "./public/assets/botomcredito.png");
      this.load.image("botompress", "./public/assets/botompress.png");
      this.load.image("botonAjustes", "./public/assets/botonAjustes.png");
      this.load.image("mate", "./public/assets/mate.png");
      this.load.image("enemigo", "./public/assets/gato2.png");
      this.load.image("win", "./public/assets/ganar.jpeg");
      this.load.image("gameover", "./public/assets/perder.jpeg");
      this.load.spritesheet("gato", "./public/assets/gato.png", {
        frameWidth: 32,
        frameHeight: 48,
      });

    }
  
    create() {
      //  Our player animations, turning, walking left and walking right.
      // se crea una sola vez, para que no de error en el restart de la escena
      
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("gato", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "turn",
        frames: [{ key: "gato", frame: 4 }],
        frameRate: 20,
      });
  
      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("gato", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
      });
  
      // init scene juego
      this.scene.start("menu");
    }
  }