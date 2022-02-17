import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Post } from '../post'
import { PostService } from '../../post.service'
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  post: Post;
  success: boolean =  false;
  errors: String[];
  id: number;
  base64Image: string[] = [];
  usuarioLogado: string;

  constructor(private service: PostService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private authService: AuthService) { 
    this.post = new Post();
  }

    ngOnInit() {
      this.usuarioLogado = this.authService.getUsuarioAutenticado();
      let params : Observable<Params> = this.activatedRoute.params;
      params.subscribe ( urlParams => {
        this.id = urlParams['id'];
        if(this.id) {

          this.service.getPostPorId(this.id)
            .subscribe(
              response => this.post = response, 
              errorResponse => this.post = new Post()
            )
        }
      })
  }

  onChange(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
  
      reader.onload =this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }



  handleReaderLoaded(readerEvt) {
     this.base64Image.push(btoa(readerEvt.target.result));
   }

  voltarParaLista(){
    this.router.navigate(['/post/lista']);
  }

  onSubmit(){
    if(this.id) {
      this.service
        .atualizar(this.post)
        .subscribe(response => {
          this.success = true;
          this.errors = [];
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o Post.']
        })
    } else{
      this.post.usuario = this.usuarioLogado;
      this.post.imagens = this.base64Image;
      this.service
      .salvar(this.post)
      .subscribe( response => {
        this.success = true;
        this.errors = [];
        this.post = response;
      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      });
    }
  }

}
