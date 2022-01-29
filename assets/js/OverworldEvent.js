import TextMessage from "./TextMessage.js";
import {utils} from "./Utils.js";

export default class OverworldEvent {
  constructor({ map, event }) {
    this.map = map;
    this.event = event;
  }

  init() {
    return new Promise(resolve => {
      this[this.event.type](resolve)
    })
  }

  stand(resolve) {
    const who = this.map.gameObjects[this.event.who];

    who.startBehavior({
      map: this.map
    }, {
      type: "stand",
      direction: this.event.direction,
      time: this.event.time
    })

    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandComplete", completeHandler)
        resolve();
      }
    }

    document.addEventListener("PersonStandComplete", completeHandler)
  }

  walk(resolve) {
    const who = this.map.gameObjects[this.event.who];

    who.startBehavior({
      map: this.map
    }, {
      type: "walk",
      direction: this.event.direction,
      retry: true
    })

    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler)
        resolve();
      }
    }

    document.addEventListener("PersonWalkingComplete", completeHandler)
  }

  textMessage(resolve) {

    if (this.event.turnFaceToHero) {
      const obj = this.map.gameObjects[this.event.turnFaceToHero];
      obj.direction = utils.oopositionDirection(this.map.gameObjects["hero"].direction);
    }

    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve()
    })

    message.init(document.querySelector(".game"))
  }
}