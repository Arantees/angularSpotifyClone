import { newMusica } from 'src/app/common/factories';
import { PlayerService } from './../services/player.service';
import { SpotifyService } from 'src/app/pages/services/spotify.service';
import { IMusica } from './../../Interfaces/IMusica';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  musicas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();

  subs: Subscription[] = [];

  //iconePlay

  playIcone = faPlay;

  constructor(
    private spotifyService : SpotifyService,
    private playerService: PlayerService
  ) { }
  

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

async obterMusicas() {
  this.musicas = await this.spotifyService.buscarMusicas()
  console.log(this.musicas)
}

obterMusicaAtual(){
 const  sub = this.playerService.musicaAtual.subscribe(musica => {
this.musicaAtual = musica;
  });
  
  this.subs.push(sub);
}

obterArtistas(musica: IMusica) {
  return musica.artistas.map(artista => artista.nome).join(', ')
}

async executarMusica(musica: IMusica){
await this.spotifyService.executarMusica(musica.id);
this.playerService.definirMusicaAtual(musica);
 }

}
