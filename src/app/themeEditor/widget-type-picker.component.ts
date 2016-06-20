import {WidgetType} from "../WidgetType";
import {Component, Output, EventEmitter, Input} from '@angular/core';


@Component({
  selector: 'widget-type-picker',
  host: { '[class.picker]': 'true' },
  templateUrl: `app/themeEditor/widget-type-picker.component.html`,
  styles: [':host{display: block;}']
})
export class WidgetTypePickerComponent {
  @Output('focus') focus12 = new EventEmitter<any>();
  @Output('cancel') cancel12 = new EventEmitter<WidgetType>();
  @Output('save') save12 = new EventEmitter<WidgetType>();
  @Output('update') update12 = new EventEmitter<WidgetType>();

  @Input() type: WidgetType;

  oldType: WidgetType;
  WidgetType = WidgetType;

  onFocus() {
    this.oldType = this.type;
    this.focus12.emit(null);
  }

  onCancel() {
    this.cancel12.emit(this.oldType);
  }

  onSave() {
    this.save12.emit(this.type);
  }

  onUpdate() {
    this.update12.emit(this.type);
  }
}
