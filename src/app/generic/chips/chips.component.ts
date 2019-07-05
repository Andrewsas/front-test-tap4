import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html'
})
export class ChipsComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // tslint:disable-next-line:no-input-rename
  @Input('textLabel')
  textLabel: string;

  // tslint:disable-next-line:no-input-rename
  @Input('Array')
  array: any[] = [];

  // tslint:disable-next-line:no-input-rename
  @Input('listComplete')
  listComplete: String[] = [];

  // tslint:disable-next-line:no-input-rename
  @Input('disabled')
  disabled: Boolean = false;

  // tslint:disable-next-line:no-input-rename
  @Output('updateObj')
  updateObj: EventEmitter<any> = new EventEmitter<any>();

  public filter: String[];

  updateValue() {
    this.updateObj.emit(this.array);
  }

  add(event: any): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.array.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.updateValue();
  }

  remove(item: any): void {
    const index = this.array.indexOf(item);

    if (index >= 0) {
      this.array.splice(index, 1);
    }
    this.updateValue();
  }

  public search(event) {
    this.filter = this._filter(event);
  }

  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();
    return this.listComplete.filter(
      skill => skill.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
