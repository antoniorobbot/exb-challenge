import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Album } from './../../models/album.model';
import { AlbumsService } from './../../services/albums.service';
import { UsersService } from './../../services/users.service';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
}) export class AlbumFormComponent implements OnInit {
  @Input() visible: boolean;
  @Input() userId;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  albumForm: FormGroup;
  albumTitle;
  submitAttempt = false;

  constructor(
    private albumService: AlbumsService,
    private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() { }

  createForm() {
    this.albumForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  createAlbum() {
    this.submitAttempt = true;
    if (!this.albumForm.valid) {
      return;
    }
    const album = new Album();
    album.title = this.albumTitle;
    album.userId = this.userId;

    this.albumService.postAlbum(album)
      .subscribe(hero => this.close());
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.submitAttempt = false;
    this.albumForm.reset();
  }
}
