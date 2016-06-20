import {Component, Output, EventEmitter, Input} from '@angular/core'
import {CloudCoverLocation} from '../Theme.interface'


@Component({
  selector: 'cloud-cover-location-picker',
  host: { '[class.picker]': 'true' },
  templateUrl: `app/themeEditor/cloud-cover-location-picker.component.html`,
  styles: [':host{display: block;}']
})
export class CloudCoverLocationPickerComponent {
  @Output('focus') focus13 = new EventEmitter<any>();
  @Output('cancel') cancel13 = new EventEmitter<CloudCoverLocation>();
  @Output('save') save13 = new EventEmitter<CloudCoverLocation>();
  @Output('update') update13 = new EventEmitter<CloudCoverLocation>();

  @Input() location: CloudCoverLocation;

  oldlocation: CloudCoverLocation;
  CloudCoverLocation = CloudCoverLocation;

  onFocus() {
    this.oldlocation = this.location;
    this.focus13.emit(null);
  }

  onCancel() {
    this.cancel13.emit(this.oldlocation);
  }

  onSave() {
    this.save13.emit(this.location);
  }

  onUpdate() {
    this.update13.emit(this.location);
  }
}
