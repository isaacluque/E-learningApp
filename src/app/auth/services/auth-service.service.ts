import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus } from '../interfaces/auth-status-enum';
import { User } from '../interfaces/user-login.interface';
import { Student } from '../interfaces/pyme-student-login.interface';
import { StudentPYMEResponse } from '../interfaces/auth-response-studen-and-pyme.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly baseURL: string = environment.baseURL;

  private http = inject(HttpClient);

  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public authStatus = computed(() => this._authStatus());

  //Administrator
  private _authResponseUser = signal<User|null>(null);
  public authResponseUser = computed(() => this._authResponseUser());

  //Student
  private _authResponseStudent = signal<Student|null>(null);
  public authResponseStudent = computed(() => this._authResponseStudent);

  //PYME
  private _authResponsePYME = signal<Student|null>(null);
  public authResponsePYME = computed(() => this._authResponsePYME);

  login(email: string, password: string): Observable<boolean> {

    const url: string = `${this.baseURL}/auth/login-admin`;

    const body = {email, password};
    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap( ({User, token}) => {

          this._authResponseUser.set(User);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token);
      }),
      map( resp => resp.ok ),
      catchError( err => throwError( () => (err.error.msg) ))
    )
  }

  loginStudent(email: string, password: string): Observable<boolean> {

    const url: string = `${this.baseURL}/auth/login-student`;

    const body = {email, password};
    return this.http.post<StudentPYMEResponse>(url, body)
    .pipe(
      tap( ({Student, token}) => {

          this._authResponseStudent.set(Student);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token);
      }),
      map( resp => resp.ok ),
      catchError( err => throwError( () => (err.error.msg) ))
    )
  }

  loginPYME(email: string, password: string, username: string): Observable<boolean> {

    const url: string = `${this.baseURL}/auth/login-pyme`;

    const body = {email, password, username};
    return this.http.post<StudentPYMEResponse>(url, body)
    .pipe(
      tap( ({Student, token}) => {

          this._authResponseStudent.set(Student);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token);
      }),
      map( resp => resp.ok ),
      catchError( err => throwError( () => (err.error.msg) ))
    )
  }

  constructor() { }
}
