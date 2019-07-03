import { TranslatePipeModule } from 'src/app/generic/translate/translate-pipe.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { SidebarComponent } from './sidebar.component';
import { MaterialModule } from '../../material.module';
import { StorageService } from './../../service/storage/storage.service';

@NgModule({
    imports: [ RouterModule, CommonModule, MatButtonModule, TranslatePipeModule, MaterialModule],
    declarations: [ SidebarComponent ],
    providers: [
        StorageService
    ],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}
