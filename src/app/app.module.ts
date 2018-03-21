import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { ImageGalleryModule } from './image-gallery/image-gallery.module';
import { StaticPagesModule } from './static-pages/static-pages.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImageGalleryModule,
    StaticPagesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
