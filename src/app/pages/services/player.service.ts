import { SpotifyService } from 'src/app/pages/services/spotify.service';
import { newMusica } from 'src/app/common/factories';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IMusica } from 'src/app/Interfaces/IMusica';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  

  musicaAtual = new BehaviorSubject<IMusica>(newMusica());
  timerId: any = null;


  constructor(private spotifyService: SpotifyService) {
    this.obterMusicaAtual();
  }

  async obterMusicaAtual() {
    clearTimeout(this.timerId);

    //obtenho a musica
    const musica = await this.spotifyService.obterMusicaAtual();
    this.definirMusicaAtual(musica);
    

    // para fazer o loop
    this.timerId = setInterval(async() => {
      await this.obterMusicaAtual();
    }, 5000)
  }

  definirMusicaAtual(musica: IMusica) {
    this.musicaAtual.next(musica);
  }

  async voltarMusica(){
    await this.spotifyService.voltarMusica()
  }

  async pauseMusica(){
    await this.spotifyService.pauseMusica()
  }

  async playMusica() {
   await this.spotifyService.playMusica(); 
  }
  
  async proximaMusica(){
  await this.spotifyService.proximaMusica()
  }

}
