import { INodeFerroviario, IObjectNodeFerroviario } from "../interfaces/ICartaPorte";

export const ferroviario_keys: { entrada: keyof INodeFerroviario; salida: keyof IObjectNodeFerroviario }[] = [
  { entrada: "tipoDeServicio", salida: "@_TipoDeServicio" },
  { entrada: "tipoDeTrafico", salida: "@_TipoDeTrafico" },
  { entrada: "nombreAseg", salida: "@_NombreAseg" },
  { entrada: "numPolizaSeguro", salida: "@_NumPolizaSeguro" },
];
