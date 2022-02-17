import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumFormComponent } from './album-form/album-form.component';
import { AlbumListaComponent } from './album-lista/album-lista.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlbumTimelineComponent } from './album-timeline/album-timeline.component';
import { AlbumPreviewComponent } from './album-preview/album-preview.component';


@NgModule({
  declarations: [
    AlbumFormComponent, 
    AlbumListaComponent, AlbumTimelineComponent, AlbumPreviewComponent
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    AlbumFormComponent,
    AlbumListaComponent
  ]
})
export class AlbumModule { }
