import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Component, OnChanges, OnInit, Output, EventEmitter, Input, SimpleChange, SimpleChanges } from '@angular/core';

import { PicturesService } from './../../services/pictures.service';
import { UsersService } from './../../services/users.service';
import { AlbumsService } from './../../services/albums.service';

import { Album } from './../../models/album.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnChanges {
  @Input() userInput: string;
  @Input() albumRemoved: string;

  showDialog = false;
  albums;

  constructor(
    private albumService: AlbumsService,
    private userService: UsersService,
    private pictureService: PicturesService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.userInput && changes.userInput.currentValue) {
      this.userInput = changes.userInput.currentValue;
      this.loadAlbums(this.userInput);
    }

    if (changes.albumRemoved && !changes.albumRemoved.firstChange) {
      this.albumRemoved = changes.albumRemoved.currentValue;
      this.albums.push(this.albumRemoved);
    }
  }

  ngOnInit() {
  }

  removeAlbum(e, index) {
    this.albums.splice(index, 1);
  }

  loadAlbums(userInput): void {
    this.userService.getUserAlbums(userInput)
      .subscribe(
        albums => {
          this.albums = this.getLenghtAlbum(albums);
        },
        err => {
          console.log(err);
        });
  }

  getLenghtAlbum(albums) {
    albums.map(alb => {
      this.albumService.getAlbumPhotos(alb.id).subscribe(
        photos => {
          alb.photosLength = photos.length;
        });
    });
    return albums;
  }
}
