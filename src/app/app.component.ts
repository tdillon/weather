import {ThemeCreatorComponent, ThemeCreatorMode} from "./themeEditor/theme-creator.component";
import {Theme} from "./Theme.interface";
import {ThemePickerComponent} from "./themeList/theme-picker.component";
import {Component, AfterViewInit} from '@angular/core';
import {WeatherService} from './weather.service';
import {WidgetDisplayComponent} from './widget/widget-display.component';
import {ForecastIO} from "./forecast.io.interface";
import {ConfigService} from "./config.service";
import {ConfigComponent} from './config/config.component'


@Component({
  selector: 'weather-widget-number-one-prototype',
  templateUrl: `app/app.component.html`,
  styleUrls: ['app/app.component.css'],
  providers: [WeatherService, ConfigService],
  directives: [ThemePickerComponent, ThemeCreatorComponent, WidgetDisplayComponent, ConfigComponent]
})
export class AppComponent implements AfterViewInit {
  showMenu = false;
  currentTheme: Theme;
  currentThemeBeforeCreatingTheme: Theme;//TODO name, essentially a holder for the selected theme prior to creating a theme, set back to this theme on cancel
  data: ForecastIO;
  currentPage: number;
  Pages = { Themes: 1, Editor: 2, Config: 3 };
  creatorMode: ThemeCreatorMode;
  inputTheme: Theme;

  constructor(private _weatherService: WeatherService, public config: ConfigService) {
    this.currentPage = this.Pages.Themes;
  }

  ngAfterViewInit() {
    this.getWeather();
  }

  getWeather() {
    this._weatherService.getWeather().then((weather: ForecastIO) => {
      this.data = weather;
    }, () => console.log('Data is not set, configure forecast io info!!!'));
  }

  cancelThemeCreation() {
    this.currentTheme = this.currentThemeBeforeCreatingTheme;
    this.currentPage = this.Pages.Themes;
  }

  themeSave(theme: Theme) {
    this.currentTheme = theme;
    this.currentPage = this.Pages.Themes;
  }

  themeDelete(theme: Theme) {
    //TODO delete theme
    this.currentPage = this.Pages.Themes;
  }

  onCreateTheme() {
    this.creatorMode = ThemeCreatorMode.New;
    this.inputTheme = null;
    this.currentPage = this.Pages.Editor;
  }

  onEditTheme(t: Theme) {
    this.creatorMode = ThemeCreatorMode.Edit;
    this.inputTheme = t;
    this.currentPage = this.Pages.Editor;
  }

  onCopyTheme(t: Theme) {
    this.creatorMode = ThemeCreatorMode.Copy;
    this.inputTheme = t;
    this.currentPage = this.Pages.Editor;
  }

  clickWidget() {
    this.showMenu = !this.showMenu;
  }
}
