import {Component, Output, EventEmitter, Input} from '@angular/core';
import {Color} from "../Color";


@Component({
  selector: 'color-picker',
  host: { '[class.picker]': 'true' },
  templateUrl: `app/themeEditor/color-picker.component.html`,
  styles: [':host{display: block;}']
})
export class ColorPickerComponent {
  @Output('focus') focus8 = new EventEmitter<any>();
  @Output('cancel') cancel8 = new EventEmitter<Color>();
  @Output('save') save8 = new EventEmitter<Color>();
  @Output('update') update8 = new EventEmitter<Color>();

  @Input() color = Color.white;
  @Input() disabled = false;
  @Input() title = 'Color';
  @Input() showalpha = true;

  oldColor = Color.white;

  onFocus() {
    this.oldColor = this.color.copyOf();
    this.focus8.emit(null);
  }

  onUpdate() {
    this.update8.emit(this.color);
  }

  onCancel() {
    this.cancel8.emit(this.oldColor);
  }

  onSave() {
    this.save8.emit(this.color);
  }
}
