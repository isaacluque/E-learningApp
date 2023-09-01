import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus } from '../interfaces/auth-status-enum';
import { User } from '../interfaces/user-login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly baseURL: string = environment.baseURL;

  private http = inject(HttpClient);

  private _authResponseUser = signal<User|null>(null);

  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public authResponseUser = computed(() => this._authResponseUser());
  public authStatus = computed(() => this._authStatus());

  login(email: string, password: string): Observable<boolean> {

    const url: string = `${this.baseURL}/auth/login`;

    const body = {email, password};
    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap( ({User, token}) => {

          this._authResponseUser.set(User);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token);
      }),
      map( () => true ),
      catchError( err => throwError( () => (err.error.msg) ))
    )
    }

  constructor() { }
}
