import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { MaterialModule } from './../../../material.module';
import { TranslatePipeModule } from 'src/app/generic/translate/translate-pipe.module';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        MaterialModule,
        FormsModule,
        TranslatePipeModule
    ],

    declarations: [NavbarComponent],
    exports: [NavbarComponent]
})

export class NavbarModule { }
