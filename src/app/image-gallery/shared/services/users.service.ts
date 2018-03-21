import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from './../models/user.model';
import { Album } from './../models/album.model';
import { environment } from './../../../../environments/environment';

import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';


@Injectable()
export class UsersService {
  endpoint = '/users';

  constructor(
    private http: HttpClient,
  ) { }

  getUser(id): Observable<User> {
    const url = `${environment.API_URL}${this.endpoint}/${id}`;
    return this.http.get<User>(url)
      .retry(3);
  }

  getUserAlbums(id): Observable<Album[]> {
    const url = `${environment.API_URL}${this.endpoint}/${id}/albums`;
    return this.http.get<Album[]>(url)
      .retry(3);
  }

  getUsersSearch(query, order): Observable<User[]> {
    const params = new HttpParams()
      .set('q', query)
      .set('_order', order);

    const url = `${environment.API_URL}${this.endpoint}`;
    return this.http.get<User[]>(url, { params })
      .retry(3);

  }

  getUsers(order): Observable<User[]> {
    const params = new HttpParams()
      .set('_order', order);

    const url = `${environment.API_URL}${this.endpoint}`;
    return this.http.get<User[]>(url, { params })
      .retry(3);
  }

}
