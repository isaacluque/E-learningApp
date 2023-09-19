import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user-login.interface';
import { DBPYMEDetails, RegisterPyme } from '../interfaces/register-pyme.interface';
import { RegisterStudent } from '../interfaces/register-student.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  //Get environment variable from URL
  private readonly baseURL: string = environment.baseURL;

  //Injection of HttpClient
  private http = inject(HttpClient);

  //Signal for user interface to register
  private _registerStudent = signal<User | null>(null);

  //Signal for PYME detail interface to register
  private _registerDBPYMEDetails = signal<DBPYMEDetails | null>(null);

  //Computed signals for changes to be made
  public registerStudent = computed(() => this._registerStudent);
  public registerDBPYMEDetails = computed(() => this._registerDBPYMEDetails);

  registerStudentNormal(name: string, email: string, password: string, confirm_password: string, username: string): Observable<RegisterStudent> {

    const url: string = `${this.baseURL}/register/register-student`

    const body = {
      name,
      email,
      password,
      confirm_password,
      username
    };

    return this.http.post<RegisterStudent>(url, body)
      .pipe(
        tap(({ User }) => {
          this._registerStudent.set(User);
        }),
        catchError(err => throwError(() => (err.error.msg)))
      )
  }

  registerPYME(name: string, email: string, password: string, confirm_password: string, username: string, phone_number: string, company_name: string, company_size: number, location: number): Observable<RegisterPyme> {

    const url: string = `${this.baseURL}/register/register-pyme`;

    const body = {
      name,
      email,
      password,
      confirm_password,
      username,
      phone_number,
      company_name,
      company_size,
      location
    }

    return this.http.post<RegisterPyme>(url, body)
      .pipe(
        tap(({DBPYMEDetails}) => {
          this._registerDBPYMEDetails.set(DBPYMEDetails);
        }),
        catchError(err => throwError(() => (err.error.msg)))
      )
  }

  constructor() { }
}
