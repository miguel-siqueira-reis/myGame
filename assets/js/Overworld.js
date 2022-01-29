import OverwolrdMap from "./OverwolrdMap.js";
import {MoveInput} from "./MoveImput.js";
import KeyPressLissener from "./KeyPressLissener.js";

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
    this.map = new OverwolrdMap(window.OverWorldMapas.teste);
    this.map.mountObj();

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.moveInput = new MoveInput();
    this.moveInput.init();

    this.startGameLoop(70);

    // this.map.startCutscene([
    //   { type: "textMessage", text: "hello, world!!" }
    // ])

  }

  bindActionInput() {
    new KeyPressLissener("Enter", () => {
      this.map.checkForActionsCutscene();
    });
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", e => {
      if (e.detail.whoId === "hero") {
        this.map.checkForFootstepCutscene();
      }
    })
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

      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const cameraPerson = this.map.gameObjects.hero;

        Object.values(this.map.gameObjects).sort((a,b) => {
          return a.y - b.y;
        }).forEach(object => {
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