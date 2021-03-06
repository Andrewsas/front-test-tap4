// app/translate/translate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../translate/translate.service'; // our translate service

@Pipe({
  name: 'translate',
  pure: false // impure pipe, update value when we change language
})

export class TranslatePipe implements PipeTransform {
  constructor(private _translate: TranslateService) { }

  transform(value: string, args?: any[]): any {
    if (!value) {
      return;
    } else {
      return this._translate.instant(value);
    }
  }
}
