import { INodeContenedor, INodeMaritimo, IObjectNodeContenedor, IObjectNodeMaritimo } from "../interfaces/ICartaPorte";

export const maritimo_keys: { entrada: keyof INodeMaritimo; salida: keyof IObjectNodeMaritimo }[] = [
  { entrada: "permSct", salida: "@_PermSCT" },
  { entrada: "numPermisoSct", salida: "@_NumPermisoSCT" },
  { entrada: "tipoEmbarcacion", salida: "@_TipoEmbarcacion" },
  { entrada: "matricula", salida: "@_Matricula" },
  { entrada: "numeroOmi", salida: "@_NumeroOMI" },
  { entrada: "nacionalidadEmbarc", salida: "@_NacionalidadEmbarc" },
  { entrada: "unidadesDeArqBruto", salida: "@_UnidadesDeArqBruto" },
  { entrada: "tipoCarga", salida: "@_TipoCarga" },
  { entrada: "nombreAgenteNaviero", salida: "@_NombreAgenteNaviero" },
  { entrada: "numAutorizacionNaviero", salida: "@_NumAutorizacionNaviero" },
  { entrada: "numViaje", salida: "@_NumViaje" },
  { entrada: "numConocEmbarc", salida: "@_NumConocEmbarc" },
  { entrada: "permisoTempNavegacion", salida: "@_PermisoTempNavegacion" },
  { entrada: "anioEmbarcacion", salida: "@_AnioEmbarcacion" },
  { entrada: "nombreEmbarc", salida: "@_NombreEmbarc" },
  { entrada: "eslora", salida: "@_Eslora" },
  { entrada: "manga", salida: "@_Manga" },
  { entrada: "calado", salida: "@_Calado" },
  { entrada: "puntal", salida: "@_Puntal" },
  { entrada: "lineaNaviera", salida: "@_LineaNaviera" },
  { entrada: "nombreAseg", salida: "@_NombreAseg" },
  { entrada: "numPolizaSeguro", salida: "@_NumPolizaSeguro" },
];
export const contenedor_keys: { entrada: keyof INodeContenedor; salida: keyof IObjectNodeContenedor }[] = [
  { entrada: "tipoContenedor", salida: "@_TipoContenedor" },
  { entrada: "matriculaContenedor", salida: "@_MatriculaContenedor" },
  { entrada: "fechaCertificacionCcp", salida: "@_FechaCertificacionCCP" },
  { entrada: "idCcpRelacionado", salida: "@_IdCCPRelacionado" },
  { entrada: "numPrecinto", salida: "@_NumPrecinto" },
  { entrada: "placaVmCcp", salida: "@_PlacaVMCCP" },
];
