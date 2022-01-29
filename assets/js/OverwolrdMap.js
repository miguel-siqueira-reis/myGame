import { utils } from "./Utils.js";
import {Person} from "./Person.js";
import OverworldEvent from "./OverworldEvent.js";

export default class OverwolrdMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls;
    this.cutsceneSpaces = config.cutsceneSpaces || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = false;
    if (config.upperSrc) {
      this.upperImage = new Image();
      this.upperImage.src = config.upperSrc;
    }

    this.isCutScenePlaying = false;
  }

  drawLowerImage(ctx, cameraPerson) {
    // ctx.drawImage(this.lowerImage,  85, 600, 800, 1500, utils.calculateCameraX(cameraPerson), utils.calculateCameraY(cameraPerson), 870, 1470);
    ctx.drawImage(this.lowerImage,  20, 20, 192, 192, utils.calculateCameraX(cameraPerson) + 32, utils.calculateCameraY(cameraPerson) + 32, 192 * 2, 192 * 2);

  }

  drawUpperImage(ctx, cameraPerson) {
    this.upperImage && ctx.drawImage(this.upperImage, 20, 20, 192, 192, utils.calculateCameraX(cameraPerson) + 32, utils.calculateCameraY(cameraPerson) + 32, 192 * 2, 192 * 2);
  }

  isSpaceTaken(currentX, currentY, direction) {
    const {x,y} = utils.nextPosition(currentX, currentY, direction);

    return this.walls[`${x},${y}`] || false;
  }

  mountObj() {
    Object.keys(this.gameObjects).forEach(key =>  {
      let object = this.gameObjects[key];

      object.id = key;

      object.mount(this);
    })
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }

  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }

  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const {x, y} = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }

  async startCutscene(events) {
    // start custscene
    this.isCutScenePlaying = true;

    // make the cutsnene
    for (let i = 0; i < events.length; i++) {
      const event = new OverworldEvent({
        map: this,
        event: events[i]
      })
      await event.init();
    }

    // done cutscene
    this.isCutScenePlaying = false;

    // reseat loop bhavior
    Object.values(this.gameObjects).forEach(obj => obj.doBehaviorsEvent(this));
  }

  checkForActionsCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find(object => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
    })

    if (!this.isCutScenePlaying && match && match.tallking.length) {
      this.startCutscene(match.tallking[0].events);
    }
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"];
    const specificCutscene = `${hero.x},${hero.y}`;
    const match = this.cutsceneSpaces[specificCutscene];
    if (!this.isCutScenePlaying && match) {
      this.startCutscene(match[0].events)

      if (match[0].oneTime && match[0].id) {
        Object.keys(this.cutsceneSpaces).forEach(keyCutscene => {
          const cutscene = this.cutsceneSpaces[keyCutscene];
          if (cutscene[0].id === match[0].id) {
            delete this.cutsceneSpaces[keyCutscene];
          }
        });
      }
    }
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
    cutsceneSpaces: {
      [utils.asGridCoord(3, 9)]: [
        {
          id: "intromary",
          oneTime: true,
          events: [
            { who: "npc", type: "walk", direction: "left" },
            { who: "npc", type: "walk", direction: "left" },
            { who: "npc", type: "walk", direction: "left" },
            { who: "npc", type: "textMessage", text: "omori!! I didn't find you anywhere, where were you?" },
            { who: "npc", type: "textMessage", text: "I'm glad you're fine." },
            { who: "npc", type: "walk", direction: "right" },
            { who: "npc", type: "walk", direction: "right" },
            { who: "npc", type: "walk", direction: "right" },
          ]
        }
      ],
      [utils.asGridCoord(4, 8)]: [
        {
          id: "intromary",
          oneTime: true,
          events: [
            { who: "npc", type: "walk", direction: "left" },
            { who: "npc", type: "walk", direction: "left" },
            { who: "npc", type: "walk", direction: "left" },
            { who: "npc", type: "stand", direction: "up" },
            { who: "npc", type: "textMessage", text: "omori!! I didn't find you anywhere, where were you?" },
            { who: "npc", type: "textMessage", text: "I'm glad you're fine." },
            { who: "npc", type: "walk", direction: "right" },
            { who: "npc", type: "walk", direction: "right" },
            { who: "npc", type: "walk", direction: "right" },
          ]
        }
      ],
      [utils.asGridCoord(5, 7)]: [
        {
          id: "intromary",
          oneTime: true,
          events: [
            { who: "npc", type: "walk", direction: "left" },
            { who: "npc", type: "walk", direction: "left" },
            { who: "npc", type: "walk", direction: "up" },
            { who: "npc", type: "stand", direction: "up" },
            { who: "npc", type: "textMessage", text: "omori!! I didn't find you anywhere, where were you?" },
            { who: "npc", type: "textMessage", text: "I'm glad you're fine." },
            { who: "npc", type: "walk", direction: "down" },
            { who: "npc", type: "walk", direction: "right" },
            { who: "npc", type: "walk", direction: "right" },
          ]
        }
      ],
      [utils.asGridCoord(6, 7)]: [
        {
          id: "intromary",
          oneTime: true,
          events: [
            { who: "npc", type: "walk", direction: "left" },
            { who: "npc", type: "walk", direction: "up" },
            { who: "npc", type: "stand", direction: "up" },
            { who: "npc", type: "textMessage", text: "omori!! I didn't find you anywhere, where were you?" },
            { who: "npc", type: "textMessage", text: "I'm glad you're fine." },
            { who: "npc", type: "walk", direction: "down" },
            { who: "npc", type: "walk", direction: "right" },
          ]
        },
      ],
      [utils.asGridCoord(9, 7)]: [
        {
          id: "intromary",
          oneTime: true,
          events: [
            { who: "npc", type: "walk", direction: "right" },
            { who: "npc", type: "walk", direction: "right" },
            { who: "npc", type: "walk", direction: "up" },
            { who: "npc", type: "stand", direction: "up" },
            { who: "npc", type: "textMessage", text: "omori!! I didn't find you anywhere, where were you?" },
            { who: "npc", type: "textMessage", text: "I'm glad you're fine." },
            { who: "npc", type: "walk", direction: "down" },
            { who: "npc", type: "walk", direction: "left" },
            { who: "npc", type: "walk", direction: "left" },
          ]
        },
      ],
      [utils.asGridCoord(10, 7)]: [
        {
          id: "intromary",
          oneTime: true,
          events: [
            { who: "npc", type: "walk", direction: "right" },
            { who: "npc", type: "walk", direction: "right" },
            { who: "npc", type: "walk", direction: "right" },
            { who: "npc", type: "walk", direction: "up" },
            { who: "npc", type: "stand", direction: "up" },
            { who: "npc", type: "textMessage", text: "omori!! I didn't find you anywhere, where were you?" },
            { who: "npc", type: "textMessage", text: "I'm glad you're fine." },
            { who: "npc", type: "walk", direction: "down" },
            { who: "npc", type: "walk", direction: "left" },
            { who: "npc", type: "walk", direction: "left" },
            { who: "npc", type: "walk", direction: "left" },
          ]
        },
      ],
      [utils.asGridCoord(9, 8)]: [
        {
          id: "intromary",
          oneTime: true,
          events: [
            { who: "npc", type: "walk", direction: "right" },
            { who: "npc", type: "walk", direction: "right" },
            { who: "npc", type: "walk", direction: "right" },
            { who: "npc", type: "walk", direction: "up" },
            { who: "npc", type: "stand", direction: "up" },
            { who: "npc", type: "textMessage", text: "omori!! I didn't find you anywhere, where were you?" },
            { who: "npc", type: "textMessage", text: "I'm glad you're fine." },
            { who: "npc", type: "walk", direction: "down" },
            { who: "npc", type: "walk", direction: "left" },
            { who: "npc", type: "walk", direction: "left" },
            { who: "npc", type: "walk", direction: "left" },
          ]
        },
      ]
    },
    gameObjects: {
      hero: new Person({
        x: utils.widthGrid(7),
        y: utils.widthGrid(4),
        player: true,
      }),
      npc: new Person({
        src: "/assets/imagens/mari.png",
        x: utils.widthGrid(7),
        y: utils.widthGrid(9),
        player: false,
        direction: "up",
        behaviorLoop: [
          { type: "stand", direction: "up", time: 700 },
          { type: "stand", direction: "left", time: 700 },
          { type: "stand", direction: "up", time: 700 },
          { type: "stand", direction: "right", time: 700 },

        ],
        tallking: [
          {
            events: [
              { type: "textMessage", text: "I'm waiting for the others.", turnFaceToHero: "npc" },
              { type: "textMessage", text: "I'm starting to get worried." }
            ]
          }
        ]
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