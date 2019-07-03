import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { GenericService } from 'src/app/service/generic/GenericService';
import { FrameworkService } from 'src/app/service/framework/framework.service';

import { Framework } from 'src/app/model/framework.model';
import { FrameworkViewComponent } from '../framework-view/framework-view.component';
import { GenericListComponent } from 'src/app/generic/generic-list/generic-list.component';

@Component({
  selector: 'app-framework-list',
  templateUrl: './framework-list.component.html',
  styleUrls: ['./framework-list.component.css']
})
export class FrameworkListComponent extends GenericListComponent<Framework, FrameworkService> {

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public service: FrameworkService,
    public genericService: GenericService
  ) {
    super(service, router, genericService);
  }

  openDialog(idMdal) {
    this.dialog.open(FrameworkViewComponent, {
      width: '80%',
      data: idMdal
    });
  }

}
