import { OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';

import { BaseModel } from 'src/app/model/base-model';
import { CrudService } from '../../service/crud/crud.service';
import { AlertService } from '../../service/alert/alert.service';
import { GenericService } from 'src/app/service/generic/GenericService';
import { MessageType, IconType, AlertMsg, MessageText } from '../../constant/constant';

declare var $: any;

export class GenericFormComponent<TModel extends BaseModel, TService extends CrudService<TModel>> implements OnInit {

  public obj: any;
  public edit: Boolean = false;
  public confirm: Boolean = false;
  public copy: Boolean = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    public service: TService,
    public modelType: new () => TModel,
    public alertServe: AlertService,
    public genericService: GenericService
  ) {}

  ngOnInit() {
    this.initOn();
  }

  protected initOn = () => {
    this.obj = new this.modelType();

    if (this.activatedRoute.snapshot.paramMap.get('id') !== null) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.edit = true;
      this.loadOne(id);
    } else if (this.activatedRoute.snapshot.paramMap.get('copy') !== null) {
      const id = this.activatedRoute.snapshot.paramMap.get('copy');
      this.copy = true;
      this.loadOne(id);
    }
  }

  protected loadOne = (id) => {
    if (id) {
      let load;
      setTimeout(() => load = this.genericService.openDialog(), 100);
      this.service.getOne(id).subscribe(
        loadedObj => {
          if (this.copy) {
            delete loadedObj.id;
          }
          this.obj = loadedObj;
          this.afterLoadOne();
          setTimeout(() => {
            load.close();
          }, 300);
        },
        error => {
          setTimeout(() => {
            load.close();
          }, 300);
        }
      );
    }
  }

  public updateOrCreate = () => {
    let load;
    this.beforeSave();
    if (!this.edit) {
      setTimeout(() => load = this.genericService.openDialog(), 100);
      this.service.save(this.obj).subscribe(
        (success) => {
          this.obj = success;
          this.genericService.toats(MessageText.SAVE, MessageType.SUCCESS, IconType.SAVE);
          setTimeout(() => load.close(), 300);
          this.afterSave();
        },
        error => {
          setTimeout(() => load.close(), 300);
          this.genericService.onError(error);
        }
      );
    } else {
      this.alertServe.showAlertConfirm(AlertMsg.CONFIRM.EDIT, result => {
        setTimeout(() => load = this.genericService.openDialog(), 100);
        if (result) {
          this.service.update(this.obj).subscribe(
            success => {
              this.obj = success;
              this.genericService.toats(MessageText.EDIT, MessageType.SUCCESS, IconType.UPDATE
              );
              setTimeout(() => load.close(), 300);
              this.confirm = true;
              this.afterSave();
            },
            error => {
              setTimeout(() => load.close(), 300);
              this.genericService.onError(error);
            }
          );
        } else {
          setTimeout(() => load.close(), 300);
        }
      });
    }
  }

  protected afterSave() {
    setTimeout(() => this.returnScreen(), 300);
  }

  protected beforeSave() {  }

  public returnScreen() {
    this.genericService.returnScreen(this.edit, this.confirm);
  }

  protected afterLoadOne() {}

  public toDate(args?: string | Date): Date | any {
    let date = new Date();

    if (args && typeof(args) === 'string') {
        date = new Date(args);
    } else {
        return args || date;
    }

    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const dateWithout = new Date(date.getTime() + userTimezoneOffset);

    return dateWithout;
  }
}
