import {Color} from "../Color";
import {Component, Input, Output, EventEmitter} from '@angular/core'
import {ConfigOption} from '../Option.interface'
import {BooleanPickerComponent} from "./boolean-picker.component";


@Component({
  selector: 'weather-property-picker',
  host: { '[class.pickerGroup]': 'true' },
  templateUrl: `app/themeEditor/weather-property-picker.component.html`,
  styles: [':host{display: block;}'],
  directives: [BooleanPickerComponent]
})
export class WeatherPropertyPickerComponent {
  private _passedInProps: Array<ConfigOption>;
  @Output('focus') focus1 = new EventEmitter<any>();
  @Output('update') update1 = new EventEmitter<any>();
  @Output('cancel') cancel1 = new EventEmitter<any>();
  @Output('save') save1 = new EventEmitter<any>();

  _properties = [
    { picked: false, summary: 'TODO explain', displayTitle: 'Dew Point', title: 'dewPoint' },
    { picked: false, summary: 'TODO explain', displayTitle: 'Humidity', title: 'humidity' },
    { picked: false, summary: 'TODO explain', displayTitle: 'Moon', title: 'moon' },
    { picked: false, summary: 'TODO explain', displayTitle: 'Ozone', title: 'ozone' },
    { picked: false, summary: 'TODO explain', displayTitle: 'Precip Prob', title: 'precipProbability' },
    { picked: false, summary: 'TODO explain', displayTitle: 'Precip Accum', title: 'precipAccumulation' },
    { picked: false, summary: 'TODO explain', displayTitle: 'Pressure', title: 'pressure' },
    { picked: false, summary: 'TODO explain', displayTitle: 'Temp Feel', title: 'apparentTemperature' },
    { picked: false, summary: 'TODO explain', displayTitle: 'Temp Real', title: 'temperature' },
    { picked: false, summary: 'TODO explain', displayTitle: 'Temp Max Feel', title: 'apparentTemperatureMax' },
    { picked: false, summary: 'TODO explain', displayTitle: 'Temp Max Real', title: 'temperatureMax' },
    { picked: false, summary: 'TODO explain', displayTitle: 'Temp Min Feel', title: 'apparentTemperatureMin' },
    { picked: false, summary: 'TODO explain', displayTitle: 'Temp Min Real', title: 'temperatureMin' },
    { picked: false, summary: 'TODO explain', displayTitle: 'Visibility', title: 'visibility' },
    { picked: false, summary: 'TODO explain', displayTitle: 'Wind Speed', title: 'windSpeed' }];

  constructor() {
  }

  @Input() set properties(props: Array<ConfigOption>) {
    this._passedInProps = props;
    props.forEach(p => this._properties.find(p2 => p.title === p2.title).picked = true);
  }

  onFocus() {
    this.focus1.emit(null)
  }

  onUpdate(opt: any, show: boolean) {
    if (show) {
      this._passedInProps.push(this.getDefaultConfigOption(opt.title));
    } else {
      this._passedInProps.splice(this._passedInProps.findIndex(p=> p.title === opt.title), 1);
    }
    this.update1.emit(null);
  }

  onCancel() {
    this.cancel1.emit(null);
  }

  onSave() {
    this.save1.emit(null);
  }



  getDefaultConfigOption(title: string): ConfigOption {
    return {
      title: title,
      dot: {
        color: { global: true, value: Color.white },
        radius: { global: true, value: 5 },
      },
      segment: {
        show: { global: true, value: true },
        color: { global: true, value: Color.white },
        angle: { global: true, value: 40 },
        padding: { global: true, value: 5 }
      }
    }
  }
}
