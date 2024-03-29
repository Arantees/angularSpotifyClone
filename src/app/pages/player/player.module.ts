import { ArtistaMusicasComponent } from './../../components/artista-musicas/artista-musicas.component';
import { BannerComponent } from './../../components/banner/banner.component';
import { ListaMusicasComponent } from './../lista-musicas/lista-musicas.component';
import { PlayerCardComponent } from './../../components/player-card/player-card.component';
import { ArtistaItemImagemComponent } from './../../components/artista-item-imagem/artista-item-imagem.component';
import { BuscasRecentesComponent } from './../../components/buscas-recentes/buscas-recentes.component';
import { PainelDireitoComponent } from './../../components/painel-direito/painel-direito.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlayerComponent } from "./player.component";
import { RouterModule } from "@angular/router";
import { PlayerRotas } from "./player.routes";
import { PainelEsquerdoComponent } from "src/app/components/painel-esquerdo/painel-esquerdo.component";
import { BotaoMenuComponent } from "src/app/components/botao-menu/botao-menu.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RodapeUsuarioComponent } from "src/app/components/rodape-usuario/rodape-usuario.component";
import { HomeComponent } from "../home/home.component";
import { TopArtistaComponent } from "src/app/components/top-artista/top-artista.component";
import { FormsModule } from '@angular/forms';
import { TopArtistasComponent } from 'src/app/components/top-artistas/top-artistas.component';

@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    TopArtistaComponent,
    PainelDireitoComponent,
    BuscasRecentesComponent,
    TopArtistasComponent,
    ArtistaItemImagemComponent,
    PlayerCardComponent,
    ListaMusicasComponent,
    BannerComponent,
    ArtistaMusicasComponent,
    
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(PlayerRotas),
  ],
})
export class PlayerModule { }
