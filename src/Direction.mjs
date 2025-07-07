"use strict";

export class Direction {
  constructor() {
    this.bottom = false;
    this.left = false;
    this.right = false;
    this.top = false;
  }

  setBottom(isBottom = true) {
    this.bottom = isBottom;
    return this;
  }

  setLeft(isLeft = true) {
    this.left = isLeft;
    return this;
  }

  setRight(isRight = true) {
    this.right = isRight;
    return this;
  }

  setTop(isTop = true) {
    this.top = isTop;
    return this;
  }
}
