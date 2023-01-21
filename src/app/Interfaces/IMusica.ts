export interface IMusica {
    id: string,
    titulo: string,
    tocando?: boolean,
    artistas :{
        id: string,
        nome: string
    }[],
    album : {
        id: string,
        nome: string,
        imagemUrl: string
    },
    tempo: string
}