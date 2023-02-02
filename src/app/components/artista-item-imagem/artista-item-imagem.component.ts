import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artista-item-imagem',
  templateUrl: './artista-item-imagem.component.html',
  styleUrls: ['./artista-item-imagem.component.scss']
})
export class ArtistaItemImagemComponent implements OnInit {


  menuSelecionado = 'Home';

  @Input()
  imagemSrc= '';

  @Input()
  artistaId= '';

  @Output()
  click = new EventEmitter<void>();

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  onClick(){
  this.click.emit()
  this.irParaArtista(this.artistaId)

  }

  irParaArtista(artistaId: string){
    this.menuSelecionado = artistaId;
    this.router.navigateByUrl(`player/artista-musicas/${artistaId}`)
  }

}

