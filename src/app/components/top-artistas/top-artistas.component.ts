import { PlayerService } from './../../pages/services/player.service';
import { ActivatedRoute } from '@angular/router';
import { IArtista } from 'src/app/Interfaces/IArtista';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/pages/services/spotify.service';
import { IMusica } from 'src/app/Interfaces/IMusica';
import { newMusica } from 'src/app/common/factories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrls: ['./top-artistas.component.scss']
})
export class TopArtistasComponent implements OnInit {

artistas : IArtista[] = [];
musicas: IMusica[] = []
musicaAtual: IMusica = newMusica();
title = '';

subs: Subscription[] = []

  constructor(
    private spotifyService: SpotifyService,
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
  ) { }


  ngOnInit(): void {
    this.buscarTopArtistas();
    this.obterMusicas();
  }

  async buscarTopArtistas(){
    this.artistas = await this.spotifyService.buscarTopArtistas(5);
    console.log(this.artistas)
    
  }
  obterMusicaAtual(){
    const  sub = this.playerService.musicaAtual.subscribe(musica => {
   this.musicaAtual = musica;
     });
     
     this.subs.push(sub);
  }
  obterMusicas(){
    const sub = this.activatedRoute.paramMap.subscribe(async params =>{
      const tipo = params.get('tipo');  
      const id = params.get('id');    
      await this.obterDadosPagina(tipo, id);
    });
    this.subs.push(sub)
  }
  async obterDadosPagina(tipo: string, id: string){
    if (tipo === 'playlist')
    await this.obterDadosPlaylist(id);
    else
    await this.obterDadosArtista(id);
  }
  async obterDadosPlaylist(playlistId: string){
    const playlistMusicas = await this.spotifyService.buscarMusicasPlaylist(playlistId);
    this.definirDadosPagina(playlistMusicas.nome, playlistMusicas.imagemUrl, playlistMusicas.musicas);
    this.title= playlistMusicas.nome;
  }
  
  async obterDadosArtista(artistaId: string){
    
  }
  definirDadosPagina(bannerTexto: string, bannerImage: string, musicas: IMusica[]){
    this.musicas = musicas;
    }
    
    obterArtistas(musica: IMusica) {
      return musica.artistas.map(artista => artista.nome).join(', ')
}
async executarMusica(musica: IMusica){
  await this.spotifyService.executarMusica(musica.id);
  this.playerService.definirMusicaAtual(musica);
   }
}