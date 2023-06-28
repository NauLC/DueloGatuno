export default class nivel1 extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("nivel1");
    }
  
    init(datos) {
      // this is called before the scene is created
      // init variables
      // take data passed from other scenes
      // data object param {}
      this.isWin = false
      this.gameOver = false
      console.log("Prueba !");
      this.cantBolas = datos.datos;
    }
  
    create() {
      // todo / para hacer: texto de puntaje
      const map = this.make.tilemap({ key: "map" });
      
      const capaFondo = map.addTilesetImage("fondo", "tilesFondo");
    const capaPlataform = map.addTilesetImage(
      "platforma",
      "tilesPlataforma"
    );

    
    const fondoLayer = map.createLayer("background", capaFondo, 0, 0);
    const plataformaLayer = map.createLayer("platform", capaPlataform, 0, 0);
    const objectosLayer = map.getObjectLayer("objects");
  
      plataformaLayer.setCollisionByProperty({ collision: true });
  
      console.log("spawn point player", objectosLayer);
  
      // crear el jugador
     
      let spawnPoint = map.findObject("objects", (obj) => obj.name === "player");
      console.log(spawnPoint);
      // The player and its settings
      this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "gatoN");
  
      
      this.jugador.setBounce(0.1);
      this.jugador.setCollideWorldBounds(true);
  
      //spawnPoint = map.findObject("objects", (obj) => obj.name === "salida");
      //console.log("spawn point salida ", spawnPoint);
      //if (spawnPoint) {
       // this.salida = this.physics.add
        //  .sprite(spawnPoint.x, spawnPoint.y, "salida")
         // .setScale(0.2);
      //}
  
      
      this.cursors = this.input.keyboard.createCursorKeys();
  
      // Create empty group of starts
      this.bolas = this.physics.add.group();
      this.platos = this.physics.add.group({
        immovable: true,
        allowGravity: false,
      });
      this.enemigos = this.physics.add.group({
        immovable: true,
        allowGravity: false,
      });
      
      objectosLayer.objects.forEach((objData) => {
      
  
        const { x = 0, y = 0, name } = objData;
        switch (name) {
          case "bola": {
            
            const bola = this.bolas.create(x, y, "bola");
            break;
          }
          case "plato": {
            const plato = this.platos.create(x, y, "plato").setBounce(1, 1);
            break;
          }
          case "enemigo": {
            const enemigo = this.enemigos.create(x, y, "enemigo").setBounce(1, 1).setScale(0.090);
            break;
          }
        }
      });
      //this.salida.visible = false;
      this.physics.add.collider(this.platos, plataformaLayer);
      this.physics.add.collider(
        this.platos,
        this.jugador,
        this.platokill,
        null,
        this
      );
  
      this.physics.add.collider(this.jugador, plataformaLayer);
      this.physics.add.collider(this.bolas, plataformaLayer);
      this.physics.add.collider(
        this.jugador,
        this.bolas,
        this.recolectarbolas,
        null,
        this
      );
      if (this.salida) {
        this.physics.add.collider(this.salida, plataformaLayer);
        this.physics.add.overlap(
          this.jugador,
          this.salida,
          this.esVencedor,
          () => this.cantEstrellas >= 1, // condicion de ejecucion
          this
        );
      }
      this.physics.add.collider(this.enemigos, plataformaLayer);
    this.physics.add.collider(
      this.jugador,
      this.enemigos,
      this.enemigoKill,
      null,
      this
    );
  
      /// mostrar bolas en pantalla
      this.cantidadBolasTexto = this.add.text(
        15,
        15,
        `Bolas recolectadas: 0`,
        { fontSize: "15px", fill: "#FFFFFF" }
      );
  
      this.timer = 120;
      this.timeText = this.add.text(730, 20, this.timer, {
        fontSize: "35px",
        fontStyle: "bold",
        fill: "#FFFFFF",
      });
      this.time.addEvent({
        delay: 1000,
        callback: this.onSecond,
        callbackScope: this,
        loop: true,
      });
      //velocidad platos
      this.platos.setVelocity(200, 200);
      //moving X enemigo
      this.enemigos.setVelocityX(300);
  
      this.cameras.main.startFollow(this.jugador);
      this.physics.world.setBounds(0, 0, map.widthInPixels, map.heigthInPixels);
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heigthInPixels);
  
      this.cantidadBolasTexto.setScrollFactor(0);
      this.timeText.setScrollFactor(0);
    }
  
    update() {
      // update game objects
      // check input
      //move left
      if (this.cantBolas > 2){
        this.scene.start("Win");
      }
      if (this.gameOver){
        this.scene.start("GameOver");
      }
      if (this.cursors.left.isDown) {
        this.jugador.setVelocityX(-160);
        this.jugador.anims.play("left", true);
      }
      //move right
      else if (this.cursors.right.isDown) {
        this.jugador.setVelocityX(160);
        this.jugador.anims.play("right", true);
      }
      //stop
      else {
        this.jugador.setVelocityX(0);
        this.jugador.anims.play("turn");
      }
  
      //jump
      if (this.cursors.up.isDown && this.jugador.body.blocked.down) {
        this.jugador.setVelocityY(-330);
      }
    }
  
    recolectarBola(jugador, bolas) {
      this.bolas.disableBody(true, true);
  
      // todo / para hacer: sumar puntaje
      
      if (this.bolas.getTotalUsed() === 0) {
        this.salida.visible = true;
      }
  
      this.cantBolas++;
  
      this.cantidadBolasTexto.setText(
        "Bolas recolectadas: " + this.cantBolas
      );
    }
    platokill(jugador, platos) {
      this.scene.restart();
    }
    enemigoKill(jugador, enemigos) {
         this.scene.restart();
      }
    
  
    esVencedor(jugador, salida) {
      
      
  
      //console.log("bolas recolectadas", this.cantBolas);
  
      this.scene.start("fin", {
        cantBolas: this.cantBolas,
        y: "este es un dato de muestra",
        z: "este es otro atributo enviado a otro escena",
      });
      this.scene.start("fin", {
        datos: this.cantBolas,
      });
    }
  
    onSecond() {
      this.timer--;
      this.timeText.setText(this.timer);
      if (this.timer <= 0) {
        this.gameOver = true;
      }
    }
  }