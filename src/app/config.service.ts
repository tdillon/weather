import {Theme} from "./Theme.interface";
import {Injectable} from "@angular/core"
import {Color} from "./Color"
import {Http} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import {Observer} from 'rxjs/Observer'
import 'rxjs/add/operator/map'


//TODO WIP persist to local storage!!!!


@Injectable()
export class ConfigService {
  private _observer: Observer<Theme>;
  private _observable: Observable<Theme>;
  private _customThemes: Array<Theme>;

  constructor(private _http: Http) {
    this._observable = new Observable((o: Observer<Theme>) => { this._observer = o });
  }

  private deserializeColors(obj: Object) {
    if (typeof obj !== 'object') {
      return;
    }

    Object.keys(obj).forEach(key => {
      if (key === 'color' || key === 'daylight' || key === 'nightlight') {
        if (obj[key].hasOwnProperty('value')) {
          obj[key].value = Color.getColor(obj[key].value);
        } else {
          obj[key] = Color.getColor(obj[key]);
        }
      } else {
        this.deserializeColors(obj[key]);
      }
    });
  }

  get themes(): Observable<Theme> {
    //TODO cache themes?

    if (!this._customThemes) {  //themes have not been retrieved yet
      this._http.get('app/preset-themes.json').map(res => {
        let themes = <Theme[]>(res.json());
        for (let t of themes) {
          this.deserializeColors(t);
        }

        let d = localStorage.getItem('customThemes');
        this._customThemes = (d ? JSON.parse(d) : []);
        for (let t of this._customThemes) {
          this.deserializeColors(t);
          this._observer.next(t);
        }

        return themes;
      }).subscribe(ta => ta.forEach(t => this._observer.next(t)));
    }

    return this._observable;
  }

  save(theme: Theme) {
    let idx: number;
    if ((idx = this._customThemes.findIndex(t => t === theme)) >= 0) {
      this._customThemes[idx] = theme;
    } else {
      this._customThemes.push(theme);
      this._observer.next(theme);
    }

    localStorage.setItem('customThemes', JSON.stringify(this._customThemes));
  }

  delete(theme: Theme) {
    let idx: number;
    if ((idx = this._customThemes.findIndex(t => t === theme)) >= 0) {
      this._customThemes.splice(idx, 1);
    } else {
      console.error('When would this ever happen?');
    }

    //TODO do we need to notify any observers?

    localStorage.setItem('customThemes', JSON.stringify(this._customThemes));
  }

  /**
   * TODO-hack for now now just look at all options. how to determine if they are shown on hourly/daily?
   *
   * @returns {Number|number} The largest radius of the any dot that is shown.
   */
  get maxDotRadius() {
    //TODO fix to use new way
    let max = 10;

    // this.global.dot.radius.value *= 1;
    // let max = this.global.dot.radius.value;
    //
    // for (let o of this.options) {
    //   o.dot.radius.value *= 1;
    //   if ((o.show.global && this.global.show.value || (!o.show.global && o.show.value)) && !o.dot.radius.global && o.dot.radius.value > max) {
    //     max = o.dot.radius.value;
    //   }
    // }

    return max;
  }

}
