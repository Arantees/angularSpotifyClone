import { IPlaylist } from 'src/app/Interfaces/IPlaylist';
import { IMusica } from './../Interfaces/IMusica';
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons';
import { IArtista } from './../Interfaces/IArtista';
export function newArtista(): IArtista {
    return {
        id:'',
        imagemUrl: '',
        nome: '',
        musicas: []
    };
}

export function newMusica():IMusica {
    return{
        id: '',
        album: {
            id: '',
            imagemUrl: '',
            nome: '',

        },
        artistas: [],
        tempo: '',
        titulo: '',
    }
}

export function newPlaylist() : IPlaylist{
    return {
        id: '',
        imagemUrl: '',
        nome:'',
        musicas: [],
    }
}