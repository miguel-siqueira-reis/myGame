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
    // ctx.drawImage(this.lowerImage,  85, 600, 800, 1500, utils.calculateCameraX(cameraPerson), utils.calculateCameraY(cameraPerson), 870, 1470);
    ctx.drawImage(this.lowerImage,  20, 20, 192, 192, utils.calculateCameraX(cameraPerson) + 32, utils.calculateCameraY(cameraPerson) + 32, 192 * 2, 192 * 2);

  }

  drawUpperImage(ctx, cameraPerson) {
    this.upperImage && ctx.drawImage(this.upperImage, 20, 20, 192, 192, utils.calculateCameraX(cameraPerson) + 32, utils.calculateCameraY(cameraPerson) + 32, 192 * 2, 192 * 2);
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
  teste: {
    lowerSrc: "/imagensOther/maps/DemoLower.png",
    upperSrc: "/imagensOther/maps/DemoUpper.png",
    walls: {
      [utils.asGridCoord(7, 9)]: true,

      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(8, 7)]: true,

      [utils.asGridCoord(0, 1)]: true,
      [utils.asGridCoord(0, 2)]: true,
      [utils.asGridCoord(0, 3)]: true,
      [utils.asGridCoord(0, 4)]: true,
      [utils.asGridCoord(0, 5)]: true,
      [utils.asGridCoord(0, 6)]: true,
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(0, 8)]: true,
      [utils.asGridCoord(0, 9)]: true,

      [utils.asGridCoord(1, 3)]: true,
      [utils.asGridCoord(2, 3)]: true,
      [utils.asGridCoord(3, 3)]: true,
      [utils.asGridCoord(4, 3)]: true,
      [utils.asGridCoord(5, 3)]: true,
      [utils.asGridCoord(6, 3)]: true,
      [utils.asGridCoord(7, 3)]: true,
      [utils.asGridCoord(8, 3)]: true,
      [utils.asGridCoord(9, 3)]: true,
      [utils.asGridCoord(10, 3)]: true,


      [utils.asGridCoord(6, 4)]: true,
      [utils.asGridCoord(8, 4)]: true,

      [utils.asGridCoord(11, 1)]: true,
      [utils.asGridCoord(11, 2)]: true,
      [utils.asGridCoord(11, 3)]: true,
      [utils.asGridCoord(11, 4)]: true,
      [utils.asGridCoord(11, 5)]: true,
      [utils.asGridCoord(11, 6)]: true,
      [utils.asGridCoord(11, 7)]: true,
      [utils.asGridCoord(11, 8)]: true,
      [utils.asGridCoord(11, 9)]: true,

      [utils.asGridCoord(1, 10)]: true,
      [utils.asGridCoord(2, 10)]: true,
      [utils.asGridCoord(3, 10)]: true,
      [utils.asGridCoord(4, 10)]: true,
      [utils.asGridCoord(5, 11)]: true,
      [utils.asGridCoord(6, 10)]: true,
      [utils.asGridCoord(7, 10)]: true,
      [utils.asGridCoord(8, 10)]: true,
      [utils.asGridCoord(9, 10)]: true,
      [utils.asGridCoord(10, 10)]: true,


      // [utils.asGridCoord(12.5, 6)]: true,
      // [utils.asGridCoord(14, 8)]: true,
      // [utils.asGridCoord(14, 9)]: true
    },
    gameObjects: {
      npmc: new Person({
        x: utils.widthGrid(7),
        y: utils.widthGrid(9),
        player: false,
        direction: "up"

      }),
      hero: new Person({
        x: utils.widthGrid(7),
        y: utils.widthGrid(4),
        player: true,
      })
    }
  },
  nature: {
    lowerSrc: "/assets/imagens/scenery/cenario.png",
    walls: {
      [utils.asGridCoord(13, 6)]: true,
      // [utils.asGridCoord(12.5, 6)]: true,
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