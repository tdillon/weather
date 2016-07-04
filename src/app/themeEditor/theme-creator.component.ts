import {NumberPickerComponent} from "./number-picker.component";
import {CloudCoverLocationPickerComponent} from "./cloud-cover-location-picker.component";
import {Color} from "../Color";
import {Theme, ThemeType, CloudCoverLocation} from "../Theme.interface"
import {WidgetType} from '../WidgetType'
import {ConfigService} from "../config.service"
import {Component, Output, Input, EventEmitter} from '@angular/core'
import {ConfigOption} from '../Option.interface'
import {TextPickerComponent} from './text-picker.component'
import {WidgetTypePickerComponent} from './widget-type-picker.component'
import {BooleanPickerComponent} from './boolean-picker.component'
import {ColorPickerComponent} from "./color-picker.component";
import {WeatherPropertyPickerComponent} from './weather-property-picker.component'
import {DefaultThemeSettingsComponent} from "./default-theme-settings.component";
import {WeatherPropertySettingsComponent} from "./weather-property-settings.component";

export enum ThemeCreatorMode { New, Edit, Copy }

@Component({
  selector: 'theme-creator',
  host: {
    '[class.hide]': 'currentPicker',
    '[class.show]': '!currentPicker',
    '[class.pickerGroup]': 'true'
  },
  templateUrl: 'app/themeEditor/theme-creator.component.html',
  styles: [':host { display: block; }'],
  directives: [
    ColorPickerComponent,
    BooleanPickerComponent,
    TextPickerComponent,
    NumberPickerComponent,
    WidgetTypePickerComponent,
    WeatherPropertyPickerComponent,
    DefaultThemeSettingsComponent,
    WeatherPropertySettingsComponent,
    CloudCoverLocationPickerComponent
  ]
})
export class ThemeCreatorComponent {
  private _inputTheme;  //TODO do i need this?
  private theme: Theme;
  private WidgetType = WidgetType;
  private availableOptions: Array<ConfigOption>;
  private currentPicker: any;
  private ThemeCreatorMode = ThemeCreatorMode;

  @Output('save') save11 = new EventEmitter<Theme>();
  @Output('update') update11 = new EventEmitter<Theme>();
  @Output('delete') delete11 = new EventEmitter<Theme>();
  @Output('cancel') cancel11 = new EventEmitter<any>();

  @Input() mode: ThemeCreatorMode;
  @Input() set inputTheme(t: Theme) {
    this._inputTheme = t;

    if (t) {  //copying or editing a theme
      this.theme = this.emptyTheme
      this.copyThemeTo(t, this.theme);
    } else if (t === null) {  //creating a new theme
      this.theme = this.emptyTheme;
    }  //t will be undefined to begin with, i.e., component load time

    if (t !== undefined) {  //only update if user is adding/editing/copying a theme
      this.onUpdate();
    }
  }

  constructor(private _config: ConfigService) {
    this.currentPicker = null;
    this.availableOptions = this.allOptions;
    this.theme = this.emptyTheme;
  }

  updateDaylight(showDaylight: boolean) {
    if (showDaylight) {
      this.theme.daylight = Color.skyBlue;
    } else {
      delete this.theme.daylight;
    }
    this.onUpdate();
  }

  updateNightlight(showNightlight: boolean) {
    if (showNightlight) {
      this.theme.nightlight = Color.black;
    } else {
      delete this.theme.nightlight;
    }
    this.onUpdate();
  }

  private copyThemeTo(from: Theme, to: Theme) {
    to.name = from.name;
    to.themeType = ThemeType.Custom;
    to.widgetType = from.widgetType;
    to.cloudCoverLocation = from.cloudCoverLocation;
    to.fontSize = from.fontSize;
    to.globals.dot.color = from.globals.dot.color.copyOf();
    to.globals.dot.radius = from.globals.dot.radius;
    to.globals.segment.show = from.globals.segment.show;
    to.globals.segment.color = from.globals.segment.color.copyOf();
    to.globals.segment.angle = from.globals.segment.angle;
    to.globals.segment.padding = from.globals.segment.padding;

    if (from.daylight) {
      to.daylight = from.daylight.copyOf();
    } else {
      delete to.daylight;
    }

    if (from.nightlight) {
      to.nightlight = from.nightlight.copyOf();
    } else {
      delete to.nightlight;
    }

    for (let o of from.options) {
      let newToOption = {
        title: o.title,
        dot: {
          color: {
            global: o.dot.color.global,
            value: o.dot.color.value.copyOf()
          },
          radius: {
            global: o.dot.radius.global,
            value: o.dot.radius.value
          },
        },
        segment: {
          show: {
            global: o.segment.show.global,
            value: o.segment.show.value
          },
          color: {
            global: o.segment.color.global,
            value: o.segment.color.value.copyOf()
          },
          angle: {
            global: o.segment.angle.global,
            value: o.segment.angle.value
          },
          padding: {
            global: o.segment.padding.global,
            value: o.segment.padding.value
          },
          opacity: o.segment.opacity
        }
      }

      if (newToOption.segment.opacity === undefined) {
        delete newToOption.segment.opacity;
      }

      if (newToOption.segment.color === undefined) {
        delete newToOption.segment.color;
      }

      to.options.push(newToOption);
    }
  }

  /**
   * Return a new instance of an "empty" theme.
   */
  private get emptyTheme(): Theme {
    return {
      name: '',
      themeType: ThemeType.Custom,
      widgetType: WidgetType.Daily,
      cloudCoverLocation: CloudCoverLocation.Graph,
      fontSize: 12,
      globals: {
        dot: {
          color: Color.white,
          radius: 5
        },
        segment: {
          show: true,
          color: Color.white,
          angle: 40,
          padding: 4
        }
      },
      options: []
    }
  }

  get allOptions(): Array<ConfigOption> {
    let x = ['moon', 'humidity', 'visibility', 'dewPoint', 'apparentTemperatureMax', 'apparentTemperatureMin', 'temperatureMin', 'temperatureMax', 'windSpeed', 'ozone', 'pressure', 'apparentTemperature', 'temperature', 'precipProbability', 'precipAccumulation'];
    return x.map(o => this.getDefaultConfigOption(o));
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

  onDelete() {
    this._config.delete(this._inputTheme);
    this.delete11.emit(this._inputTheme);
  }

  onSave() {
    if (this.mode === ThemeCreatorMode.Edit) {
      this.copyThemeTo(this.theme, this._inputTheme);
      this.theme = this._inputTheme;
    }

    this._config.save(this.theme);
    this.save11.emit(this.theme);
  }

  onCancel() {
    this.mode = null;
    this.inputTheme = null;
    this.cancel11.emit(null);
  }

  onUpdate() {
    this.update11.emit(this.theme);
  }
}
