import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      mat-sidenav {
        width: 300px;
      }

      .container {
        margin: 10px;
      }
    `,
  ],
})
export class HomeComponent {
  /* auth!: Auth; */

  constructor(private router: Router, private authService: AuthService) {}

  get auth() {
    return this.authService.auth;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
