import { utils } from "./Utils.js";
import {Person} from "./Person.js";

export default class OverwolrdMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls;

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = false;
    if (config.upperSrc) {
      this.upperImage = new Image();
      this.upperImage.src = config.upperSrc;
    }
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(this.lowerImage,  85, 600, 800, 1500, utils.calculateCameraX(cameraPerson), utils.cxalculateCameraY(cameraPerson), 870, 1470);
  }

  drawUpperImage(ctx, cameraPerson) {
    this.upperImage && ctx.drawImage(this.upperImage,  0, 0);
  }

  isSpaceTaken(currentX, currentY, direction) {
    const {x,y} = utils.maxPosition(currentX, currentY, direction);

    return this.walls[`${x},${y}`] || false;
  }
}

window.OverWorldMapas = {
  // whiteSpace: {
  //
  // },
  nature: {
    lowerSrc: "/assets/imagens/scenery/cenario.png",
    walls: {
      [utils.asGridCoord(13, 6)]: true,
      [utils.asGridCoord(12.5, 6)]: true,
      // [utils.asGridCoord(14, 8)]: true,
      // [utils.asGridCoord(14, 9)]: true
    },
    upperSrc: false,
    gameObjects: {
      npmc: new Person({
        x: utils.widthGrid(13),
        y: utils.widthGrid(6),
        player: false
      }),
      hero: new Person({
        x: utils.widthGrid(11),
        y: utils.widthGrid(6),
        player: true,
      })
    }
  },
}