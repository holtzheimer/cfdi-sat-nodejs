import { INodeUbi, IObjectNodeUbi } from "../interfaces/ICartaPorte";

export const ubicacion_keys: { entrada: keyof INodeUbi; salida: keyof IObjectNodeUbi }[] = [
  { entrada: "tipoUbicacion", salida: "@_TipoUbicacion" },
  { entrada: "rfcRemitenteDestinatario", salida: "@_RFCRemitenteDestinatario" },
  { entrada: "idUbicacion", salida: "@_IDUbicacion" },
  { entrada: "fechaHoraSalidaLlegada", salida: "@_FechaHoraSalidaLlegada" },
  { entrada: "distanciaRecorrida", salida: "@_DistanciaRecorrida" },
  { entrada: "navegacionTrafico", salida: "@_NavegacionTrafico" },
  { entrada: "nombreEstacion", salida: "@_NombreEstacion" },
  { entrada: "nombreRemitenteDestinatario", salida: "@_NombreRemitenteDestinatario" },
  { entrada: "numEstacion", salida: "@_NumEstacion" },
  { entrada: "numRegIdTrib", salida: "@_NumRegIdTrib" },
  { entrada: "residenciaFiscal", salida: "@_ResidenciaFiscal" },
  { entrada: "tipoEstacion", salida: "@_TipoEstacion" },
];
