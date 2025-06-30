import { INodeAereo, IObjectNodeAereo } from "../interfaces/ICartaPorte";

export const aereo_keys: { entrada: keyof INodeAereo; salida: keyof IObjectNodeAereo }[] = [
  { entrada: "permSct", salida: "@_PermSCT" },
  { entrada: "numPermisoSct", salida: "@_NumPermisoSCT" },
  { entrada: "codigoTransportista", salida: "@_CodigoTransportista" },
  { entrada: "numeroGuia", salida: "@_NumeroGuia" },
  { entrada: "rfcEmbarcador", salida: "@_RFCEmbarcador" },
  { entrada: "lugarContrato", salida: "@_LugarContrato" },
  { entrada: "matriculaAeronave", salida: "@_MatriculaAeronave" },
  { entrada: "nombreAseg", salida: "@_NombreAseg" },
  { entrada: "nombreEmbarcador", salida: "@_NombreEmbarcador" },
  { entrada: "numPolizaSeguro", salida: "@_NumPolizaSeguro" },
  { entrada: "numRegIdTribEmbarc", salida: "@_NumRegIdTribEmbarc" },
  { entrada: "residenciaFiscalEmbarc", salida: "@_ResidenciaFiscalEmbarc" },
];
