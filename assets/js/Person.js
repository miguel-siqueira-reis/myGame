import GameObject from "./GameObject.js";
import { utils } from "./Utils.js";

export class Person extends GameObject {
    constructor(config) {
      super(config);
      this.movingProgressRemaining = 0;
      this.isStanding = false;

      this.player = config.player || false;

      this.directionsUpdate = {
        "up": ["y", -2],
        "down": ['y', 2],
        "left": ["x", -2],
        "right": ["x", 2]
      }
    }

    update(state) {
      if (this.movingProgressRemaining > 0) {
        this.updatePosition();
      } else {
        if (!state.map.isCutScenePlaying && this.player && state.arrow) {
          this.startBehavior(state, {
            type: "walk",
            direction: state.arrow
          });
        }
        this.updateAnimation(state);
      }
    }

    startBehavior(state, behavior) {
      this.direction = behavior.direction;
      if (behavior.type === "walk") {
        if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
          behavior.retry && setTimeout(_ => {
            this.startBehavior(state, behavior);
          }, 10)

          return;
        }
        state.map.moveWall(this.x, this.y, this.direction);
        this.movingProgressRemaining = 16;
        this.updateAnimation(state);
      }

      if (behavior.type === "stand") {
        this.isStanding = true;
        setTimeout(_ => {
          utils.emitEvent("PersonStandComplete", {
            whoId: this.id
          })
          this.isStanding = false;
        }, behavior.time)
      }
    }

    updatePosition() {
      const [property, change] = this.directionsUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 1;

      if (this.movingProgressRemaining === 0) {
        utils.emitEvent("PersonWalkingComplete", {
          whoId: this.id
        })
      }
    }

    updateAnimation() {
      if (this.movingProgressRemaining > 0) {
        this.sprite.setAnimationKey("walk-" + this.direction);
        return;
      }
      this.sprite.setAnimationKey("idle-" + this.direction);
    }
}