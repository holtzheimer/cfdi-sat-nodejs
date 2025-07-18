export const errors_fecha = [
  {
    code: "CFDI40101",
    message: "El campo fecha no cumple con el patrón requerido. Debe seguir el formato YYYY-MM-DDTHH:mm:ss",
  },
  {
    code: "CSN401010",
    message: 'No existe la propiedad "fecha" en el método createNodeComprobante.',
  },
  {
    code: "CSN401011",
    message: 'El tipo de la propiedad "fecha" no es valido. Debe ser de tipo string.',
  },
  {
    code: "CSN401012",
    message: "La fecha ingresada es superior a la fecha y hora actual.",
  },
  {
    code: "CSN401013",
    message: "La fecha no pertenece al mes vigente.",
  },
];
export const errors_tipo_comprobante = [
  {
    code: "CSN401210",
    message: 'El tipo de la propiedad "tipoDeComprobante" no es valido. Debe ser de tipo string.',
  },
  {
    code: "CFDI40121",
    message: "El campo tipoDeComprobante, no contiene un valor del catálogo c_TipoDeComprobante.",
  },
];
