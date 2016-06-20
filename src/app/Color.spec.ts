/* tslint:disable:no-unused-variable */

import {    describe, expect, it} from '@angular/core/testing';
import { Color } from './Color';

describe('Color: class', () => {
  let c = new Color(0, 0, 0);

  it('constructor should create an object', () => {
    expect(c).toBeTruthy();
  });

  it('should have rgb = (0,0,0)', () => {
    expect(c.rgb).toEqual('rgb(0, 0, 0)');
  });

  it('should have red, blue, and green of 0', () => {
    expect(c.r).toEqual(0);
    expect(c.g).toEqual(0);
    expect(c.b).toEqual(0);
  })

  it('should have an undefined alpha', () => {
    expect(c.a).toBeUndefined();
  });


});
