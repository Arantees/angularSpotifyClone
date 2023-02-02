import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpotifyService } from 'src/app/pages/services/spotify.service';
import { Subscription } from 'rxjs';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-artista-musicas',
  templateUrl: './artista-musicas.component.html',
  styleUrls: ['./artista-musicas.component.scss']
})
export class ArtistaMusicasComponent implements OnInit, OnDestroy {
  
  bannerImagemUrl =''
  bannerTexto = '';
  subs: Subscription[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyservice: SpotifyService,
  ) { }

  ngOnInit(): void {
    this.obterArtistaMusicas();
  
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  obterArtistaMusicas() {
    const sub = this.activatedRoute.paramMap.subscribe(async params =>{
      const id = params.get('id');
      await this.obterDadosArtista(id);
    });
    this.subs.push(sub);
    
  }
  async obterDadosArtista(artistaId: string){
    const artista = await this.spotifyservice.buscarArtista(artistaId)
    this.bannerImagemUrl = artista.imagemUrl
    this.bannerTexto = artista.nome
  }

}
