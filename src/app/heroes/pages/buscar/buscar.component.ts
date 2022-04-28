import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    this.heroesService
      .getSugerenciasHeroe(this.termino)
      .subscribe((heroes) => (this.heroes = heroes));
  }

  opcionSeleccionada(evento: MatAutocompleteSelectedEvent) {
    if (evento.option.value) {
      const heroe: Heroe = evento.option.value;
      this.termino = heroe.superhero;

      this.heroesService
        .getHeroeById(heroe.id!)
        .subscribe((heroe) => (this.heroeSeleccionado = heroe));
    }
  }
}
