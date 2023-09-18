import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus } from '../interfaces/auth-status-enum';
import { User } from '../interfaces/user-login.interface';
import { Student } from '../interfaces/pyme-student-login.interface';
import { StudentPYMEResponse } from '../interfaces/auth-response-studen-and-pyme.interface';
import { CheckTokenAdmin } from '../interfaces/check-token-admin.response';
import { CheckTokenStudent } from '../interfaces/check-token-student.response';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() {
    this.revalidateTokenAdmin().subscribe(),
    this.revalidateTokenStudent().subscribe()
   }

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

  private setAuthenticated(User: User, token: string): boolean {
    this._authResponseUser.set(User);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;
  }
  private setAuthenticatedStudent(Student: Student, token: string): boolean {
    this._authResponseStudent.set(Student);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;
  }

  login(email: string, password: string): Observable<boolean> {

    const url: string = `${this.baseURL}/auth/login-admin`;

    const body = {email, password};
    return this.http.post<AuthResponse>(url, body)
    .pipe(
      map( ({User, token}) => this.setAuthenticated(User, token)),
      catchError( err => throwError( () => (err.error.msg) ))
    )
  }

  revalidateTokenAdmin(): Observable<boolean> {
    const url: string = `${this.baseURL}/auth/revalidateAdminToken`;
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

  loginStudent(email: string, password: string): Observable<boolean> {

    const url: string = `${this.baseURL}/auth/login-student`;

    const body = {email, password};
    return this.http.post<StudentPYMEResponse>(url, body)
    .pipe(
      map( ({Student, token}) => this.setAuthenticatedStudent(Student, token)),
      catchError( err => throwError( () => (err.error.msg) ))
    )
  }

  revalidateTokenStudent(): Observable<boolean> {
    const url: string = `${this.baseURL}/auth/revalidateAdminToken`;
    const token = localStorage.getItem('token');

    if(!token) {
      this.logout()
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('x-token', `${token}`);

      return this.http.get<CheckTokenStudent>(url, {headers})
        .pipe(
          map( ({Student, token}) => this.setAuthenticatedStudent(Student, token)),
          catchError(() => {
            this._authStatus.set(AuthStatus.noAuthenticated);
            return of(false)
          })
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

  logout() {
    localStorage.removeItem('token');
    this._authResponseUser.set(null);
    this._authResponseStudent.set(null);
    this._authResponsePYME.set(null);
    this._authStatus.set(AuthStatus.noAuthenticated);
  }

}
