import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus } from '../interfaces/auth-status-enum';
import { User } from '../interfaces/user-login.interface';
import { CheckTokenAdmin } from '../interfaces/check-token-admin.response';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() {
    this.revalidateTokenAdmin().subscribe()
   }

   nameUser!: string;

   emailUser!: string;

   id_user!: number;

  private readonly baseURL: string = environment.baseURL;

  private http = inject(HttpClient);

  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public authStatus = computed(() => this._authStatus());

  //Administrator
  private _authResponseUser = signal<User|null>(null);
  public authResponseUser = computed(() => this._authResponseUser());


  private setAuthenticated(User: User, token: string): boolean {
    this._authResponseUser.set(User);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    this.nameUser = User.NOMBRE_USUARIO;
    this.emailUser = User.CORREO_ELECTRONICO;
    this.id_user = User.ID_USUARIO;
    return true;
  }

  login(email: string, password: string): Observable<boolean> {

    const url: string = `${this.baseURL}/auth/login`;

    const body = {email, password};
    return this.http.post<AuthResponse>(url, body)
    .pipe(
      map( ({User, token}) => this.setAuthenticated(User, token)),
      catchError( err => throwError( () => (err.error.msg) ))
    )
  }

  revalidateTokenAdmin(): Observable<boolean> {
    const url: string = `${this.baseURL}/auth/revalidateToken`;
    const token = localStorage.getItem('token');

    if(!token) {
      this.logout()
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('x-token', `${token}`);

      return this.http.get<CheckTokenAdmin>(url, {headers})
        .pipe(
          map( ({User, token}) => this.setAuthenticated(User, token)),
          catchError(() => {
            this._authStatus.set(AuthStatus.noAuthenticated);
            return of(false)
          })
        )
  }

  logout() {
    localStorage.removeItem('token');
    this._authResponseUser.set(null);
    this._authStatus.set(AuthStatus.noAuthenticated);
  }

}
