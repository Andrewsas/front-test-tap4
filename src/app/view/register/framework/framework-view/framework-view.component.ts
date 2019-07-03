import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Framework } from 'src/app/model/framework.model';
import { GenericFormComponent } from 'src/app/generic/generic-form/generic-form.component';

import { AlertService } from 'src/app/service/alert/alert.service';
import { GenericService } from 'src/app/service/generic/GenericService';
import { FrameworkService } from 'src/app/service/framework/framework.service';

@Component({
  selector: 'app-framework-view',
  templateUrl: './framework-view.component.html',
  styleUrls: ['./framework-view.component.css']
})
export class FrameworkViewComponent extends GenericFormComponent<Framework, FrameworkService> implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public service: FrameworkService,
    public alertServe: AlertService,
    public genericService: GenericService,
    public dialogRef: MatDialogRef<FrameworkViewComponent>,
    @Inject(MAT_DIALOG_DATA) public idModal: string
  ) {
    super(activatedRoute, service, Framework, alertServe, genericService);
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