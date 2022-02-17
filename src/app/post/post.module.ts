import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { PostRoutingModule } from './post-routing.module';
import { PostFormComponent } from './post-form/post-form.component';
import { PostListaComponent } from './post-lista/post-lista.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PostFormComponent, 
    PostListaComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    PostFormComponent,
    PostListaComponent
  ]
})
export class PostModule { }
