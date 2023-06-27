export default class Precarga extends Phaser.Scene {
    // escena para optimiozar tiempos
    // carga el preload solo una vez y sirve para todo el juego
    constructor() {
      // key of the scene
      super("precarga");
    }
  
    preload() {
      // load assets
      this.load.tilemapTiledJSON("map", "./public/timelap/level1.json");
      this.load.image("bola", "./public/assets/bola.png");
      this.load.image("menu", "./public/assets/menu.png");
      this.load.image("plato", "./public/assets/plato.png");
      this.load.image("cuchillo", "./public/assets/cuchillo.png");
      this.load.image("bola", "./public/assets/bola.png");
      this.load.image("botomcredito", "./public/assets/botomcredito.png");
      this.load.image("botompress", "./public/assets/botompress.png");
      this.load.image("botonAjustes", "./public/assets/botonAjustes.png");
      this.load.image("mate", "./public/assets/mate.png");

      this.load.spritesheet("gato", "./public/images/spritesheet.png", {
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