import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {

  // criar variavel para armazenar os dados da playlist

  constructor(
    // injetar o router do angular
    // injetar o service do spotify
  ) { }

  ngOnInit(): void {
    // chamar o metodo q pega os dados da playlist
  }

  // criar um metodo para pegar os dados da playlist no spotifyService

}
