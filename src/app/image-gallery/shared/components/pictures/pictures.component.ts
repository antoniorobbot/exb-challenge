import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { AlbumsService } from './../../services/albums.service';
import { PicturesService } from './../../services/pictures.service';
import { Picture } from './../../models/picture.model';

import 'rxjs/add/operator/merge';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {
  @Output() removedAlbum = new EventEmitter();

  pictures = [];
  totalPhotos = 0;
  order = 'asc';
  limitPage = 10;
  lastPage = 5;
  page = 1;

  albumsSelected: Array<any> = [];

  constructor(
    private picturesService: PicturesService,
    private albumsService: AlbumsService,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }

  ngOnInit() {
  }

  transferDataSuccess($event: any) {
    const albumExists = this.albumsSelected.find(album => album.id === $event.dragData.id);
    if (albumExists) {
      this.removedAlbum.emit(albumExists);
      return;
    }
    this.albumsSelected.push($event.dragData);
    this.totalPhotos += $event.dragData.photosLength;

    this.getAlbumPhotos(this.albumsSelected, this.order, this.page, this.limitPage);
  }

  getAlbumPhotos(albumId, order, page, limit) {
    this.startLoading();

    const albumsIds = albumId.map(alb => alb.id);
    if (albumsIds.length === 0) {
      this.pictures = [];
      this.completeLoading();
      return;
    }

    this.picturesService.getPictures(albumsIds, order, page, limit)
      .subscribe((res) => {
        this.pictures = res;
        this.lastPage = Math.ceil(this.totalPhotos / this.limitPage);
        this.completeLoading();
      });
  }

  removeAlbum(albumId) {
    const albumRemoved = this.albumsSelected.find(album => album.id === albumId);
    this.removedAlbum.emit(albumRemoved);

    this.albumsSelected = this.albumsSelected.filter((album) => {
      return album.id !== albumId;
    });
    this.totalPhotos -= albumRemoved.photosLength;
    this.getAlbumPhotos(this.albumsSelected, this.order, this.page, this.limitPage);
  }

  nextPage() {
    this.page++;
    this.getAlbumPhotos(this.albumsSelected, this.order, this.page, this.limitPage);
  }

  previousPage() {
    this.page--;
    this.getAlbumPhotos(this.albumsSelected, this.order, this.page, this.limitPage);
  }

  changeOrder(value) {
    this.page = 1;
    this.order = value;
    this.pictures = [];
    this.getAlbumPhotos(this.albumsSelected, this.order, this.page, this.limitPage);
  }

  changeLimit() {
    this.page = 1;
    this.getAlbumPhotos(this.albumsSelected, this.order, this.page, this.limitPage);
  }

  startLoading() {
    this.slimLoadingBarService.start(() => {
    });
  }

  completeLoading() {
    this.slimLoadingBarService.complete();
  }

}
