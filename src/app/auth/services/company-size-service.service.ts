import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { Observable, catchError, throwError } from 'rxjs';
import { CompanySize } from '../interfaces/company-size.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanySizeServiceService {

  private readonly baseURL: string = environment.baseURL;

  private http = inject(HttpClient);

  getCompanySizes(): Observable<CompanySize> {
    const url: string = `${this.baseURL}/location`;

    return this.http.get<CompanySize>(url)
      .pipe(
        catchError(err => throwError(() => (err.error.msg)))
      )
  }

  constructor() { }
}
