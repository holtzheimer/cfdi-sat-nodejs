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
} from "../interfaces/ICartaPorte";
import Utils from "./Utils";
import { mercancia_keys, merc_att_keys, merc_doc_aduanera, merc_guias_ident } from "../utils/mercancia_keys";

abstract class CartaPorte {
  private readonly cfdi: string | object;
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
  private node_autotransporte_remolques: INodeRemolques = {
    placa: "",
    subTipoRem: "",
  };
  private readonly node_tipo_figura: INodeTipoFigura[] = [];

  constructor(cfdi: string | object) {
    this.cfdi = cfdi;
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
  public createXml() {
    const json = this.generateXml();
    return Utils.jsonToXml(json);
  }
  public async createXmlSellado() {}
  private generateXml() {
    let json = this.cfdi as any;
    if (typeof this.cfdi === "string") {
      json = Utils.xmlToJson(this.cfdi);
    }
    const nodeCartaPorteAttrs = this.generateAttribute();

    if (this.node_regimenes_aduaneros.length > 0) {
      nodeCartaPorteAttrs["cartaporte31:RegimenesAduaneros"] = this.generateNodeRegimenesAduaneros();
    }
    if (this.node_ubicaciones.length > 0) {
      nodeCartaPorteAttrs["cartaporte31:Ubicaciones"] = this.generateNodeUbicaciones();
    }
    const node_mercancias = this.generateNodeMercancias();
    nodeCartaPorteAttrs["cartaporte31:Mercancias"] = node_mercancias;
    const node_carta_porte = {
      "cartaporte31:CartaPorte": nodeCartaPorteAttrs,
    };
    if (!("cfdi:Complemento" in json)) {
      json["cfdi:Complemento"] = node_carta_porte;
    }
    return json;
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
        let node: any = {
          "@_TipoUbicacion": r.ubicacion.tipoUbicacion,
          "@_RFCRemitenteDestinatario": r.ubicacion.rfcRemitenteDestinatario,
          "@_FechaHoraSalidaLlegada": r.ubicacion.fechaHoraSalidaLlegada,
        };
        if ("idUbicacion" in r.ubicacion) {
          node["@_IDUbicacion"] = r.ubicacion.idUbicacion;
        }
        if ("nombreRemitenteDestinatario" in r.ubicacion) {
          node["@_NombreRemitenteDestinatario"] = r.ubicacion.nombreRemitenteDestinatario;
        }
        if ("residenciaFiscal" in r.ubicacion) {
          node["@_ResidenciaFiscal"] = r.ubicacion.residenciaFiscal;
        }
        if ("numRegIdTrib" in r.ubicacion) {
          node["@_NumRegIdTrib"] = r.ubicacion.numRegIdTrib;
        }
        if ("numEstacion" in r.ubicacion) {
          node["@_NumEstacion"] = r.ubicacion.numEstacion;
        }
        if ("nombreEstacion" in r.ubicacion) {
          node["@_NombreEstacion"] = r.ubicacion.nombreEstacion;
        }
        if ("navegacionTrafico" in r.ubicacion) {
          node["@_NavegacionTrafico"] = r.ubicacion.navegacionTrafico;
        }
        if ("tipoEstacion" in r.ubicacion) {
          node["@_TipoEstacion"] = r.ubicacion.tipoEstacion;
        }
        if ("distanciaRecorrida" in r.ubicacion) {
          node["@_DistanciaRecorrida"] = r.ubicacion.distanciaRecorrida;
        }
        if ("domicilio" in r) {
          const node_dom: IObjectNodeUbiDomicilio = {
            "@_Estado": r.domicilio!.estado,
            "@_Pais": r.domicilio!.pais,
            "@_CodigoPostal": r.domicilio!.codigoPostal,
          };
          if ("calle" in r.domicilio!) {
            node_dom["@_Calle"] = r.domicilio.calle;
          }
          if ("numeroExterior" in r.domicilio!) {
            node_dom["@_NumeroExterior"] = r.domicilio.numeroExterior;
          }
          if ("numeroInterior" in r.domicilio!) {
            node_dom["@_NumeroInterior"] = r.domicilio.numeroInterior;
          }
          if ("colonia" in r.domicilio!) {
            node_dom["@_Colonia"] = r.domicilio.colonia;
          }
          if ("localidad" in r.domicilio!) {
            node_dom["@_Localidad"] = r.domicilio.localidad;
          }
          if ("referencia" in r.domicilio!) {
            node_dom["@_Referencia"] = r.domicilio.referencia;
          }
          if ("municipio" in r.domicilio!) {
            node_dom["@_Municipio"] = r.domicilio.municipio;
          }
          node["cartaporte31:Domicilio"] = node_dom;
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
            "@_cantidad": ct.cantidad,
            "@_idOrigen": ct.idOrigen,
            "@_idDestino": ct.idDestino,
          };
          if ("cvesTransporte" in ct) {
            ct_node["@_cvesTransporte"] = ct.cvesTransporte;
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
    return att as IObjectNodeMercancias;
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
    this.node_autotransporte_remolques = data;
  }
}
export default CartaPorte;
