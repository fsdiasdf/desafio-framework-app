import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from 'src/app/album.service';
import { AuthService } from 'src/app/auth.service';
import { Album } from '../album';

@Component({
  selector: 'app-album-timeline',
  templateUrl: './album-timeline.component.html',
  styleUrls: ['./album-timeline.component.css']
})
export class AlbumTimelineComponent implements OnInit {

  albuns: Album[] = [];
  albumSelecionado: Album;

  constructor(
    private service: AlbumService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.service.getAlbuns()
    .subscribe(response => this.albuns = response );
  }

}
