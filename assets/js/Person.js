import GameObject from "./GameObject.js";

export class Person extends GameObject {
    constructor(config) {
      super(config);
      this.movingProgressRemaining = 0;

      this.speed = 1;

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
        if (this.player && state.arrow) {
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
          return;
        }
        this.movingProgressRemaining = 16;
      }
    }

    updatePosition() {
      const [property, change] = this.directionsUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 1;
    }

    updateAnimation() {
      if (this.movingProgressRemaining > 0) {
        this.sprite.setAnimationKey("walk-" + this.direction);
        return;
      }
      this.sprite.setAnimationKey("idle-" + this.direction);
    }
}