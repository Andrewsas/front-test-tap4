import { Constant } from './../../constant/constant';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient, HttpParams } from '@angular/common/http';

export abstract class CrudService<T extends any> {

  baseURL = Constant.BASE_URL;
  baseSearch = Constant.SEARCH;

  constructor(
    public http: HttpClient,
    private baseUrl: String,
    public activatedRoute: ActivatedRoute,
    public router?: Router,
    ) {
    this.baseURL += baseUrl;
  }

  public getAll(data?): Observable<any> {
    let url = this.baseURL;
    if (data) {
      url += this.baseSearch + this.addParameter(data);
    }
    return this.http.get(url);
  }

  public getAllFilter(preUrl, data?): Observable<any> {
    let url = this.baseURL + preUrl;
    if (data) {
      url = url + this.addParameter(data);
    }
    return this.http.get(url);
  }

  public getOne(id: String): Observable<any> {
    const getAllUrl = this.baseURL + id;
    return this.http.get(getAllUrl);
  }

  public save(data: T): Observable<any> {
    const saveUrl = this.baseURL;
    return this.http.post(saveUrl, data);
  }

  public saveCollection(data: T[]): Observable<any> {
    const saveUrl = this.baseURL + 'collection';
    return this.http.post(saveUrl, data);
  }

  public update(data: T): Observable<any> {
    const updateUrl = this.baseURL + data.id;
    return this.http.put(updateUrl, data);
  }

  public delete(id: String): Observable<any> {
    const deleteURL = this.baseURL + id;
    return this.http.delete(deleteURL);
  }

  private addParameter(data) {
    let params = new HttpParams();
    Object.keys(data).forEach((key) => {
      params = params.append(key, data[key]);
    });
    return params.toString();
  }
}
