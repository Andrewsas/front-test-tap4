import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Language } from 'src/app/model/language.model';
import { GenericFormComponent } from 'src/app/generic/generic-form/generic-form.component';

import { AlertService } from 'src/app/service/alert/alert.service';
import { GenericService } from 'src/app/service/generic/GenericService';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-language-view',
  templateUrl: './language-view.component.html',
  styleUrls: ['./language-view.component.css']
})
export class LanguageViewComponent extends GenericFormComponent<Language, LanguageService> implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public service: LanguageService,
    public alertServe: AlertService,
    public genericService: GenericService,
    public dialogRef: MatDialogRef<LanguageViewComponent>,
    @Inject(MAT_DIALOG_DATA) public idModal: string
  ) {
    super(activatedRoute, service, Language, alertServe, genericService);
  }
  ngOnInit() {
    super.ngOnInit();
    const id = this.idModal;
    this.loadOne(id);
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}