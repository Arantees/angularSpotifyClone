import { SpotifyService } from 'src/app/pages/services/spotify.service';
import { Subscription } from 'rxjs';
import { PlayerService } from './../../pages/services/player.service';
import { newMusica } from 'src/app/common/factories';
import { IMusica } from 'src/app/Interfaces/IMusica';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faPause, faStepBackward, faStepForward, faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  musica: IMusica = newMusica();
  subs: Subscription [] = []

  //icones
  anteriorIcone = faStepBackward
  proximoIcone = faStepForward
  pauseIcone = faPause
  playIcone = faPlay



  constructor(private playerService: PlayerService ) { }
 

  ngOnInit(): void {
    this.obterMusicaTocando();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

obterMusicaTocando(){
  const sub = this.playerService.musicaAtual.subscribe(musica => {
    this.musica = musica;
  });

  this.subs.push(sub);
}

voltarMusica(){
  this.playerService.voltarMusica();
}
pauseMusica(){
  this.playerService.pauseMusica();
  
}
playMusica(){
  this.playerService.playMusica();
}

proximaMusica(){
  this.playerService.proximaMusica();
}

}
