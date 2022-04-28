import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-card-component',
  templateUrl: './heroe-card-component.component.html',
  styles: [
    `
      mat-card {
        min-height: 740px;
        margin-bottom: 20px;
      }
      mat-card-content {
        height: 145px;
      }
      mat-card-actions {
        margin-bottom: 30px !important;
      }
    `,
  ],
})
export class HeroeCardComponentComponent {
  @Input() heroe!: Heroe;
}
