import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { Role, RoleResponse } from '../interfaces/role';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly baseURL: string = environment.baseURL;

  private http = inject(HttpClient);

  private _roleresponse = signal<Role|null>(null);

  public roleresponse = computed(() => this._roleresponse());

  getUsers(): Observable<RoleResponse> {

    const url: string = `${this.baseURL}/role`;

    return this.http.get<RoleResponse>(url)
      .pipe(
        catchError(err => throwError(() => (err.error.msg)))
      )

  }

}
