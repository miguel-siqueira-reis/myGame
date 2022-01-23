import Sprite from "./Sprite.js"

export default class GameObject {
  constructor(config = false) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.spriteWidth = config.spriteWidth || 32;
    this.spriteHeight = config.spriteHeight || 32;
    this.screenWidth = config.screenWidth || 32;
    this.screenHeight = config.screenHeight || 32;

    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "/assets/imagens/omorisprite.png",

    });
  }

  update() {

  }
}