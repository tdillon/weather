import {Component, Output, EventEmitter} from '@angular/core';
import {WeatherService} from '../weather.service';
import {ForecastIO} from "../forecast.io.interface";


@Component({
  selector: 'current-location',
  host: { '[class.picker]': 'true' },
  templateUrl: `app/config/current-location.component.html`,
  styles: [':host{display: block;}']
})
export class CurrentLocationComponent {
  @Output('update') update = new EventEmitter<{ latitude: number, longitude: number }>();
  refreshing = false;

  constructor(private dao: WeatherService) {
  }

  onRefresh() {
    if (this.refreshing) {
      return;
    }

    this.refreshing = true;

    this.dao.getLocation().then(l => {
      this.dao.saveLocation(l);
      this.refreshing = false;
      this.update.emit(l);
    });
  }
}
