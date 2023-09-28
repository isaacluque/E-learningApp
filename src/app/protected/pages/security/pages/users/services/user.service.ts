import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { RespViewUser, ViewUser } from '../interfaces/view-users.interface';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseURL: string = environment.baseURL;

  private http = inject(HttpClient);

  private _respviewuser = signal<ViewUser|null>(null);

  public respviewuser = computed(() => this._respviewuser());

  constructor() { }

  getUsers(lim?: string, from?: string, search?: string): Observable<ViewUser[]> {

    const url: string = `${this.baseURL}/user/?lim=${!lim ? '' : lim}&from=${!from ? '' : from}&search=${!search ? '' : search}`;

    return this.http.get<RespViewUser>(url)
      .pipe(
        map(resp => resp.ViewUser),
        tap(console.log),
        catchError(err => throwError(() => (err.error.msg)))
      )

  }
}
