import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';
import { GenericModule } from 'src/app/generic/generic.module';
import { RegisterRoutingModule } from './register-routing.module';

import { LanguageFormComponent } from './language/language-form/language-form.component';
import { LanguageViewComponent } from './language/language-view/language-view.component';
import { LanguageListComponent } from './language/language-list/language-list.component';
import { FrameworkFormComponent } from './framework/framework-form/framework-form.component';
import { FrameworkListComponent } from './framework/framework-list/framework-list.component';
import { FrameworkViewComponent } from './framework/framework-view/framework-view.component';
import { FrameworkService } from 'src/app/service/framework/framework.service';
import { LanguageService } from 'src/app/service/language/language.service';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CommonModule,
    GenericModule,
    MaterialModule,
    ReactiveFormsModule,
    RegisterRoutingModule
  ],
  declarations: [
    LanguageFormComponent,
    LanguageViewComponent,
    LanguageListComponent,
    FrameworkFormComponent,
    FrameworkListComponent,
    FrameworkViewComponent
  ],
  entryComponents: [LanguageViewComponent, FrameworkViewComponent],
  providers: [FrameworkService, LanguageService]
})
export class RegisterModule { }
