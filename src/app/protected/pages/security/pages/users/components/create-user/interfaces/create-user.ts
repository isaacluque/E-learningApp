// Generated by https://quicktype.io

export interface ResponseCreateUser {
  ok:   boolean;
  msg:  string;
  User: User;
}

export interface User {
  ID_USUARIO:         null;
  USUARIO:            string;
  NOMBRE_USUARIO:     string;
  CORREO_ELECTRONICO: string;
  ID_ROL:             string;
  ESTADO_USUARIO:     string;
  AUTOREGISTRADO:     boolean;
  CONTRASENA:         string;
  FECHA_MODIFICACION: string;
  FECHA_CREACION:     string;
}