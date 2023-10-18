// Generated by https://quicktype.io

export interface RespViewUser {
  ok?:        boolean;
  msg?:       string;
  lim?:        number;
  countUsers?: number;
  buscar?:     string;
  ViewUser:   ViewUser[];
  user: ViewUser;
  // viewuser: ViewUser;
}

export interface ViewUser {
  ID_USUARIO:         number;
  USUARIO:            string;
  NOMBRE_USUARIO:     string;
  ESTADO:             string;
  ID_ROL:             number;
  ROL:                string;
  ULTIMA_CONEXION:    string;
  CORREO_ELECTRONICO: string;
  // IMAGEN:             string;
  CREADO_POR:         string;
  FECHA_CREACION:     string;
  MODIFICADO_POR:     string;
  FECHA_MODIFICACION: string;
}
