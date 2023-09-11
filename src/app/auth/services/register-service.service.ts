import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { DBStudent, DBStudentDetails, NormalStudent } from '../interfaces/normal-student.interface';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  private readonly baseURL: string = environment.baseURL;

  private http = inject(HttpClient);

  private _registerDBStudent = signal<DBStudent|null>(null);

  private _registerDBStudentDetails = signal<DBStudentDetails|null>(null);

  public registerDBStudent = computed(() => this._registerDBStudent);

  public registerDBStudentDetails = computed(() => this._registerDBStudentDetails);

  postStudentNormal( email: string, password: string, confirm_password: string, username: string, first_name: string, last_name: string): Observable<NormalStudent>{

    const url: string = `${this.baseURL}/register/student_normal`

    const body = { email,
      password,
      confirm_password,
      username,
      first_name,
      last_name};

      return this.http.post<NormalStudent>(url, body)
      .pipe(
        tap( ({DBStudent, DBStudentDetails, ok, msg}) => {
          this._registerDBStudent.set(DBStudent);
          this._registerDBStudentDetails.set(DBStudentDetails);
        }),
        catchError(err => throwError(() => (err.error.msg)))
        )
  }

  constructor() { }
}
