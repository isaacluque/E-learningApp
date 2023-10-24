import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { ResponseCreateUser, User } from '../interfaces/create-user';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  private readonly baseURL: string = environment.baseURL;

  private http = inject(HttpClient);

  private _createuserresponse = signal<User|null>(null);

  public createuserresponse = computed(() => this._createuserresponse());

  postUserMaintenance(name: string, username: string, password: string, id_rol: number, email: string, created_by: number, ): Observable<ResponseCreateUser> {
    const url: string = `${this.baseURL}/user/maintenance/create-user`

    const body = {
      name,
      username,
      password,
      id_rol,
      email,
      created_by
    }

    return this.http.post<ResponseCreateUser>(url, body)
      .pipe(
        tap(({User}) =>{
          this._createuserresponse.set(User);
        }),
        catchError(err => throwError(() => {err.error.msg}))
      )
  }

}
