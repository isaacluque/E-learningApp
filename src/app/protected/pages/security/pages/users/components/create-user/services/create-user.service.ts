import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { ResponseCreateUser, User } from '../interfaces/create-user';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { GeneratePassword } from '../interfaces/generate-password';
import { DBPYMEDetails, ResponseCreatePYME } from '../interfaces/create-pyme';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  private readonly baseURL: string = environment.baseURL;

  private http = inject(HttpClient);

  private _createuserresponse = signal<User|null>(null);
  public createuserresponse = computed(() => this._createuserresponse());

    //Signal for PYME detail interface to register
    private _registerDBPYMEDetails = signal<DBPYMEDetails | null>(null);
    public registerDBPYMEDetails = computed(() => this._registerDBPYMEDetails);

  private _generatepassword = signal<GeneratePassword|null>(null);
  public generatepassword = computed(() => this._generatepassword());

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

  postPYMEMaintenance(name: string, email: string, password: string, username: string, phone_number: string, company_name: string, company_size: number, location: number, status: string, created_by: number): Observable<ResponseCreatePYME> {

    const url: string = `${this.baseURL}/user/maintenance/create-pyme`;

    const body = {
      name,
      email,
      password,
      username,
      phone_number,
      company_name,
      company_size,
      location,
      status,
      created_by
    }

    return this.http.post<ResponseCreatePYME>(url, body)
      .pipe(
        tap(({DBPYMEDetails}) => {
          this._registerDBPYMEDetails.set(DBPYMEDetails);
        }),
        catchError(err => throwError(() => (err.error.msg)))
      )
  }

  generatePassword(): Observable<GeneratePassword> {
    const url: string = `${this.baseURL}/user/generate-password/password`

    return this.http.get<GeneratePassword>(url)
      .pipe(
        catchError(err => throwError(() => (err.error.msg)))
      )
  }

}
