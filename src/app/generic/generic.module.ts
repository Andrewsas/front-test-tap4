import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';

import { SpinerComponent } from './spiner/spiner.component';
import { AutoCompleteComponent } from './autocomplete/autocomplete.component';
import { ChipsComponent } from './chips/chips.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule
    ],
    declarations: [
        AutoCompleteComponent,
        SpinerComponent,
        ChipsComponent
    ],
    exports: [
        AutoCompleteComponent,
        SpinerComponent,
        ChipsComponent
    ],
    entryComponents : [SpinerComponent]
})
export class GenericModule { }
