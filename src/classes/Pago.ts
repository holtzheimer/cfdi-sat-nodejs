import {
  IDocRelacionado,
  IDocRelRetenciones,
  IDocRelTraslado,
  INodePago,
  INodeTotales,
  IObjectDocRelTraslado,
  IObjectNodeDocRela,
  IObjectNodeImp,
  IObjectNodePago,
  IObjectNodePagos,
  IObjectNodeTotales,
} from "../interfaces/IPagos";
import generateCadenaOriginal from "../utils/generateCadenaOriginal";
import { doc_relacionado_keys, pagos_keys, totales_keys } from "../utils/pagos";
import ConfigCfdi from "./ConfigCfdi";
import Utils from "./Utils";

class Pago extends Utils {
  private readonly cfdi: Record<string, string>;
  private readonly config_cfdi: ConfigCfdi;
  private totales: INodeTotales = {
    montoTotalPagos: 0,
  };
  private readonly pagos: INodePago[] = [];
  constructor(cfdi: string | Record<string, string>, config_cfdi: ConfigCfdi) {
    super();
    if (typeof cfdi === "string") {
      this.cfdi = Utils.xmlToJson(cfdi);
    } else {
      this.cfdi = cfdi;
    }
    this.config_cfdi = config_cfdi;
  }
  public createNodeTotales(data: INodeTotales) {
    this.totales = data;
  }
  public createNodePago(data: INodePago) {
    this.pagos.push(data);
  }
  public async createJsonSellado(simplified = false) {
    try {
      const { ["?xml"]: _omit, ...rest } = this.generateJson();
      const sign = await generateCadenaOriginal(rest, this.config_cfdi);
      rest["cfdi:Comprobante"]["@_Sello"] = sign;
      return simplified ? this.simplifyJson(rest) : rest;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  public async createXmlSellado() {
    try {
      const json = this.generateJson();
      const sign = await generateCadenaOriginal(json, this.config_cfdi);
      json["cfdi:Comprobante"]["@_Sello"] = sign;
      return Utils.jsonToXml(json);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  private generateJson(): any {
    let json = this.cfdi as any;
    json["cfdi:Comprobante"][
      "@_xsi:schemaLocation"
    ] = `${json["cfdi:Comprobante"]["@_xsi:schemaLocation"]} http://www.sat.gob.mx/Pagos20 http://www.sat.gob.mx/sitio_internet/cfd/Pagos/Pagos20.xsd`;
    json["cfdi:Comprobante"]["@_xmlns:pago20"] = "http://www.sat.gob.mx/Pagos20";
    const nodePagoAttrs = this.generateAttribute();
    if (!json["cfdi:Comprobante"]["cfdi:Complemento"]) {
      json["cfdi:Comprobante"]["cfdi:Complemento"] = {
        "pago20:Pagos": nodePagoAttrs,
      };
    } else {
      Object.assign(json["cfdi:Comprobante"]["cfdi:Complemento"], {
        "pago20:Pagos": nodePagoAttrs,
      });
    }
    return json;
  }
  private generateAttribute() {
    const att: IObjectNodePagos = {
      "@_Version": "2.0",
      "pago20:Totales": this.generateNodeTotales(),
      "pago20:Pago": this.pagos.map((p) => this.generateNodePago(p)),
    };
    return att;
  }
  private generateNodeTotales(): IObjectNodeTotales {
    const node = {} as Partial<IObjectNodeTotales>;
    for (const tk of totales_keys) {
      if (this.totales[tk.entrada]) {
        node[tk.salida] = tk.entrada === "montoTotalPagos" ? parseFloat(this.totales[tk.entrada].toString()).toFixed(2) : (this.totales[tk.entrada] as any);
      }
    }
    return node as IObjectNodeTotales;
  }
  private generateNodePago(data: INodePago): IObjectNodePago {
    const node = {} as Partial<IObjectNodePago>;
    for (const pk of pagos_keys) {
      if (data.pago[pk.entrada]) {
        node[pk.salida] = pk.entrada === "monto" ? parseFloat(data.pago[pk.entrada].toString()).toFixed(2) : (data.pago[pk.entrada] as any);
      }
    }
    if ("doctoRelacionados" in data) {
      node["pago20:DoctoRelacionado"] = data.doctoRelacionados.map((dr) => this.generateDoctoRelacionado(dr));
    }
    return node as IObjectNodePago;
  }
  private generateDoctoRelacionado(data: IDocRelacionado): IObjectNodeDocRela {
    const node = {} as Partial<IObjectNodeDocRela>;
    for (const drk of doc_relacionado_keys) {
      if (data.doctoRelacionado[drk.entrada] != null) {
        node[drk.salida] =
          drk.entrada !== "equivalenciaDr" && typeof data.doctoRelacionado[drk.entrada] !== "string"
            ? parseFloat(data.doctoRelacionado[drk.entrada]!.toString()).toFixed(2)
            : (data.doctoRelacionado[drk.entrada] as any);
      }
    }
    if ("impuestos" in data) {
      node["pago20:ImpuestosDR"] = this.generateNodeImpuestos(data.impuestos);
    }
    return node as IObjectNodeDocRela;
  }
  private generateNodeImpuestos(data: { retenciones?: IDocRelRetenciones[]; traslados?: IDocRelTraslado[] }) {
    const node = {} as Partial<IObjectNodeImp>;
    if ("retenciones" in data && data.retenciones!.length > 0) {
      node["pago20:RetencionesDR"] = {
        "pago20:RetencionDR": data.retenciones!.map((r) => ({
          "@_BaseDR": r.baseDr,
          "@_ImpuestoDR": r.impuestoDr,
          "@_TipoFactorDR": r.tipoFactorDr,
          "@_TasaOCuotaDR": r.tasaOCuotaDr,
          "@_ImporteDR": r.importeDr,
        })),
      };
    }
    if ("traslados" in data && data.traslados!.length > 0) {
      node["pago20:TrasladosDR"] = {
        "pago20:TrasladoDR": data.traslados!.map((t) => {
          const n_traslado: IObjectDocRelTraslado = {
            "@_BaseDR": parseFloat(t.baseDr.toString()).toFixed(2),
            "@_ImpuestoDR": t.impuestoDr,
            "@_TipoFactorDR": t.tipoFactorDr,
          };
          if ("tasaOCuotaDr" in t) {
            n_traslado["@_TasaOCuotaDR"] = t.tasaOCuotaDr;
          }
          if ("importeDr" in t) {
            n_traslado["@_ImporteDR"] = parseFloat(t.importeDr!.toString()).toFixed(2);
          }
          return n_traslado;
        }),
      };
    }
    return node as IObjectNodeImp;
  }
}
export default Pago;
