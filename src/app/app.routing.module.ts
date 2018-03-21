import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryComponent } from './image-gallery/gallery/gallery.component';
import { NotFoundComponent } from './static-pages/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: GalleryComponent,
    },
    {
        path: '404', component: NotFoundComponent,
    },
    {
        path: '**', redirectTo: '/404'
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
