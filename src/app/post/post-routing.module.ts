import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { PostFormComponent } from './post-form/post-form.component'
import { PostListaComponent } from './post-lista/post-lista.component';

const routes: Routes = [
  { path: 'post', component: LayoutComponent, canActivate: [AuthGuard], children: [
    { path: 'form', component: PostFormComponent },
    { path: 'form/:id', component: PostFormComponent },
    { path: 'lista', component: PostListaComponent },
    { path: '', redirectTo : '/post/lista', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
