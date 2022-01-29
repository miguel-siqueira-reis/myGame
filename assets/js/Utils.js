export const utils = {
  widthGrid(n) {
    return n * 32;
  },
  asGridCoord(x, y) {
    return `${x * 32},${y * 32}`;
  },
  nextPosition(initialX, initialY, direction) {
    let x = initialX;
    let y = initialY;
    const size = 32;

    if (direction === "left") {
      x -= size;
    } else if (direction === "right") {
      x += size;
    } else if (direction === "up") {
      y -= size;
    } else if (direction === "down") {
      y += size;
    }
    return {x, y};
  },
  calculateCameraX(cameraPerson) {
    return this.widthGrid(5.25) - cameraPerson.x;
  },
  calculateCameraY(cameraPerson) {
    return this.widthGrid(3) - cameraPerson.y;
  },
  emitEvent(name, detail) {
    const event = new CustomEvent(name, {
      detail
    });

    document.dispatchEvent(event);
  },

  oopositionDirection(direction) {
    if (direction === "left") return "right";
    if (direction === "right") return "left";
    if (direction === "up") return "down";
    return "up";
  }
}