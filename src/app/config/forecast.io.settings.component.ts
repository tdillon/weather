import {Component, Output, EventEmitter} from '@angular/core';
import {WeatherService} from '../weather.service';
import {ForecastIO} from "../forecast.io.interface";


@Component({
  selector: 'forecast-io-settings',
  host: { '[class.picker]': 'true' },
  templateUrl: `app/config/forecast.io.settings.component.html`,
  styles: [':host{display: block;}']
})
export class ForecastIoSettingsComponent {
  @Output('focus') focus6 = new EventEmitter<any>();
  @Output('cancel') cancel6 = new EventEmitter<any>();
  @Output('save') save6 = new EventEmitter<any>();

  constructor(private dao: WeatherService) {
  }

  onFocus() {
    this.focus6.emit(null);
  }

  onCancel() {
    this.cancel6.emit(null);
  }

  onSave() {
    this.save6.emit(null);
  }
}
