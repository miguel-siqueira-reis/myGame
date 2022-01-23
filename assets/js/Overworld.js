import OverwolrdMap from "./OverwolrdMap.js";
import {MoveInput} from "./MoveImput.js";

export default class Overwolrd {
  constructor(config) {
    this.element = config.el;
    this.canvas = this.element.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.ctx.imageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.mozImageSmoothingEnabled = false;
    this.map = null;
  }

  init() {
    this.map = new OverwolrdMap(window.OverWorldMapas.nature);

    this.moveInput = new MoveInput();
    this.moveInput.init();

    this.startGameLoop(70);

  }

  startGameLoop(fps) {
    const fpsInterval = 1000 / fps;
    let then = Date.now();
    const startTime = then;

    const step = () => {

      requestAnimationFrame(() => {
        step();
      })

      const now = Date.now();
      const elapsed = now - then;

      // if enough time has elapsed, draw the next frame

      if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const cameraPerson = this.map.gameObjects.hero;

        Object.values(this.map.gameObjects).forEach(object => {
          object.update({
            arrow: this.moveInput.direction,
            map: this.map
          });
        });

        this.map.drawLowerImage(this.ctx, cameraPerson);

        Object.values(this.map.gameObjects).forEach(object => {
          object.sprite.draw(this.ctx, cameraPerson);
        });

        this.map.drawUpperImage(this.ctx, cameraPerson);
      }
    }
    step();
  }


}