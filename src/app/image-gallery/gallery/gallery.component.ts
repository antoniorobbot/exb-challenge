import { Album } from './../shared/models/album.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  albumRemoved: '';
  userSelected = '';

  constructor() { }

  ngOnInit() {
  }

  userUpdatedEvent(event): void {
    this.userSelected = event;
  }

  albumRemovedEvent(event): void {
    this.albumRemoved = event;
  }

}
