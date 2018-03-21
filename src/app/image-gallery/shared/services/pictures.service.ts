import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Picture } from './../models/picture.model';
import { environment } from './../../../../environments/environment';

import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';

@Injectable()

export class PicturesService {
  endpoint = '/photos';

  constructor(
    private http: HttpClient,
  ) { }

  getPicture(id): Observable<Picture> {
    const url = `${environment.API_URL}${this.endpoint}/${id}`;
    return this.http.get<Picture>(url)
      .retry(3);
  }

  getPictures(albums, order, page, limit): Observable<any> {
    let Params = new HttpParams();
    Params = Params.append('_order', order);
    Params = Params.append('_page', page);
    Params = Params.append('_limit', limit);

    albums.map(id => {
      Params = Params.append('albumId', id);
    });

    const url = `${environment.API_URL}${this.endpoint}`;
    return this.http.get<any>(url, { observe: 'response', params: Params })
      .map(resp => {
        return resp.body;
      })
      .retry(3);
  }
}
