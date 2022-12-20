import { Injectable } from "@angular/core";
import { SpotifyConfiguration } from "src/environments/environment";
import Spotify from "spotify-web-api-js";
import { IUsuario } from "src/app/Interfaces/IUsuario";
import {
  SpotifyPlaylistParaPlaylist,
  spotifyUserParaUsuario,
} from "src/app/common/spotifyHelper";
import { IPlaylist } from "src/app/Interfaces/IPlaylist";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario() {
    if (!!this.usuario) return !!this.usuario;

    const token = localStorage.getItem("token");

    if (!token) return false;

    try {
      this.definirAccesToken(token);
      await this.obterSpotifyUsuario();
      return true;
    } catch (ex) {
      return false;
    }
  }

  async obterSpotifyUsuario() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = spotifyUserParaUsuario(userInfo);
  }

  obterUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join("%20")}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback() {
    if (!window.location.hash) return "";

    const params = window.location.hash.substring(1).split("&");
    return params[0].split("=")[1];
  }
  definirAccesToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem("token", token);
  }
  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, {
      offset,
      limit,
    });
    return playlists.items.map(SpotifyPlaylistParaPlaylist);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}