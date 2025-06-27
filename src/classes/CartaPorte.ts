import {
  ICartaPorte,
  INodeAutotransporte,
  INodeTipoFigura,
  INodeIdenVehicular,
  INodeMercancia,
  INodeMercancias,
  INodeRemolques,
  INodeSeguros,
  INodeUbicacion,
  IObjectNodeUbiDomicilio,
  IObjectNodeMercancias,
  IObjectNodeMerc,
  IObjectNodeCantTransporta,
  IObjectNodeDocAduanera,
  IObjectNodeGuiasIdent,
  IObjectNodeDetMercancia,
  IObjectNodeAutotransporte,
  IObjectNodeSeguros,
  IObjectNodeTF,
  IObjectTFDomicilio,
  IObjectNodeUbi,
} from "../interfaces/ICartaPorte";
import Utils from "./Utils";
import { mercancia_keys, merc_att_keys, merc_doc_aduanera, merc_guias_ident } from "../utils/mercancia_keys";
import { auto_seguros_keys } from "../utils/autotransporte_keys";
import { tipos_figura_domicilio, tipos_figura_keys } from "../utils/tipos_figura_keys";
import { ubicacion_keys } from "../utils/ubicacion_keys";
import generateCadenaOriginal from "../utils/generateCadenaOriginal";
import ConfigCfdi from "./ConfigCfdi";
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";

abstract class CartaPorte {
  private readonly cfdi: string | object;
  private readonly config_cfdi: ConfigCfdi;
  private attributes: ICartaPorte = {
    idCcp: "",
    transpInternac: "No",
  };
  private node_regimenes_aduaneros: string[] = [];
  private readonly node_ubicaciones: INodeUbicacion[] = [];
  private node_mercancias_attr: INodeMercancias = {
    numTotalMercancias: 0,
    pesoBrutoTotal: 0,
    unidadPeso: "",
  };
  private readonly node_mercancias: INodeMercancia[] = [];
  private node_autotransporte: INodeAutotransporte = {
    numPermisoSct: "",
    permSct: "",
  };
  private node_identificacion_vehicular: INodeIdenVehicular = {
    anioModeloVm: "",
    configVehicular: "",
    pesoBrutoVehicular: "",
    placaVm: "",
  };
  private node_autotransporte_seguros: INodeSeguros = {
    aseguraRespCivil: "",
    polizaRespCivil: "",
  };
  private readonly node_autotransporte_remolques: INodeRemolques[] = [];
  private readonly node_tipo_figura: INodeTipoFigura[] = [];

  constructor(cfdi: string | object, config_cfdi: ConfigCfdi) {
    this.cfdi = cfdi;
    this.config_cfdi = config_cfdi;
  }
  public setAttributes(data: ICartaPorte): void {
    this.attributes = data;
  }
  public createNodeRegimenesAduaneros(data: string[]) {
    this.node_regimenes_aduaneros = data;
  }
  public createNodeUbicacion(data: INodeUbicacion) {
    this.node_ubicaciones.push(data);
  }
  public createNodeMercancias(data: INodeMercancias) {
    this.node_mercancias_attr = data;
  }
  public createNodeMercancia(data: INodeMercancia) {
    this.node_mercancias.push(data);
  }
  public createNodeTipoFigura(data: INodeTipoFigura) {
    this.node_tipo_figura.push(data);
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
  //public async createXmlSellado() {}
  private generateJson() {
    let json = this.cfdi as any;
    if (typeof this.cfdi === "string") {
      json = Utils.xmlToJson(this.cfdi);
    }
    json["cfdi:Comprobante"][
      "@_xsi:schemaLocation"
    ] = `${json["cfdi:Comprobante"]["@_xsi:schemaLocation"]} http://www.sat.gob.mx/CartaPorte31 http://www.sat.gob.mx/sitio_internet/cfd/CartaPorte/CartaPorte31.xsd`;
    json["cfdi:Comprobante"]["@_xmlns:cartaporte31"] = "http://www.sat.gob.mx/CartaPorte31";
    const nodeCartaPorteAttrs = this.generateAttribute();

    if (this.node_regimenes_aduaneros.length > 0) {
      nodeCartaPorteAttrs["cartaporte31:RegimenesAduaneros"] = this.generateNodeRegimenesAduaneros();
    }
    if (this.node_ubicaciones.length > 0) {
      nodeCartaPorteAttrs["cartaporte31:Ubicaciones"] = this.generateNodeUbicaciones();
    }
    nodeCartaPorteAttrs["cartaporte31:Mercancias"] = this.generateNodeMercancias();
    nodeCartaPorteAttrs["cartaporte31:FiguraTransporte"] = this.generateNodeFiguraTranporte();
    const node_carta_porte = {
      "cartaporte31:CartaPorte": nodeCartaPorteAttrs,
    };
    if (!json["cfdi:Comprobante"]["cfdi:Complemento"]) {
      json["cfdi:Comprobante"]["cfdi:Complemento"] = node_carta_porte;
    } else {
      Object.assign(json["cfdi:Comprobante"]["cfdi:Complemento"], node_carta_porte);
    }
    return json;
  }
  private simplifyJson(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.simplifyJson(item));
    } else if (typeof obj === "object" && obj !== null) {
      const simplified: any = {};
      for (const key in obj) {
        let newKey = key;
        if (newKey.startsWith("@_")) newKey = newKey.slice(2);
        if (newKey.includes(":")) newKey = newKey.split(":")[1];
        simplified[newKey] = this.simplifyJson(obj[key]);
      }
      return simplified;
    }
    return obj;
  }
  private generateAttribute() {
    const att: any = {
      "@_IdCCP": this.attributes.idCcp,
      "@_TranspInternac": this.attributes.transpInternac,
      "@_Version": 3.1,
    };
    if ("entradaSalidaMerc" in this.attributes) {
      att["@_EntradaSalidaMerc"] = this.attributes.entradaSalidaMerc;
    }
    if ("paisOrigenDestino" in this.attributes) {
      att["@_PaisOrigenDestino"] = this.attributes.paisOrigenDestino;
    }
    if ("totalDistRec" in this.attributes) {
      att["@_TotalDistRec"] = this.attributes.totalDistRec;
    }
    if ("registroISTMO" in this.attributes) {
      att["@_RegistroISTMO"] = this.attributes.registroISTMO;
    }
    if ("ubicacionPoloOrigen" in this.attributes) {
      att["@_UbicacionPoloOrigen"] = this.attributes.ubicacionPoloOrigen;
    }
    if ("ubicacionPoloDestino" in this.attributes) {
      att["@_UbicacionPoloDestino"] = this.attributes.ubicacionPoloDestino;
    }
    if ("viaEntradaSalida" in this.attributes) {
      att["@_ViaEntradaSalida"] = this.attributes.viaEntradaSalida;
    }
    return att;
  }
  private generateNodeRegimenesAduaneros() {
    return {
      "cartaporte31:RegimenAduaneroCCP": this.node_regimenes_aduaneros.map((r) => ({
        "@_RegimenAduanero": r,
      })),
    };
  }
  private generateNodeUbicaciones() {
    return {
      "cartaporte31:Ubicacion": this.node_ubicaciones.map((r) => {
        const node = {} as Partial<IObjectNodeUbi>;
        for (const uk of ubicacion_keys) {
          if (r.ubicacion[uk.entrada]) {
            node[uk.salida] = r.ubicacion[uk.entrada] as any;
          }
        }
        if ("domicilio" in r) {
          const node_dom = {} as Partial<IObjectNodeUbiDomicilio>;
          for (const ud of tipos_figura_domicilio) {
            if (r.domicilio![ud.entrada]) {
              node_dom[ud.salida] = r.domicilio![ud.entrada] as any;
            }
          }
          node["cartaporte31:Domicilio"] = node_dom as IObjectNodeUbiDomicilio;
        }
        return node;
      }),
    };
  }
  private generateNodeMercancias() {
    const att = {} as Partial<IObjectNodeMercancias>;
    for (const mak of merc_att_keys) {
      if (this.node_mercancias_attr[mak.entrada]) {
        att[mak.salida] = this.node_mercancias_attr[mak.entrada] as any;
      }
    }
    att["cartaporte31:Mercancia"] = this.node_mercancias.map((i) => {
      const node = {} as Partial<IObjectNodeMerc>;
      for (const mk of mercancia_keys) {
        if (i.mercancia[mk.entrada]) {
          node[mk.salida] = i.mercancia[mk.entrada] as any;
        }
      }
      if ("documentacionAduanera" in i && i.documentacionAduanera!.length > 0) {
        node["cartaporte31:DocumentacionAduanera"] = i.documentacionAduanera!.map((da) => {
          const da_node = {} as Partial<IObjectNodeDocAduanera>;
          for (const mda of merc_doc_aduanera) {
            if (da[mda.entrada]) {
              da_node[mda.salida] = da[mda.entrada] as any;
            }
          }
          return da_node as IObjectNodeDocAduanera;
        });
      }
      if ("guiasIdentificacion" in i && i.guiasIdentificacion!.length > 0) {
        node["cartaporte31:GuiasIdentificacion"] = i.guiasIdentificacion!.map((gi) => {
          const gi_node = {} as Partial<IObjectNodeGuiasIdent>;
          for (const mgi of merc_guias_ident) {
            if (gi[mgi.entrada]) {
              gi_node[mgi.salida] = gi[mgi.entrada] as any;
            }
          }
          return gi_node as IObjectNodeGuiasIdent;
        });
      }
      if ("cantidadTransporta" in i && i.cantidadTransporta!.length > 0) {
        node["cartaporte31:CantidadTransporta"] = i.cantidadTransporta!.map((ct) => {
          const ct_node: IObjectNodeCantTransporta = {
            "@_Cantidad": ct.cantidad,
            "@_IDOrigen": ct.idOrigen,
            "@_IDDestino": ct.idDestino,
          };
          if ("cvesTransporte" in ct) {
            ct_node["@_CvesTransporte"] = ct.cvesTransporte;
          }
          return ct_node;
        });
      }
      if ("detalleMercancia" in i) {
        const att: IObjectNodeDetMercancia = {
          "@_PesoBruto": i.detalleMercancia!.pesoBruto,
          "@_PesoNeto": i.detalleMercancia!.pesoNeto,
          "@_PesoTara": i.detalleMercancia!.pesoTara,
          "@_UnidadPesoMerc": i.detalleMercancia!.unidadPesoMerc,
        };
        if ("numPiezas" in i.detalleMercancia!) {
          att["@_NumPiezas"] = i.detalleMercancia.numPiezas;
        }
        node["cartaporte31:DetalleMercancia"] = att;
      }
      return node as IObjectNodeMerc;
    });
    if (this.node_autotransporte.permSct !== "" && this.node_autotransporte.numPermisoSct !== "") {
      att["cartaporte31:Autotransporte"] = this.generateNodeAutotransporte();
    }
    return att as IObjectNodeMercancias;
  }
  private generateNodeAutotransporte(): IObjectNodeAutotransporte {
    const node_att_seguros = {} as Partial<IObjectNodeSeguros>;
    for (const ask of auto_seguros_keys) {
      if (this.node_autotransporte_seguros[ask.entrada]) {
        node_att_seguros[ask.salida] = this.node_autotransporte_seguros[ask.entrada] as any;
      }
    }
    const node: IObjectNodeAutotransporte = {
      "@_PermSCT": this.node_autotransporte.permSct,
      "@_NumPermisoSCT": this.node_autotransporte.numPermisoSct,
      "cartaporte31:IdentificacionVehicular": {
        "@_AnioModeloVM": this.node_identificacion_vehicular.anioModeloVm,
        "@_ConfigVehicular": this.node_identificacion_vehicular.configVehicular,
        "@_PesoBrutoVehicular": this.node_identificacion_vehicular.pesoBrutoVehicular.toString(),
        "@_PlacaVM": this.node_identificacion_vehicular.placaVm,
      },
      "cartaporte31:Seguros": node_att_seguros as IObjectNodeSeguros,
    };
    if (this.node_autotransporte_remolques.length > 0) {
      node["cartaporte31:Remolques"] = {
        "cartaporte31:Remolque": this.node_autotransporte_remolques.map((r) => ({
          "@_SubTipoRem": r.subTipoRem,
          "@_Placa": r.placa,
        })),
      };
    }
    return node;
  }
  private generateNodeFiguraTranporte() {
    const node: { "cartaporte31:TiposFigura": IObjectNodeTF[] } = {
      "cartaporte31:TiposFigura": this.node_tipo_figura.map((tf) => {
        const node_att = {} as Partial<IObjectNodeTF>;
        for (const tfk of tipos_figura_keys) {
          if (tf.tipoFigura[tfk.entrada]) {
            node_att[tfk.salida] = tf.tipoFigura[tfk.entrada] as any;
          }
        }
        if ("domicilio" in tf) {
          const node_att_dom = {} as Partial<IObjectTFDomicilio>;
          for (const tfd of tipos_figura_domicilio) {
            if (tf.domicilio![tfd.entrada]) {
              node_att_dom[tfd.salida] = tf.domicilio![tfd.entrada] as any;
            }
          }
          node_att["cartaporte31:Domicilio"] = node_att_dom as IObjectTFDomicilio;
        }
        if ("partesTransporte" in tf) {
          node_att["cartaporte31:PartesTransporte"] = tf.partesTransporte!.map((pt) => ({
            "@_ParteTransporte": pt.parteTransporte,
          }));
        }
        return node_att as IObjectNodeTF;
      }),
    };
    return node;
  }
  protected setNodeAutotransporteData(data: INodeAutotransporte) {
    this.node_autotransporte = data;
  }
  protected setNodeAutotransporteIdenVehicular(data: INodeIdenVehicular) {
    this.node_identificacion_vehicular = data;
  }
  protected setNodeAutotransporteSeguros(data: INodeSeguros) {
    this.node_autotransporte_seguros = data;
  }
  protected setNodeAutotransporteRemolques(data: INodeRemolques) {
    this.node_autotransporte_remolques.push(data);
  }
}
export default CartaPorte;
