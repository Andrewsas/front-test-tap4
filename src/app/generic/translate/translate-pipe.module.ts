import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatSelectModule } from '@angular/material';

import { TranslatePipe } from './translate.pipe';

@NgModule({
  imports: [
    CommonModule, MatInputModule, MatSelectModule
  ],
  declarations: [TranslatePipe],
  exports: [TranslatePipe]
})
export class TranslatePipeModule { }
