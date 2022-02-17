import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ComentarioService } from '../comentario.service';
import { Comentario } from '../comentario/comentario';
import { PostService } from '../post.service';
import { Post } from '../post/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  success: boolean =  false;
  errors: String[];
  comentarioString: string;
  usuarioLogado: string;

  constructor(
    private service: PostService,
    private comentarioService : ComentarioService,
    private authService: AuthService) { }

  ngOnInit() {
    this.usuarioLogado = this.authService.getUsuarioAutenticado();
    this.service.getPosts()
    .subscribe(response => {
      this.posts = response 
      console.log(this.posts)
    } );
  }

  adicionarComentario(post: Post) {
    const comentario: Comentario = new Comentario();
    comentario.comentario = this.comentarioString;
    comentario.usuario = this.usuarioLogado;
    comentario.post = post.id;

    this.comentarioService.salvar(comentario)
    .subscribe( response => {
      this.success = true;
      this.errors = [];
    }, errorResponse => {
      this.success = false;
      this.errors = ['Erro ao salvar o Comentário.'];
    });
  }
  
}
