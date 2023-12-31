// Generated by https://quicktype.io

export interface Locations {
  locations: Location[];
}

export interface Location {
  ID_UBICACION:   number;
  ISO2:           string;
  NOMBRE_CORTO:   string;
  NOMBRE_LARGO:   string;
  ISO3:           string;
  NUMCODE:        string;
  CODIGO_LLAMADA: null | string;
  CCTID:          string;
  UN_MEMBER:      UnMember;
}

export enum UnMember {
  Former = "former",
  No = "no",
  Some = "some",
  Yes = "yes",
}
