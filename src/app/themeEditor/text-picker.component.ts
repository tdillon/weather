import {Component, Output, EventEmitter, Input} from '@angular/core';


@Component({
  selector: 'text-picker',
  host: { '[class.picker]': 'true' },
  templateUrl: `app/themeEditor/text-picker.component.html`,
  styles: [':host{display: block;}']
})
export class TextPickerComponent {
  @Output('focus') focus10 = new EventEmitter<any>();
  @Output('cancel') cancel10 = new EventEmitter<string>();
  @Output('save') save10 = new EventEmitter<string>();

  @Input() title: string;
  @Input() value = '';
  oldValue: string;

  onFocus() {
    this.oldValue = this.value;
    this.focus10.emit(null);
  }

  onCancel() {
    this.cancel10.emit(this.oldValue);
  }

  onSave() {
    this.save10.emit(this.value);
  }
}
