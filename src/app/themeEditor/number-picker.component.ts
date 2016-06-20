import {Component, Output, EventEmitter, Input} from '@angular/core';


@Component({
  selector: 'number-picker',
  host: { '[class.picker]': 'true' },
  templateUrl: `app/themeEditor/number-picker.component.html`,
  styles: [':host{display: block;}']
})
export class NumberPickerComponent {
  @Output('focus') focus9 = new EventEmitter<any>();
  @Output('cancel') cancel9 = new EventEmitter<number>();
  @Output('save') save9 = new EventEmitter<number>();
  @Output('update') update9 = new EventEmitter<number>();

  @Input() title: string;
  @Input() min = 1;
  @Input() max = 100;
  @Input() step = 1;
  @Input() value = 0;

  oldValue: number;

  onFocus() {
    this.oldValue = this.value * 1;
    this.focus9.emit(null);
  }

  onUpdate() {
    this.value *= 1;
    this.update9.emit(this.value);
  }

  onCancel() {
    this.cancel9.emit(this.oldValue);
  }

  onSave() {
    this.value *= 1;
    this.save9.emit(this.value);
  }
}
