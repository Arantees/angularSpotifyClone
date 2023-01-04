import { IMusica } from './../Interfaces/IMusica';
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons';
import { IArtista } from './../Interfaces/IArtista';
export function newArtista(): IArtista {
    return {
        id:'',
        imagemUrl: '',
        nome: '',
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