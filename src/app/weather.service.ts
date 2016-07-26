import {Injectable} from '@angular/core';
import {ForecastIO} from "./forecast.io.interface";

@Injectable()
export class WeatherService {
  data: ForecastIO;
  api = `c5f42d85c93f3a489363a8f410a78b57`;
  latitude: number;
  longitude: number;
  _ratio: number;

  get ratio(): number {
    return +this._ratio;
  }
  set ratio(val: number) {
    this._ratio = +val;
    localStorage.setItem('ratio', this._ratio.toString());
  }

  constructor() {
    let d = localStorage.getItem('data');
    this.data = (d ? JSON.parse(d) : null);
    this.latitude = +localStorage.getItem('latitude');
    this.longitude = +localStorage.getItem('longitude');
    this.ratio = +localStorage.getItem('ratio') || 2;
  }

  getWeather(): Promise<ForecastIO> {
    if (this.data) {
      return new Promise((resolve, reject) => resolve(this.data));
    } else if (this.latitude && this.longitude) {
      return this.refresh();
    } else {
      return this.getLocation()
        .then(l => new Promise(resolve => { this.latitude = l.latitude, this.longitude = l.longitude; resolve(); }))
        .then(() => this.refresh());
    }
  }


  getLocation(): Promise<{ latitude: number, longitude: number }> {
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        //success
        p => resolve(p.coords),
        //error
        () => resolve({ latitude: 39.828357, longitude: -98.579460 }),
        //options
        { enableHighAccuracy: true }
      );
    });
  }


  saveLocation(location: { latitude: number, longitude: number }) {
    localStorage.setItem('latitude', location.latitude.toString());
    localStorage.setItem('longitude', location.longitude.toString());
  }


  refresh(): Promise<ForecastIO> {
    this.saveLocation(this);

    return new Promise(resolve => {
      let callback = 'apiCallback';
      let self = this;
      window[callback] = function (weatherData: ForecastIO) {
        //Set the moonPhase for each day to the corresponding midnight hourly data.
        weatherData.hourly.data.forEach(h => {
          if (new Date(h.time * 1000).getUTCHours() + weatherData.offset === 0) {  //midnight
            h.moonPhase = weatherData.daily.data.find(d => d.time === h.time).moonPhase;  //add moonPhase to midnight hour
          }
        });

        localStorage.setItem('data', JSON.stringify(self.data = weatherData));
        resolve(weatherData);
      }
      let apiScript = document.createElement('script');
      apiScript.src = `https://api.forecast.io/forecast/${this.api}/${this.latitude},${this.longitude}?callback=${callback}&exclude=flags,minutely`;
      document.body.appendChild(apiScript);
    });
  }
}
