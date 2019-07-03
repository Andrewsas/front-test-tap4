import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { CrudService } from '../crud/crud.service';
import { Constant } from '../../constant/constant';
import { Language } from 'src/app/model/language.model';

@Injectable()
export class LanguageService extends CrudService<Language> {

  constructor(http: HttpClient, public activatedRoute: ActivatedRoute) {
    super(http, Constant.LANGUAGE, activatedRoute);
  }
}
