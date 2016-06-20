import {TimeSegment} from "./TimeSegment";
import {Positionings} from "./Positionings";
import {WidgetType} from "../WidgetType";
import {Theme, CloudCoverLocation} from "../Theme.interface";
import {DataBlock, DataPoint, ForecastIO} from '../forecast.io.interface';
import {Component, Input, AfterViewInit, DoCheck} from "@angular/core";
import {SegmentGeometry} from "./SegmentGeometry";
import {DotDrawer} from './DotDrawer'
import {ConfigOption} from '../Option.interface'


/*
 * TODO:MainGraph
 * RESEARCH: Padding: can we vary padding based on location and size of dots instead of largest dot only?
 *
 * TODO:Dots
 * create 'ring' type
 * Rain, Sleet, Snow, Hail icons for PrecipProbability? or can color denote? or icon for non-rain
 *
 * TODO Work List:
 * Figuring how hiding and showing of config options based on daily/hourly
 * Show 'alerts'.  in one of the corners?
 * Fix landscape styles
 * Clean up TODOs.
 * Clean up imports.
 *
 * TODO:Scaling
 * add a 'legend' for scales. e.g., degree sign for temp, % for percentages, etc.,
 * Ozone: what scale? same as wind speed questions.
 *
 * TODO:Themes
 * Add ordering to weather properties.
 * Add 'opacity' to precipProbability segment color, remove 'color'
 *
 * TODO:Config
 * Add 'widget ratio' to the config screen
 *
 */





@Component({
  selector: 'widget-display',
  template: `
    <canvas></canvas>
  `,
  styles: ['canvas{display:block}']
})
export class WidgetDisplayComponent implements AfterViewInit, DoCheck {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  @Input() data: ForecastIO;
  /** width to height */
  widgetRatio = 2;
  @Input() theme: Theme;

  private _pos: Positionings;


  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement>document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  ngDoCheck() {
    //TODO how else can i get notified if this.theme.XXX has changed?, this hits too often
    if (this.data && this.theme) {
      this._pos = new Positionings(
        this.theme,
        this.data,
        document.documentElement.clientWidth,
        this.widgetRatio,
        window.devicePixelRatio,
        text => this.ctx.measureText(text).width
      );

      this.render();
    }
  }

  private renderWidgetBackground() {
    this.ctx.fillStyle = 'transparent';
    this.ctx.fillRect(this._pos.widget.left, this._pos.widget.top, this._pos.widget.width, this._pos.widget.height);
  }

  private renderGraphBackground() {
    this.ctx.fillStyle = 'transparent';
    this.ctx.fillRect(this._pos.graph.left, this._pos.graph.top, this._pos.graph.width, this._pos.graph.height);
  }

  private renderTimeBackground() {
    this.ctx.fillStyle = 'transparent';
    this.ctx.fillRect(this._pos.timeBar.left, this._pos.timeBar.top, this._pos.timeBar.width, this._pos.timeBar.height);

  }

  private renderLeftScaleBackground() {
    this.ctx.fillStyle = 'transparent';
    this.ctx.fillRect(this._pos.leftScale.left, this._pos.leftScale.top, this._pos.leftScale.width, this._pos.leftScale.height);

  }

  private renderRightScaleBackground() {
    this.ctx.fillStyle = 'transparent';
    this.ctx.fillRect(this._pos.rightScale.left, this._pos.rightScale.top, this._pos.rightScale.width, this._pos.rightScale.height);

  }

  private renderCloudCover() {
    let x = this.theme.cloudCoverLocation;

    if (this.theme.daylight) {
      for (let ts of this._pos.timeSegments) {
        this.theme.daylight.a = 1 - ts.cloudCover;
        this.ctx.fillStyle = this.theme.daylight.rgba;
        let location = (x === CloudCoverLocation.TimeBar ? ts.timeBarDaytimes : ts.graphDaytimes);
        for (let l of location) {
          this.ctx.fillRect(l.left, l.top, l.width, l.height);
        }
      }
    }

    if (this.theme.nightlight) {
      for (let ts of this._pos.timeSegments) {
        this.theme.nightlight.a = 1 - ts.cloudCover;
        this.ctx.fillStyle = this.theme.nightlight.rgba;
        let location = (x === CloudCoverLocation.TimeBar ? ts.timeBarNighttimes : ts.graphNighttimes);
        for (let l of location) {
          this.ctx.fillRect(l.left, l.top, l.width, l.height);
        }
      }
    }
  }

  private renderTimeText() {
    this.ctx.font = `${this.theme.fontSize}px 'Roboto', 'Consolas', sans-serif`;
    this.ctx.fillStyle = '#fff';
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = 'center';

    this._pos.timeSegments.forEach(s => this.ctx.fillText(s.timeBarDisplay, s.timeBarBox.center.x, s.timeBarBox.center.y));
  }

  private renderScales() {
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#fff';
    this.ctx.textBaseline = 'middle';

    for (let s of this._pos.scales) {
      for (let i of s.items) {
        this.ctx.fillText(i.value, i.center.x, i.center.y);
      }
    }
  }


  private renderWeatherProperty(c: ConfigOption) {

    let prevSeg: TimeSegment;

    for (let curSeg of this._pos.timeSegments) {

      if (!(c.title === 'precipProbability' && curSeg.precipProbability.y === curSeg.graphBox.bottom)) {
        let prevProp = (prevSeg ? prevSeg[c.title] : null);  //first time segmetn has no previous
        let curProp = curSeg[c.title];

        let s = new SegmentGeometry(c, this.theme.globals, (prevSeg ? prevProp.x : null), (prevSeg ? prevProp.y : null), curProp.x, curProp.y);

        switch (c.title) {
          case 'moon':
            DotDrawer.moon(this.ctx, curProp.x, curProp.y, (c.dot.radius.global ? this.theme.globals.dot.radius : c.dot.radius.value), (c.dot.color.global ? this.theme.globals.dot.color.rgba : c.dot.color.value.rgba), curSeg.moonPhase);
            break;
          case 'windSpeed':
            DotDrawer.wind(this.ctx, curProp.x, curProp.y, (c.dot.radius.global ? this.theme.globals.dot.radius : c.dot.radius.value), (c.dot.color.global ? this.theme.globals.dot.color.rgba : c.dot.color.value.rgba), curSeg.windBearing);
            break;
          default:
            DotDrawer.simple(this.ctx, curProp.x, curProp.y, (c.dot.radius.global ? this.theme.globals.dot.radius : c.dot.radius.value), (c.title === 'precipProbability') ? (this.theme.widgetType === WidgetType.Hourly ? curSeg.precipIntensityColor : curSeg.precipIntensityMaxColor) : (c.dot.color.global ? this.theme.globals.dot.color.rgba : c.dot.color.value.rgba));
        }

        //Don't draw segment for precipProbability when prevSeg was 0%.
        if ((c.segment.show.global ? this.theme.globals.segment.show : c.segment.show.value) && s.hasSegment && !(c.title === 'precipProbability' && prevSeg.precipProbability.y === prevSeg.graphBox.bottom)) {
          if (c.title === 'precipProbability') {  //gradient
            let gradient = this.ctx.createLinearGradient(prevProp.x, prevProp.y, curProp.x, curProp.y);
            gradient.addColorStop(0, this.theme.widgetType === WidgetType.Hourly ? prevSeg.precipIntensityColor : prevSeg.precipIntensityMaxColor);
            gradient.addColorStop(1, this.theme.widgetType === WidgetType.Hourly ? curSeg.precipIntensityColor : curSeg.precipIntensityMaxColor);
            this.ctx.fillStyle = gradient;
          } else {
            this.ctx.fillStyle = (c.segment.color.global ? this.theme.globals.segment.color.rgba : c.segment.color.value.rgba);
          }
          this.ctx.beginPath();
          this.ctx.arc(s.start.point.x, s.start.point.y, (c.dot.radius.global ? this.theme.globals.dot.radius : c.dot.radius.value), s.start.from, s.start.to, false);
          this.ctx.arc(s.end.point.x, s.end.point.y, (c.dot.radius.global ? this.theme.globals.dot.radius : c.dot.radius.value), s.end.from, s.end.to, false);
          this.ctx.fill();
          this.ctx.closePath();
        }
      }

      prevSeg = curSeg;
    }
  }

  render() {
    this.widgetRatio *= 1;

    this.canvas.width = this._pos.widget.width;
    this.canvas.height = this._pos.widget.height;

    this.canvas.style.width = this._pos.client.width + 'px';
    this.canvas.style.height = this._pos.client.height + 'px';

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    /*
     * Render Sequence:
     *  1) Widget background (background color w/opacity of entire widget)
     *  2) Graph overlay (background color w/ opacity of graph region)
     *  3) Time overlay (background color w/ opacity of time bar)
     *  4) Left axis overlay (background color w/ opacity of left axis overlay i.e., temp scale)
     *  5) Right axis overlay (background color w/ opacity of right axis overlay i.e., %, MPH, etc., scales)
     *  6) Cloud cover
     *  7) time text
     *  8) scales
     *  9) draw each weather property (dot&segment) for the entire time period //this will effect layering
     */

    this.renderWidgetBackground();       //1
    this.renderGraphBackground();        //2
    this.renderTimeBackground();         //3
    this.renderLeftScaleBackground();    //4
    this.renderRightScaleBackground();   //5
    this.renderCloudCover();             //6
    this.renderTimeText();               //7
    this.renderScales();                 //8
    for (let c of this.theme.options) {
      this.renderWeatherProperty(c);     //9
    }
  }
}
