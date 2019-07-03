import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { GenericService } from 'src/app/service/generic/GenericService';
import { LanguageService } from 'src/app/service/language/language.service';

import { Language } from 'src/app/model/language.model';
import { LanguageViewComponent } from '../language-view/language-view.component';
import { GenericListComponent } from 'src/app/generic/generic-list/generic-list.component';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.css']
})
export class LanguageListComponent  extends GenericListComponent<Language, LanguageService> {

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public service: LanguageService,
    public genericService: GenericService
  ) {
    super(service, router, genericService);
  }

  openDialog(idMdal) {
    this.dialog.open(LanguageViewComponent, {
      width: '80%',
      data: idMdal
    });
  }

}
