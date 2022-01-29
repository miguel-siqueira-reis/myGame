import Sprite from "./Sprite.js"
import OverworldEvent from "./OverworldEvent.js";

export default class GameObject {
  constructor(config = false) {
    this.id = null;
    this.isMouted = false;
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

    this.behaviorLoop =  config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;

    this.tallking = config.tallking || [];
  }

  mount(map) {
    this.isMouted = true;
    map.addWall(this.x, this.y);

    setTimeout(_ => {
      this.doBehaviorsEvent(map);
    }, 10)

  }

  update() {

  }

  async doBehaviorsEvent(map) {
    if (map.isCutScenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
      return;
    }

    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    const eventHandler = new OverworldEvent({ map, event: eventConfig })
    await eventHandler.init();

    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    this.doBehaviorsEvent(map);
  }
}