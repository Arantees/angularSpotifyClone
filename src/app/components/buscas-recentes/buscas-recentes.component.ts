import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscas-recentes',
  templateUrl: './buscas-recentes.component.html',
  styleUrls: ['./buscas-recentes.component.scss']
})
export class BuscasRecentesComponent implements OnInit {

  pesquisasRecentes = [
    'Top Brasil', 'Funk Hits', 'Esquenta Sertanejo', 
    ' Mix Lukas Graham', 'Mix Hip Hop'
  ]

  campoPesquisa = '';

  constructor() { }

  ngOnInit(): void {
  }

  definirPesquisa(pesquisa: string) {
    this.campoPesquisa = pesquisa;
  }

  buscar(){
    
  }
}
