import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Album } from './../models/album.model';
import { Picture } from './../models/picture.model';
import { environment } from './../../../../environments/environment';

import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';

@Injectable()
export class AlbumsService {
  endpoint = '/albums';

  constructor(
    private http: HttpClient,
  ) { }

  getAlbums(): Observable<Album> {
    const url = `${environment.API_URL}${this.endpoint}`;
    return this.http.get<Album>(url)
      .retry(3);
  }

  getAlbumPhotos(id): Observable<Picture[]> {
    const url = `${environment.API_URL}${this.endpoint}/${id}/photos`;
    return this.http.get<Picture[]>(url)
      .retry(3);
  }

  postAlbum(album): Observable<Album> {
    const url = `${environment.API_URL}${this.endpoint}`;
    return this.http.post<Album>(url, album)
      .retry(3);
  }
}
