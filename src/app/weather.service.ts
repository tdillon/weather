import {Injectable} from '@angular/core';
import {ForecastIO} from "./forecast.io.interface";

@Injectable()
export class WeatherService {
  data: ForecastIO;
  apikey: string;
  latitude: number;
  longitude: number;

  constructor() {
    let d = localStorage.getItem('data');
    this.data = (d ? JSON.parse(d) : null);
    this.apikey = localStorage.getItem('apikey');
    this.latitude = +localStorage.getItem('latitude');
    this.longitude = +localStorage.getItem('longitude');
  }

  getWeather(): Promise<ForecastIO> {
    if (this.data) {
      return new Promise((resolve, reject) => resolve(this.data));
    } else if (this.apikey && this.latitude && this.longitude) {
      return this.refresh();
    } else {
      return new Promise((resolve, reject) => {
        reject();
      });
    }
  }

  refresh(): Promise<ForecastIO> {
    localStorage.setItem('apikey', this.apikey);
    localStorage.setItem('latitude', this.latitude.toString());
    localStorage.setItem('longitude', this.longitude.toString());

    return new Promise(resolve => {
      let callback = 'apiCallback';
      let self = this;
      window[callback] = function(weatherData: ForecastIO) {
        //Set the moonPhase for each day to the corresponding midnight hourly data.
        weatherData.hourly.data.forEach(h => {
          if (new Date(h.time * 1000).getHours() === 0) {  //midnight
            h.moonPhase = weatherData.daily.data.find(d => d.time === h.time).moonPhase;  //add moonPhase to midnight hour
          }
        });

        localStorage.setItem('data', JSON.stringify(self.data = weatherData));
        resolve(weatherData);
      }
      let apiScript = document.createElement('script');
      apiScript.src = `https://api.forecast.io/forecast/${this.apikey}/${this.latitude},${this.longitude}?callback=${callback}&exclude=flags,minutely`;
      document.body.appendChild(apiScript);
    });
  }
}
