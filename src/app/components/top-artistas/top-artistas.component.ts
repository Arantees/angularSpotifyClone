import { IArtista } from 'src/app/Interfaces/IArtista';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/pages/services/spotify.service';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrls: ['./top-artistas.component.scss']
})
export class TopArtistasComponent implements OnInit {

artistas : IArtista[] = [];

  constructor(private spotifyService: SpotifyService) { }


  ngOnInit(): void {
    this.buscarTopArtistas();
  }

  async buscarTopArtistas(){
    this.artistas = await this.spotifyService.buscarTopArtistas(5);
    console.log(this.artistas)
  }

}
