import { utils } from "./Utils.js";

export default class Sprite {
  constructor(config) {
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }

    this.shadow = new Image();
    this.shadow.src = "/assets/imagens/shadow.png";
    this.shadow.onload = () => {
      this.shadowLoad = true;
    }
    // 32x32
    this.animations = config.animations || {
      "idle-down": [ [1,0] ],
      "idle-left": [ [1,1] ],
      "idle-right": [ [1,2] ],
      "idle-up": [ [1,3] ],

      "walk-down": [ [0,0], [1,0], [2,0], [1,0] ],
      "walk-left": [ [0,1], [1,1], [2,1], [1,1] ],
      "walk-right": [ [0,2], [1,2], [2,2], [1,2] ],
      "walk-up": [ [0,3], [1,3], [2,3], [1,3] ],


    }
    this.currentAnimation = config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 10;
    this.animationFrameProgress = this.animationFrameLimit;

    this.gameObject  = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  setAnimationKey(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx, cameraPearson) {
    let x = this.gameObject.x - 8 + utils.calculateCameraX(cameraPearson);
    let y = this.gameObject.y - 18 + utils.calculateCameraY(cameraPearson);

    this.shadowLoad && ctx.drawImage(this.shadow, x, y);

    const [frameX, frameY] = this.frame;

    this.isLoaded && ctx.drawImage(this.image,
      frameX * 32, frameY * 32,
      this.gameObject.spriteWidth, this.gameObject.spriteHeight,
      x, y,
      this.gameObject.screenWidth, this.gameObject.screenHeight
    );

    this.updateAnimationProgress();
  }
}