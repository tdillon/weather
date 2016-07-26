import {BooleanPickerComponent} from "../themeEditor/boolean-picker.component";
import {ForecastIoRefresherComponent} from "./forecast.io.refresher.component";
import {Component, Output, EventEmitter} from '@angular/core'
import {ForecastIO} from '../forecast.io.interface'
import {LocationComponent} from './location.component'
import {NumberPickerComponent} from '../themeEditor/number-picker.component'
import {WeatherService} from '../weather.service'



@Component({
  selector: 'config',
  host: {
    '[class.hide]': 'currentPicker',
    '[class.show]': '!currentPicker',
    '[class.pickerGroup]': 'true'
  },
  templateUrl: 'app/config/config.component.html',
  directives: [LocationComponent, ForecastIoRefresherComponent, BooleanPickerComponent, NumberPickerComponent],
  styles: [':host{display: block;}']
})
export class ConfigComponent {
  @Output('close') close4 = new EventEmitter<any>();
  @Output('refresh') refresh4 = new EventEmitter<ForecastIO>();

  currentPicker: any;
  fullscreen = false;

  constructor(private _weatherService: WeatherService) {
    this.currentPicker = null;
  }

  onClose() {
    this.close4.emit(null);
  }

  onUpdate() {
  }

  onRefresh(weather: ForecastIO) {
    this.refresh4.emit(weather);
  }

  toggleFullscreen(val: boolean) {
    this.fullscreen = val;

    if (this.fullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement['mozRequestFullScreen']) {
        document.documentElement['mozRequestFullScreen']();
      } else if (document.documentElement['webkitRequestFullscreen']) {
        document.documentElement['webkitRequestFullscreen']();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document['mozExitFullScreen']) {
        document['mozExitFullScreen']();
      } else if (document['webkitExitFullscreen']) {
        document['webkitExitFullscreen']();
      }
    }
  }
}
