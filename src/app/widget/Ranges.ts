import {Theme} from "../Theme.interface";
import {DataBlock} from "../forecast.io.interface";

export interface Range { max: number, min: number }

export class Ranges {
  private _temperature: Range = { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER };
  private _ozone: Range = { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER };
  private _pressure: Range = { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER };
  private _windSpeed: Range = { min: 0, max: Number.MIN_SAFE_INTEGER };
  private _precipAccumulation: Range = { min: 0, max: Number.MIN_SAFE_INTEGER };

  constructor(db: DataBlock, theme: Theme) {

    let pertinentOptions = [
      { title: 'ozone', range: '_ozone' },
      { title: 'windSpeed', range: '_windSpeed' },
      { title: 'pressure', range: '_pressure' },
      { title: 'precipAccumulation', range: '_precipAccumulation' },
      { title: 'dewPoint', range: '_temperature' },
      { title: 'temperature', range: '_temperature' },
      { title: 'apparentTemperature', range: '_temperature' },
      { title: 'temperatureMax', range: '_temperature' },
      { title: 'temperatureMin', range: '_temperature' },
      { title: 'apparentTemperatureMax', range: '_temperature' },
      { title: 'apparentTemperatureMin', range: '_temperature' },
    ];

    //Remove options that aren't needed.
    pertinentOptions = pertinentOptions.filter(o => theme.options.some(to => to.title === o.title));

    //Update all of the pertient ranges.
    db.data.forEach(d => {
      pertinentOptions.forEach(o => {
        let range = this[o.range];
        if (d[o.title]) {
          let opt = d[o.title];
          if (opt > range.max) {
            range.max = opt;
          }
          if (opt < range.min) {
            range.min = opt;
          }
        }
      });
    });

    //If the option doesn't exist in the theme, set the range object to null.
    ['_temperature', '_ozone', '_pressure', '_windSpeed', '_precipAccumulation'].forEach(r => {
      if (this[r].max === Number.MIN_SAFE_INTEGER) {
        this[r] = null;
      }
    });

    if (this._pressure) {  //TODO explain how pressure gets scaled differently
      const ATM = 1013.25;  //1 ATM === 1013.25 mbar
      const BAND_SIZE = 37;  //band_size is the number of mbars to get whole number of inhg plus any 'padding'
      const MAX_DEVIATION = Math.max(Math.abs(this._pressure.max - ATM), Math.abs(this._pressure.min - ATM));

      this._pressure.max = ATM + Math.ceil(MAX_DEVIATION / ATM) * BAND_SIZE;
      this._pressure.min = ATM - Math.ceil(MAX_DEVIATION / ATM) * BAND_SIZE;
    }
  }

  get temperature() {
    return this._temperature;
  }

  get ozone() {
    return this._ozone;
  }

  get pressure() {
    return this._pressure
  }

  get windSpeed() {
    return this._windSpeed
  }

  get precipAccumulation() {
    return this._precipAccumulation
  }
}
