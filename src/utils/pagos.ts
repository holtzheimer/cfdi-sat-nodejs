import { IDocRela, INodeTotales, IObjectNodeDocRela, IObjectNodePago, IObjectNodeTotales, IPago } from "../interfaces/IPagos";

export const totales_keys: { entrada: keyof INodeTotales; salida: keyof IObjectNodeTotales }[] = [
  { entrada: "montoTotalPagos", salida: "@_MontoTotalPagos" },
  { entrada: "totalRetencionesIeps", salida: "@_TotalRetencionesIEPS" },
  { entrada: "totalRetencionesIsr", salida: "@_TotalRetencionesISR" },
  { entrada: "totalRetencionesIva", salida: "@_TotalRetencionesIVA" },
  { entrada: "totalTrasladosBaseIva0", salida: "@_TotalTrasladosBaseIVA0" },
  { entrada: "totalTrasladosImpuestoIva0", salida: "@_TotalTrasladosImpuestoIVA0" },
  { entrada: "totalTrasladosBaseIva16", salida: "@_TotalTrasladosBaseIVA16" },
  { entrada: "totalTrasladosBaseIva8", salida: "@_TotalTrasladosBaseIVA8" },
  { entrada: "totalTrasladosBaseIvaExento", salida: "@_TotalTrasladosBaseIVAExento" },
  { entrada: "totalTrasladosImpuestoIva16", salida: "@_TotalTrasladosImpuestoIVA16" },
  { entrada: "totalTrasladosImpuestoIva8", salida: "@_TotalTrasladosImpuestoIVA8" },
];
export const pagos_keys: { entrada: keyof IPago; salida: keyof IObjectNodePago }[] = [
  { entrada: "fechaPago", salida: "@_FechaPago" },
  { entrada: "formaDePagoP", salida: "@_FormaDePagoP" },
  { entrada: "monedaP", salida: "@_MonedaP" },
  { entrada: "monto", salida: "@_Monto" },
  { entrada: "tipoCambioP", salida: "@_TipoCambioP" },
  { entrada: "numOperacion", salida: "@_NumOperacion" },
  { entrada: "rfcEmisorCtaOrd", salida: "@_RFCEmisorCtaOrd" },
  { entrada: "nomBancoOrdExt", salida: "@_NomBancoOrdExt" },
  { entrada: "ctaOrdenante", salida: "@_CtaOrdenante" },
  { entrada: "rfcEmisorCtaBen", salida: "@_RFCEmisorCtaBen" },
  { entrada: "ctaBeneficiario", salida: "@_CtaBeneficiario" },
  { entrada: "ctaBeneficiario", salida: "@_CtaBeneficiario" },
  { entrada: "certPago", salida: "@_CertPago" },
  { entrada: "cadPago", salida: "@_CadPago" },
  { entrada: "selloPago", salida: "@_SelloPago" },
];
export const doc_relacionado_keys: { entrada: keyof IDocRela; salida: keyof IObjectNodeDocRela }[] = [
  { entrada: "idDocumento", salida: "@_IdDocumento" },
  { entrada: "monedaDr", salida: "@_MonedaDR" },
  { entrada: "numParcialidad", salida: "@_NumParcialidad" },
  { entrada: "impSaldoAnt", salida: "@_ImpSaldoAnt" },
  { entrada: "impPagado", salida: "@_ImpPagado" },
  { entrada: "impSaldoInsoluto", salida: "@_ImpSaldoInsoluto" },
  { entrada: "objetoImpDr", salida: "@_ObjetoImpDR" },
  { entrada: "serie", salida: "@_Serie" },
  { entrada: "folio", salida: "@_Folio" },
  { entrada: "equivalenciaDr", salida: "@_EquivalenciaDR" },
];
