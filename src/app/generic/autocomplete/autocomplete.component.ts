import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html'
})
export class AutoCompleteComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('textLabel')
  textLabel: string;

  // tslint:disable-next-line:no-input-rename
  @Input('textError')
  textError: string;

  // tslint:disable-next-line:no-input-rename
  @Input('textErrorLength')
  textErrorLength: String = 'msg.error.length';

  // tslint:disable-next-line:no-input-rename
  @Input('tpSelect')
  tpSelect: Boolean = true;

  // tslint:disable-next-line:no-input-rename
  @Input('required')
  required: Boolean = true;

  // tslint:disable-next-line:no-input-rename
  @Input('disabled')
  disabled: Boolean = false;

  // tslint:disable-next-line:no-input-rename
  @Input('listFilter')
  listFilter: any[] = [];

  // tslint:disable-next-line:no-input-rename
  @Input('setObj')
  dataInput: any;

  // tslint:disable-next-line:no-input-rename
  @Output('updateObj')
  updateObj: EventEmitter<string> = new EventEmitter<string>();

  public filter: any[] = [];
  public selectedInput: Boolean = false;

  constructor() {}

  ngOnInit() {
    this.filter = this.listFilter;
  }

  validaValor() {
    if (!this.tpSelect) {
      return;
    }
    if (this.selectedInput) {
      this.selectedInput = false;
    } else {
      this.dataInput = '';
    }
  }

  updateValue() {
    this.updateObj.emit(this.dataInput);
  }

  search() {
    this.updateValue();
    if (!this.dataInput) {
      this.dataInput = '';
    }
    if (this.listFilter) {
      this.filter = [];
      this.filter = this._filterArray(this.dataInput);
    }
  }

  private _filterArray(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.listFilter.filter(
      item => item.toLowerCase().indexOf(filterValue) === 0
    );
  }

}
