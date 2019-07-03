
import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';

import {
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatStepperModule,
  MatDialogModule,
  MatDatepickerModule,
  MatGridListModule,
  MatExpansionModule,
  MatListModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatToolbarModule,
  MatTabsModule,
  MatSortModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSidenavModule,
  MatSelectModule,
  MatRippleModule,
  MatRadioModule,
  MatDividerModule
} from '@angular/material';
import {
  FormsModule,
  ReactiveFormsModule
} from '../../node_modules/@angular/forms';
import { TranslatePipeModule } from './generic/translate/translate-pipe.module';

@NgModule({
  imports: [
    NgxMaskModule.forRoot()
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    TranslatePipeModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    TranslatePipeModule
    // NgSelectModule,
    // NgxMatSelectSearchModule,
  ]
})
export class MaterialModule {}
