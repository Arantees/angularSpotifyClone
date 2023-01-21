import { newMusica } from 'src/app/common/factories';
import { IArtista } from './../Interfaces/IArtista';
import { IPlaylist } from "../Interfaces/IPlaylist";     
import { IUsuario } from "../Interfaces/IUsuario";
import { IMusica } from '../Interfaces/IMusica';
import { addMilliseconds, format } from 'date-fns';

export function spotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario {
    return {
        id: user.id,
        nome: user.display_name,
        imagemUrl: user.images.pop().url
    }
}


export function SpotifyPlaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
    return {
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: playlist.images.pop().url
    };
}

export function SpotifyArtistaParaArtista(SpotifyArtista: SpotifyApi.ArtistObjectFull) : IArtista{
    return {
        id:SpotifyArtista.id,
        imagemUrl: SpotifyArtista.images.sort((a,b) => a.width - b.width).pop().url,
        nome:SpotifyArtista.name
    };
}

export function SpotifyTrackParaMusica(spotifyTrack: SpotifyApi.TrackObjectFull, response: SpotifyApi.CurrentlyPlayingResponse = null) : IMusica{

    if (!spotifyTrack)
    return newMusica();

    const msParaMinutos = (ms: number) => {
        const data =addMilliseconds(new Date(0), ms);
        return format(data, 'mm:ss');
    }

    return {
        id: spotifyTrack.uri,
        titulo: spotifyTrack.name,
        tocando: response?.is_playing ?? false,
        album: {
            id: spotifyTrack.id,
            imagemUrl:spotifyTrack.album.images.shift().url,
            nome: spotifyTrack.album.name
        },
        artistas: spotifyTrack.artists.map(artista => ({
            id: artista.id,
            nome: artista.name,
        })),
        tempo: msParaMinutos(spotifyTrack.duration_ms),
    }
}