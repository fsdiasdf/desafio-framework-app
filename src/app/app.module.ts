import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component'
import { PostModule } from './post/post.module';
import { PostService } from './post.service';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component'
import { AuthService } from './auth.service';
import { AlbumModule } from './album/album.module';
import { AlbumService } from './album.service';
import { Comentario } from './comentario/comentario';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    PostModule,
    AlbumModule
  ],
  providers: [
    PostService,
    AlbumService,
    Comentario,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
