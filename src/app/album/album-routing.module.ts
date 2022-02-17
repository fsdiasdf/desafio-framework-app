import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { AlbumFormComponent } from './album-form/album-form.component';
import { AlbumListaComponent } from './album-lista/album-lista.component';
import { AlbumPreviewComponent } from './album-preview/album-preview.component';
import { AlbumTimelineComponent } from './album-timeline/album-timeline.component';


const routes: Routes = [
  { path: 'album', component: LayoutComponent, canActivate: [AuthGuard], children: [
    { path: 'form', component: AlbumFormComponent },
    { path: 'timeline', component: AlbumTimelineComponent },
    { path: 'preview/:id', component: AlbumPreviewComponent },
    { path: 'form/:id', component: AlbumFormComponent },
    { path: 'lista', component: AlbumListaComponent },
    { path: '', redirectTo : '/album/lista', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
