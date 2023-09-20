// Generated by https://quicktype.io

import { User } from "./user-login.interface";

export interface RegisterPyme {
  User:          User;
  DBPYMEDetails: DBPYMEDetails;
  ok:            boolean;
  msg:           string;
}

export interface DBPYMEDetails {
  ID_DETALLE_PYME:   null;
  ID_USUARIO:        number;
  TELEFONO:          string;
  NOMBRE_EMPRESA:    string;
  ID_TAMANO_EMPRESA: number;
  ID_UBICACION:      number;
}
