import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlbumService } from 'src/app/album.service';
import { AuthService } from 'src/app/auth.service';
import { Album } from '../album';

@Component({
  selector: 'app-album-preview',
  templateUrl: './album-preview.component.html',
  styleUrls: ['./album-preview.component.css']
})
export class AlbumPreviewComponent implements OnInit {
  album: Album;
  id: number;

  constructor(
    private service: AlbumService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
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
}
