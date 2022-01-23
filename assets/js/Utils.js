export const utils = {
  widthGrid(n) {
    return n * 16;
  },
  asGridCoord(x, y) {
    return `${x * 16},${y * 16}`;
  },
  maxPosition(initialX, initialY, direction) {
    let x = initialX;
    let y = initialY;
    const size = 16;

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
    return this.widthGrid(10.5) - cameraPerson.x;
  },
  cxalculateCameraY(cameraPerson) {
    return this.widthGrid(6) - cameraPerson.y;
  }
}