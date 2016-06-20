import {Point} from "./Point";

export class Box {
  private _left: number;
  private _right: number;
  private _top: number;
  private _bottom: number;
  private _width: number;
  private _height: number;
  private _center: Point;

  /*
   * Assumption: 2 items of each of the following sets must be given in the param
   * (left | right | width) and (top | bottom | height)
   *
   * @param {Point} point The top left corner of the position.
   */
  constructor({top, bottom, left, right, width, height}: { top?: number, bottom?: number, left?: number, right?: number, width?: number, height?: number } = { top: 0, bottom: 0, left: 0, right: 0 }) {
    this._center = new Point();

    if (left === undefined) {
      this._right = right || 0;
      this._width = width || 0;
      this._left = this._right - this._width;
    } else if (right === undefined) {
      this._left = left;
      this._width = width || 0;
      this._right = this._left + this._width;
    } else {
      this._left = left;
      this._right = right;
      this._width = this._right - this._left;
    }

    if (top === undefined) {
      this._bottom = bottom || 0;
      this._height = height || 0;
      this._top = this._bottom - this._height;
    } else if (bottom === undefined) {
      this._top = top;
      this._height = height || 0;
      this._bottom = this._top + this._height;
    } else {
      this._top = top;
      this._bottom = bottom;
      this._height = this._bottom - this._top;
    }

    this._center.x = this.left + this.width / 2;
    this._center.y = this.top + this.height / 2;

    //todo throw error if left > right, or width < 0
    //todo throw error if top > bottom, or height < 0
  }


  get top(): number { return this._top; }
  get left(): number { return this._left; }
  get width(): number { return this._width; }
  get height(): number { return this._height; }
  get right(): number { return this._right; }
  get bottom(): number { return this._bottom; }
  get center(): Point { return this._center; }
}
