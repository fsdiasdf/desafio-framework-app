import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { PostService } from '../../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-lista',
  templateUrl: './post-lista.component.html',
  styleUrls: ['./post-lista.component.css']
})
export class PostListaComponent implements OnInit {

  posts: Post[] = [];
  postSelecionado: Post;
  mensagemSucesso: string;
  mensagemErro: string;
  usuarioLogado: string;

  constructor(private service: PostService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() : void{
    this.usuarioLogado = this.authService.getUsuarioAutenticado();
    this.service.getPosts()
    .subscribe(response => this.posts = response );
  }

  novoCadastro(){
    this.router.navigate(['/post/form'])
  }

  preparaDelecao(post: Post) {
    this.postSelecionado = post;
  }

  deletarPost() {
    this.service.deletar(this.postSelecionado)
    .subscribe(
      response => {
        this.mensagemSucesso = 'Post deletado com sucesso!'
        this.ngOnInit();
      },
      erro => this.mensagemErro = 'Ocorreu um erro ao deletar o Post.'
    )
  }
}
