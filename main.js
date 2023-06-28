import nivel1 from "./public/scenes/nivel1.js";
import precarga from "./public/scenes/precarga.js";
import Win from "./public/scenes/Win.js";
import GameOver from "./public/scenes/GameOver.js";
import menu from "./public/scenes/menu.js";
import fin from "./public/scenes/fin.js"
// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [precarga,menu,Win,GameOver,fin, nivel1,]
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);