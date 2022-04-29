import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor(private http: HttpClient) {}

  get auth(): Auth {
    return { ...this._auth! };
  }

  verificaAutenticacion(): Observable<boolean> {
    if (localStorage.getItem('id')) {
      return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
        map((auth) => {
          this._auth = auth;
          return true;
        })
      );
    } else {
      return of(false);
    }
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap((auth) => (this._auth = auth)),
      tap((auth) => localStorage.setItem('id', auth.id))
    );
  }

  logout() {
    this._auth = undefined;
    localStorage.removeItem('id');
  }
}
