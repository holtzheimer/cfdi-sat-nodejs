import { INodeTF, INodeTFDomicilio, IObjectNodeTF, IObjectTFDomicilio } from "../interfaces/ICartaPorte";

export const tipos_figura_keys: { entrada: keyof INodeTF; salida: keyof IObjectNodeTF }[] = [
  { entrada: "nombreFigura", salida: "@_NombreFigura" },
  { entrada: "rfcFigura", salida: "@_RFCFigura" },
  { entrada: "tipoFigura", salida: "@_TipoFigura" },
  { entrada: "numLicencia", salida: "@_NumLicencia" },
  { entrada: "numRegIdTribFigura", salida: "@_NumRegIdTribFigura" },
  { entrada: "residenciaFiscalFigura", salida: "@_ResidenciaFiscalFigura" },
];
export const tipos_figura_domicilio: { entrada: keyof INodeTFDomicilio; salida: keyof IObjectTFDomicilio }[] = [
  { entrada: "codigoPostal", salida: "@_CodigoPostal" },
  { entrada: "estado", salida: "@_Estado" },
  { entrada: "pais", salida: "@_Pais" },
  { entrada: "calle", salida: "@_Calle" },
  { entrada: "numeroInterior", salida: "@_NumeroInterior" },
  { entrada: "numeroExterior", salida: "@_NumeroExterior" },
  { entrada: "colonia", salida: "@_Colonia" },
  { entrada: "localidad", salida: "@_Localidad" },
  { entrada: "municipio", salida: "@_Municipio" },
  { entrada: "referencia", salida: "@_Referencia" },
];
