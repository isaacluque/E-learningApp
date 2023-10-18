import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { User, UserIDResponse } from '../interfaces/details-user';
import { RespViewUser } from '../../users/interfaces/view-users.interface';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private readonly baseURL: string = environment.baseURL;

  private http = inject(HttpClient);

  // user: User = {
  //   ID_USUARIO:         0,
  //   USUARIO:            "",
  //   NOMBRE_USUARIO:     "",
  //   ESTADO:             "",
  //   CONTRASENA:         "",
  //   ID_ROL:             0,
  //   ROL:                "",
  //   ULTIMA_CONEXION:    new Date(),
  //   CORREO_ELECTRONICO: "",
  //   CREADO_POR:         "",
  //   FECHA_CREACION:     new Date(),
  //   MODIFICADO_POR:     "",
  //   FECHA_MODIFICACION: new Date(),
  // }

  getUser(id_user: number): Observable<UserIDResponse> {
    const url: string = `${this.baseURL}/user/${id_user}`;

    return this.http.get<UserIDResponse>(url)
      .pipe(
        catchError(err => throwError(() => (err.error.msg)))
      )
  }

}
