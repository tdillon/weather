import {Component, Output, EventEmitter} from '@angular/core';
import {WeatherService} from '../weather.service';
import {ForecastIO} from "../forecast.io.interface";
import {TextPickerComponent} from '../themeEditor/text-picker.component'
import {CurrentLocationComponent} from './current-location.component'


@Component({
  selector: 'location',
  host: { '[class.hide]': 'currentPicker', '[class.pickerGroup]': 'true' },
  templateUrl: `app/config/location.component.html`,
  styles: [':host{display: block;}'],
  directives: [TextPickerComponent, CurrentLocationComponent]
})
export class LocationComponent {
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

  onNull() {}
}
