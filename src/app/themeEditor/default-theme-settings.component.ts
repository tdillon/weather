import {BooleanPickerComponent} from "./boolean-picker.component";
import {NumberPickerComponent} from "./number-picker.component";
import {ColorPickerComponent} from "./color-picker.component";
import {Theme} from "../Theme.interface";
import {ConfigService} from "../config.service";
import {GlobalOptions} from '../Option.interface';
import {Component, Output, Input, EventEmitter} from '@angular/core';


@Component({
  selector: 'default-theme-settings',
  host: { '[class.hide]': 'currentPicker', '[class.pickerGroup]': 'true' },
  templateUrl: `app/themeEditor/default-theme-settings.component.html`,
  styles: [':host{display: block;}'],
  directives: [ColorPickerComponent, NumberPickerComponent, BooleanPickerComponent]
})
export class DefaultThemeSettingsComponent {
  @Output('focus') focus3 = new EventEmitter<string>();
  @Output('update') update3 = new EventEmitter<any>();
  @Output('cancel') cancel3 = new EventEmitter<any>();
  @Output('save') save3 = new EventEmitter<any>();

  @Input() default: GlobalOptions;

  currentPicker: any;

  constructor() {
    this.currentPicker = null;
  }

  onFocus(picker: any) {
    this.currentPicker = picker;
    this.focus3.emit(null);
  }

  onUpdate() {
    this.update3.emit(null);
  }

  onCancel() {
    this.currentPicker = null;
  }

  onCancelMe() {
    this.cancel3.emit(null);
  }

  onSave() {
    this.currentPicker = null;
  }

  onSaveMe() {
    this.save3.emit(null);
  }
}
