import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { CrudService } from '../crud/crud.service';
import { Constant } from '../../constant/constant';
import { Framework } from 'src/app/model/framework.model';

@Injectable()
export class FrameworkService extends CrudService<Framework> {

  constructor(http: HttpClient, public activatedRoute: ActivatedRoute) {
    super(http, Constant.FRAMEWORK, activatedRoute);
  }
}
