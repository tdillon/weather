import {BooleanPickerComponent} from "./boolean-picker.component";
import {NumberPickerComponent} from "./number-picker.component";
import {ColorPickerComponent} from "./color-picker.component";
import {Theme} from "../Theme.interface";
import {ConfigService} from "../config.service";
import {ConfigOption, GlobalOptions} from '../Option.interface';
import {Component, Output, Input, EventEmitter} from '@angular/core';


@Component({
  selector: 'weather-property-settings',
  host: { '[class.hide]': 'currentPicker', '[class.pickerGroup]': 'true' },
  templateUrl: `app/themeEditor/weather-property-settings.component.html`,
  styles: [':host{display: block;}'],
  directives: [ColorPickerComponent, NumberPickerComponent, BooleanPickerComponent]
})
export class WeatherPropertySettingsComponent {

  @Output('focus') focus2 = new EventEmitter<any>();
  @Output('update') update2 = new EventEmitter<any>();
  @Output('cancel') cancel2 = new EventEmitter<any>();
  @Output('save') save2 = new EventEmitter<any>();

  @Input() default: GlobalOptions;
  @Input() property: ConfigOption;
  @Input() title = '';

  currentPicker: any;

  constructor() {
    this.currentPicker = null;
  }

  onFocus(picker: any) {
    this.currentPicker = picker;
    this.focus2.emit(null);
  }

  onUpdate() {
    this.update2.emit(null);
  }

  onCancel() {
    this.currentPicker = null;
  }

  onCancelMe() {
    this.cancel2.emit(null);
  }

  onSave() {
    this.currentPicker = null;
  }

  onSaveMe() {
    this.save2.emit(null);
  }
}
