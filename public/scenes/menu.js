export default class menu extends Phaser.Scene {
    constructor() {
      super("menu");
    }
  
    create() {
      this.add.image(400, 300, "menu").setScale(1.4);
      
      let startButton = this.add.image(400, 400, "botompress").setInteractive();
  
      startButton.on("pointerdown", () => {
        startButton.setTexture("botompress");
      });
  
      startButton.on("pointerup", () => {
    
        this.scene.start("nivel1");
      });
  
      startButton.on("pointerout", () => {
        startButton.setTexture("botompress");
      });
    }
  }