// Generated by https://quicktype.io

export interface UserIDResponse {
  user: User;
}

export interface User {
  ID_USUARIO:         number;
  USUARIO:            string;
  NOMBRE_USUARIO:     string;
  ESTADO:             string;
  CONTRASENA:         string;
  ID_ROL:             number;
  ROL:                string;
  ULTIMA_CONEXION:    Date;
  CORREO_ELECTRONICO: string;
  CREADO_POR:         string;
  FECHA_CREACION:     Date;
  MODIFICADO_POR:     string;
  FECHA_MODIFICACION: Date;
}

