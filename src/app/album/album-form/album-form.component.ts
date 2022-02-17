import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlbumService } from 'src/app/album.service';
import { AuthService } from 'src/app/auth.service';
import { Album } from '../album';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css']
})
export class AlbumFormComponent implements OnInit {

  album: Album;
  success: boolean =  false;
  errors: string[];
  id: number;
  base64Image: string[] = [];
  usuarioLogado: string;

  constructor(
    private service: AlbumService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private authService: AuthService
  ) {
    this.album = new Album();
   }

  ngOnInit() {
    this.usuarioLogado = this.authService.getUsuarioAutenticado();
      let params : Observable<Params> = this.activatedRoute.params;
      params.subscribe ( urlParams => {
        this.id = urlParams['id'];
        if(this.id) {

          this.service.getAlbumPorId(this.id)
            .subscribe(
              response => this.album = response, 
              errorResponse => this.album = new Album()
            )
        }
      })
  }

  voltarParaLista(){
    this.router.navigate(['/album/lista']);
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

  onSubmit(){
    if(this.id) {
      console.log(this.album);
      this.service
        .atualizar(this.album)
        .subscribe(response => {
          this.success = true;
          this.errors = [];
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o Post.']
        })
    } else{
      this.album.usuario = this.usuarioLogado;
      this.album.imagens = this.base64Image;
      this.service
      .salvar(this.album)
      .subscribe( response => {
        this.success = true;
        this.errors = [];
        this.album = response;
      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      });
    }
  }

}
