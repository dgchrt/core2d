export class Point {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  get position() {
    return this;
  }

  setX(x: number) {
    this.x = x;
    return this;
  }

  setY(y: number) {
    this.y = y;
    return this;
  }

  setPosition(point: Point) {
    this.x = point.x;
    this.y = point.y;
    return this;
  }

  set position(point) {
    this.setPosition(point);
  }
}
