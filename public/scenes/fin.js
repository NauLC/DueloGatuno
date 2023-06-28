export default class fin extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("fin");
    }
  
    init(data) {
      // this is called before the scene is created
      // init variables
      // take data passed from other scenes
      // data object param {}
      console.log(data);
      this.cantBolas = data.cantidadBolas;
    }
  
    create() {
      this.cantidadBolasTexto = this.add.text(
        15,
        15,
        "Bolas recolectadas: " + this.cantBolas,
        { fontSize: "15px", fill: "#FFFFFF" }
      );
    }
  }