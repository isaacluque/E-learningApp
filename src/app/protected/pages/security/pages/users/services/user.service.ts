import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { RespViewUser, ViewUser } from '../interfaces/view-users.interface';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { UserResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseURL: string = environment.baseURL;

  private http = inject(HttpClient);

  private _respviewuser = signal<ViewUser|null>(null);

  public respviewuser = computed(() => this._respviewuser());

  constructor() { }

  getUsers(lim?: string, from?: string, buscar?: string): Observable<RespViewUser> {

    let params = new HttpParams();

    if (lim !== undefined && lim !== null) {
      params = params.append('lim', lim.toString());
    }

    if (from !== undefined && from !== null) {
      params = params.append('from', from.toString());
    }

    if (buscar !== undefined) {
      params = params.append('buscar', buscar);
    }

    // const url: string = `${this.baseURL}/user/?lim=${!lim ? '' : lim}&from=${!from ? '' : from}&search=${!search ? '' : search}`;

    return this.http.get<RespViewUser>(`${this.baseURL}/user`,{params})
      .pipe(
        catchError(err => throwError(() => (err.error.msg)))
      )

  }

  // getUser(id_user: number): Observable<RespViewUser[]> {
  //   const url: string = `${this.baseURL}/user/${id_user}`;

  //   return this.http.get<UserResponse>(url)
  //     .pipe(
  //       catchError(err => throwError(() => (err.error.msg)))
  //     )
  // }

  putBlockUser(id_user:number, ){
    const url: string = `${this.baseURL}/user/blocked/${id_user}`

    return this.http.put<UserResponse>(url, {})
      .pipe(
        catchError(err => throwError(() => (err.error.msg)))
      )
  }
  putActivateUser(id_user:number, ){
    const url: string = `${this.baseURL}/user/actived/${id_user}`

    return this.http.put<UserResponse>(url, {})
      .pipe(
        catchError(err => throwError(() => (err.error.msg)))
      )
  }

  getImagenes(): Observable<ViewUser[]> {
    const url: string = `${this.baseURL}/user/imagen/user`;

    return this.http.get<RespViewUser>(url)
      .pipe(
        map(resp => resp.ViewUser),
        tap(console.log),
        catchError(err => throwError(() => (err.error.msg)))
      )
  }
}


