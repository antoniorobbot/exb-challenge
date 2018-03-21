import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DndModule } from 'ng2-dnd';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { GalleryComponent } from './gallery/gallery.component';
import { UsersComponent } from './shared/components/users/users.component';
import { AlbumsComponent } from './shared/components/albums/albums.component';
import { PicturesComponent } from './shared/components/pictures/pictures.component';

import { UsersService } from './shared/services/users.service';
import { AlbumsService } from './shared/services/albums.service';
import { PicturesService } from './shared/services/pictures.service';
import { AlbumFormComponent } from './shared/components/album-form/album-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [
    GalleryComponent,
    UsersComponent,
    AlbumsComponent,
    PicturesComponent,
    AlbumFormComponent,
  ],
  providers: [
    UsersService,
    AlbumsService,
    PicturesService,
  ],
})
export class ImageGalleryModule { }
