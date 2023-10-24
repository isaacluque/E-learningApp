// Generated by https://quicktype.io

export interface RoleResponse {
  ok:   boolean;
  Role: Role[];
}

export interface Role {
  ID_ROL:             number;
  ROL:                string;
  DESCRIPCION:        string;
  CREADO_POR:         number;
  MODIFICADO_POR:     number;
  ESTADO:             boolean;
  FECHA_CREACION:     string;
  FECHA_MODIFICACION: string;
}