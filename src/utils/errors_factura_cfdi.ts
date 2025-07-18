export const errors_fecha = [
  {
    code: "CFDI40101",
    message: "El campo fecha no cumple con el patrón requerido. Debe seguir el formato YYYY-MM-DDTHH:mm:ss",
  },
  {
    code: "CSN401010",
    message: 'No existe la propiedad "fecha".',
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
export const errors_serie = [
  {
    code: "CSN400990",
    message: 'No existe la propiedad "serie".',
  },
  {
    code: "CSN400991",
    message: 'El tipo de la propiedad "serie" no es valido. Debe ser de tipo string.',
  },
  {
    code: "CSN400992",
    message: 'La propiedad "serie" no puede estar vacío.',
  },
];
export const errors_folio = [
  {
    code: "CSN400980",
    message: 'No existe la propiedad "folio".',
  },
  {
    code: "CSN400981",
    message: 'El tipo de la propiedad "folio" no es valido. Debe ser de tipo string.',
  },
  {
    code: "CSN400982",
    message: 'La propiedad "folio" no puede estar vacío.',
  },
];
export const errors_forma_pago = [
  {
    code: "CFDI40103",
    message: "Si existe el tipo de comprobante T, N o P, la propiedad formaPago no debe existir.",
  },
  {
    code: "CFDI40104",
    message: "El campo FormaPago no contiene un valor del catálogo c_FormaPago.",
  },
  {
    code: "CSN401040",
    message: 'No existe la propiedad "formaPago".',
  },
  {
    code: "CSN401041",
    message: 'El tipo de la propiedad "formaPago" no es valido. Debe ser de tipo string o number.',
  },
  {
    code: "CSN401042",
    message: 'La propiedad "formaPago" no puede estar vacío.',
  },
];
