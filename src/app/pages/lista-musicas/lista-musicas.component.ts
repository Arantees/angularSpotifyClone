import { PlayerService } from './../services/player.service';
import { SpotifyService } from './../services/spotify.service';
import { Subscription } from 'rxjs';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { newMusica } from 'src/app/common/factories';
import { IMusica } from './../../Interfaces/IMusica';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-musicas',
  templateUrl: './lista-musicas.component.html',
  styleUrls: ['./lista-musicas.component.scss']
})
export class ListaMusicasComponent implements OnInit, OnDestroy {

  bannerImagemUrl ='';
  bannerTexto = '';

musicas: IMusica[] = []
musicaAtual: IMusica = newMusica();
playIcone = faPlay;

title = '';

subs: Subscription[] = []
  

  constructor(
    private activedRoute: ActivatedRoute,
    private spotifyservice: SpotifyService,
    private playerService: PlayerService) { }
  

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  obterMusicaAtual(){
    const  sub = this.playerService.musicaAtual.subscribe(musica => {
   this.musicaAtual = musica;
     });
     
     this.subs.push(sub);
  }

obterMusicas(){
  const sub = this.activedRoute.paramMap.subscribe(async params =>{
    const tipo = params.get('tipo');  
    const id = params.get('id');    
    await this.obterDadosPagina(tipo, id);
  });
  this.subs.push(sub)
}
async obterDadosPagina(tipo: string, id: string){
  
  await this.obterDadosPlaylist(id);
  
}

async obterDadosPlaylist(playlistId: string){
  const playlistMusicas = await this.spotifyservice.buscarMusicasPlaylist(playlistId);
  this.definirDadosPagina(playlistMusicas.nome, playlistMusicas.imagemUrl, playlistMusicas.musicas);
  this.title= playlistMusicas.nome;
}


definirDadosPagina(bannerTexto: string, bannerImage: string, musicas: IMusica[]){
this.bannerImagemUrl = bannerImage;
this.bannerTexto = bannerTexto;
this.musicas = musicas;
}

obterArtistas(musica: IMusica) {
  return musica.artistas.map(artista => artista.nome).join(', ')
}

async executarMusica(musica: IMusica){
  await this.spotifyservice.executarMusica(musica.id);
  this.playerService.definirMusicaAtual(musica);
   }
}
