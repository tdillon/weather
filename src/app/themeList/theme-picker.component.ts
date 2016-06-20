import {Theme, ThemeType} from "../Theme.interface";
import {ConfigService} from "../config.service";
import {Component, Output, EventEmitter} from '@angular/core';
import {WidgetType} from '../WidgetType'


@Component({
  selector: 'theme-picker',
  host: {
    '[class.show]': 'true',
    '[class.pickerGroup]': 'true'
  },
  templateUrl: `app/themeList/theme-picker.component.html`,
  styles: [':host{display: block;}']
})
export class ThemePickerComponent {
  @Output('themePicked') themePicked13 = new EventEmitter<Theme>();
  @Output('showConfig') showConfig13 = new EventEmitter<any>();
  @Output('createTheme') createTheme13 = new EventEmitter<any>();
  @Output('copyTheme') copyTheme13 = new EventEmitter<any>();
  @Output('editTheme') editTheme13 = new EventEmitter<any>();

  themes: Array<Theme> = [];
  current: Theme;
  WidgetType = WidgetType;
  ThemeType = ThemeType;

  constructor(_config: ConfigService) {
    _config.themes.subscribe(t => {
      this.themes.push(t);
      if (this.themes.length == 1) {
        this.onSelect(this.themes[0]);
      }
    });
  }

  onCreateTheme() {
    this.createTheme13.emit(null);
  }

  onEditTheme(t: Theme) {
    this.editTheme13.emit(t);
  }

  onCopyTheme(t: Theme) {
    this.copyTheme13.emit(t);
  }

  onSelect(theme: Theme) {
    this.current = theme;
    this.themePicked13.emit(theme);
  }

  onShowConfig() {
    this.showConfig13.emit(null);
  }
}
