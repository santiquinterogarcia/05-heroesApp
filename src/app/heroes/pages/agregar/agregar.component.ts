import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      .margenAbajo {
        margin-bottom: 20px;
      }

      img {
        width: 100%;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      description: 'DC Comics',
    },
    {
      id: 'Marvel Comics',
      description: 'Marvel Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.MarvelComics,
    alt_image: '',
  };

  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.activateRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroeById(id)))
        .subscribe((heroe) => (this.heroe = heroe));
    }
  }

  guardarHeroe() {
    if (
      this.heroe.superhero.trim().length !== 0 &&
      this.heroe.alter_ego.trim().length !== 0 &&
      this.heroe.characters.trim().length !== 0 &&
      this.heroe.first_appearance.trim().length !== 0 &&
      this.heroe.publisher.trim().length !== 0
    ) {
      if (this.heroe.id) {
        //Actualizar
        this.heroesService.putHeroe(this.heroe).subscribe((heroe) => {
          this.mostrarSnackBar('Héroe actualizado');
          this.router.navigate(['/heroes', heroe.id]);
        });
      } else {
        //Guardar
        this.heroesService.postHeroe(this.heroe).subscribe((heroe) => {
          this.mostrarSnackBar('Héroe agregado');
          this.router.navigate(['/heroes', heroe.id]);
        });
      }
    }
  }

  eliminarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      data: { ...this.heroe },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService
          .deleteHeroe(this.heroe.id!)
          .subscribe((heroe) => this.router.navigate(['/heroes']));
      }
    });
  }

  mostrarSnackBar(mensaje: string): void {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 1000,
    });
  }
}
