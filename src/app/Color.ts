export class Color {
  constructor(public r: number, public g: number, public b: number, public a?: number) {
  }

  get rgba() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  get rgb() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  static get black() {
    return new Color(0, 0, 0);
  }

  static get skyBlue() {
    return new Color(0,128,255);
  }

  static get white() {
    return new Color(255, 255, 255, 1);
  }

  static getColor(c: { r: number, g: number, b: number, a?: number }): Color {
    return new Color(c.r, c.g, c.b, c.a);
  }

  static get whiteFifty() {
    return new Color(255, 255, 255, .5);
  }

  copyOf() {
    return new Color(this.r, this.g, this.b, this.a);
  }
}
