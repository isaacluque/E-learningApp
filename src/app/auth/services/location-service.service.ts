import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { Locations } from '../interfaces/locations.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  private readonly baseURL: string = environment.baseURL;

  private http = inject(HttpClient);

  getLocations(): Observable<Locations> {
    const url: string = `${this.baseURL}/location`;

    return this.http.get<Locations>(url)
      .pipe(
        catchError(err => throwError(() => (err.error.msg)))
      )
  }

  constructor() { }
}
