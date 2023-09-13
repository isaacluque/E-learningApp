import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { DBStudent, DBStudentDetails, NormalStudent } from '../interfaces/normal-student.interface';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { DBPYMEDetails, PYMEStudent } from '../interfaces/pyme-student.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  private readonly baseURL: string = environment.baseURL;

  private http = inject(HttpClient);

  private _registerDBStudent = signal<DBStudent | null>(null);

  private _registerDBStudentDetails = signal<DBStudentDetails | null>(null);

  private _registerDBPYMEDetails = signal<DBPYMEDetails | null>(null);

  public registerDBStudent = computed(() => this._registerDBStudent);

  public registerDBStudentDetails = computed(() => this._registerDBStudentDetails);

  public registerDBPYMEDetails = computed(() => this._registerDBPYMEDetails);

  postStudentNormal(email: string, password: string, confirm_password: string, username: string, first_name: string, last_name: string): Observable<NormalStudent> {

    const url: string = `${this.baseURL}/register/student_normal`

    const body = {
      email,
      password,
      confirm_password,
      username,
      first_name,
      last_name
    };

    return this.http.post<NormalStudent>(url, body)
      .pipe(
        tap(({ DBStudent, DBStudentDetails }) => {
          this._registerDBStudent.set(DBStudent);
          this._registerDBStudentDetails.set(DBStudentDetails);
        }),
        catchError(err => throwError(() => (err.error.msg)))
      )
  }

  postStudentPYME(email: string, password: string, confirm_password: string, username: string, phone_number: string, company_name: string, company_size: number, location: number): Observable<PYMEStudent> {

    const url: string = `${this.baseURL}/register/student_pyme`;

    const body = {
      email,
      password,
      confirm_password,
      username,
      phone_number,
      company_name,
      company_size,
      location
    }

    return this.http.post<PYMEStudent>(url, body)
      .pipe(
        tap(({DBStudent, DBPYMEDetails}) => {
          this._registerDBStudent.set(DBStudent);
          this._registerDBPYMEDetails.set(DBPYMEDetails);
        }),
        catchError(err => throwError(() => (err.error.msg)))
      )
  }



  constructor() { }
}
