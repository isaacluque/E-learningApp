export interface Student {
  ID_ESTUDIANTE:             number;
  ID_TIPO_ESTUDIANTE:        number;
  CREADO_POR_USUARIO:        number;
  MODIFICADO_POR_ESTUDIANTE: number;
  MODIFICADO_POR_USUARIO:    number;
  ID_ROL:                    number;
  CORREO_ELECTRONICO:        string;
  CONTRASENA:                string;
  ESTADO:                    string;
  IMAGEN:                    null;
  INTENTOS:                  number;
  FECHA_CREACION:            string;
  FECHA_MODIFICACION:        string;
}
