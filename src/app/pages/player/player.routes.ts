import { ListaMusicasComponent } from './../lista-musicas/lista-musicas.component';

import { Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { PlayerComponent } from "./player.component";

export const PlayerRotas: Routes = [{
    path: '',
    component: PlayerComponent,
    children: [
        {
            path: 'home',
            component: HomeComponent,
        },
        // criar outra rota para playlist
        {
            path: 'lista/:tipo/:id',
            component: ListaMusicasComponent
        },

    ]
}]