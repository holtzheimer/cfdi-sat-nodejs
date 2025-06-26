import { INodeSeguros, IObjectNodeSeguros } from "../interfaces/ICartaPorte";

export const auto_seguros_keys: { entrada: keyof INodeSeguros; salida: keyof IObjectNodeSeguros }[] = [
  { entrada: "aseguraRespCivil", salida: "@_AseguraRespCivil" },
  { entrada: "polizaRespCivil", salida: "@_PolizaRespCivil" },
  { entrada: "aseguraCarga", salida: "@_AseguraCarga" },
  { entrada: "polizaCarga", salida: "@_PolizaCarga" },
  { entrada: "aseguraMedAmbiente", salida: "@_AseguraMedAmbiente" },
  { entrada: "polizaMedAmbiente", salida: "@_PolizaMedAmbiente" },
  { entrada: "primaSeguro", salida: "@_PrimaSeguro" },
];
