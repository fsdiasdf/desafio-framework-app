import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from 'src/app/album.service';
import { AuthService } from 'src/app/auth.service';
import { Album } from '../album';

@Component({
  selector: 'app-album-lista',
  templateUrl: './album-lista.component.html',
  styleUrls: ['./album-lista.component.css']
})
export class AlbumListaComponent implements OnInit {

  albuns: Album[] = [];
  albumSelecionado: Album;
  mensagemSucesso: string;
  mensagemErro: string;
  usuarioLogado: string;

  constructor(
    private service: AlbumService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.usuarioLogado = this.authService.getUsuarioAutenticado();
    this.service.getAlbuns()
    .subscribe(response => this.albuns = response );
  }

  novoCadastro(){
    this.router.navigate(['/album/form'])
  }

  preparaDelecao(album: Album) {
    this.albumSelecionado = album;
  }

  deletarAlbum() {
    this.service.deletar(this.albumSelecionado)
    .subscribe(
      response => {
        this.mensagemSucesso = 'Álbum deletado com sucesso!'
        this.ngOnInit();
      },
      erro => this.mensagemErro = 'Ocorreu um erro ao deletar o Álbum.'
    )
  }

}
