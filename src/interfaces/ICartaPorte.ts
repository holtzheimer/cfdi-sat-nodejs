export interface ICartaPorte {
  idCcp: string;
  transpInternac: "Sí" | "No";
  entradaSalidaMerc?: "Entrada" | "Salida";
  paisOrigenDestino?: string;
  totalDistRec?: string | number;
  registroISTMO?: "Sí" | "No";
  ubicacionPoloOrigen?: string;
  ubicacionPoloDestino?: string;
  viaEntradaSalida?: string;
}
export interface IObjectCartaPorte {
  "@_IdCCP": string;
  "@_TranspInternac": "Sí" | "No";
  "@_Version": number;
  "@_EntradaSalidaMerc"?: "Entrada" | "Salida";
  "@_PaisOrigenDestino"?: string;
  "@_TotalDistRec"?: string | number;
  "@_RegistroISTMO"?: "Sí" | "No";
  "@_UbicacionPoloOrigen"?: string;
  "@_UbicacionPoloDestino"?: string;
  "@_ViaEntradaSalida"?: string;
}
export interface INodeUbicacion {
  ubicacion: INodeUbi;
  domicilio?: INodeUbiDomicilio;
}
export interface INodeUbi {
  tipoUbicacion: "Origen" | "Destino";
  rfcRemitenteDestinatario: string;
  fechaHoraSalidaLlegada: string;
  idUbicacion?: string;
  nombreRemitenteDestinatario?: string;
  residenciaFiscal?: string;
  numRegIdTrib?: string | number;
  numEstacion?: string;
  nombreEstacion?: string;
  navegacionTrafico?: "Altura" | "Cabotaje";
  tipoEstacion?: string;
  distanciaRecorrida?: string | number;
}
export interface IObjectNodeUbi {
  "@_TipoUbicacion": "Origen" | "Destino";
  "@_RFCRemitenteDestinatario": string;
  "@_FechaHoraSalidaLlegada": string;
  "@_IDUbicacion"?: string;
  "@_NombreRemitenteDestinatario"?: string;
  "@_ResidenciaFiscal"?: string;
  "@_NumRegIdTrib"?: string | number;
  "@_NumEstacion"?: string;
  "@_NombreEstacion"?: string;
  "@_NavegacionTrafico"?: "Altura" | "Cabotaje";
  "@_TipoEstacion"?: string;
  "@_DistanciaRecorrida"?: string | number;
  "cartaporte31:Domicilio"?: IObjectNodeUbiDomicilio;
}
interface INodeUbiDomicilio {
  estado: string;
  pais: string;
  codigoPostal: string | number;
  calle?: string;
  numeroExterior?: string | number;
  numeroInterior?: string | number;
  colonia?: string;
  localidad?: string;
  referencia?: string;
  municipio?: string;
}
export interface IObjectNodeUbiDomicilio {
  "@_Estado": string;
  "@_Pais": string;
  "@_CodigoPostal": string | number;
  "@_Calle"?: string;
  "@_NumeroExterior"?: string | number;
  "@_NumeroInterior"?: string | number;
  "@_Colonia"?: string;
  "@_Localidad"?: string;
  "@_Referencia"?: string;
  "@_Municipio"?: string;
}
export interface INodeMercancias {
  pesoBrutoTotal: string | number;
  unidadPeso: string;
  numTotalMercancias: string | number;
  logisticaInversaRecoleccionDevolucion?: string;
  pesoNetoTotal?: string | number;
  cargoPorTasacion?: string;
}
export interface IObjectNodeMercancias {
  "@_PesoBrutoTotal": string | number;
  "@_UnidadPeso": string;
  "@_NumTotalMercancias": string | number;
  "@_LogisticaInversaRecoleccionDevolucion"?: string;
  "@_PesoNetoTotal"?: string | number;
  "@_CargoPorTasacion"?: string;
  "cartaporte31:Mercancia": IObjectNodeMerc[];
  "cartaporte31:Autotransporte"?: IObjectNodeAutotransporte;
}
export interface INodeMercancia {
  mercancia: INodeMerc;
  documentacionAduanera?: INodeDocAduanera[];
  guiasIdentificacion?: INodeGuiasIdent[];
  cantidadTransporta?: INodeCantTransporta[];
  detalleMercancia?: INodeDetMercancia;
}
export interface INodeMerc {
  bienesTransp: string;
  descripcion: string;
  cantidad: string;
  claveUnidad: string;
  pesoEnKg: string | number;
  claveStcc?: string;
  unidad?: string;
  dimensiones?: string;
  materialPeligroso?: "Sí" | "No";
  cveMaterialPeligroso?: string | number;
  embalaje?: string;
  descripEmbalaje?: string;
  sectorCofepris?: string;
  nombreIngredienteActivo?: string;
  nomQuimico?: string;
  denominacionGenericaProd?: string;
  denominacionDistintivaProd?: string;
  fabricante?: string;
  fechaCaducidad?: string;
  loteMedicamento?: string;
  formaFarmaceutica?: string;
  condicionesEspTransp?: string;
  registroSanitarioFolioAutorizacion?: string;
  permisoImportacion?: string;
  folioImpoVucem?: string;
  numCas?: string;
  razonSocialEmpImp?: string;
  numRegSanPlagCofepris?: string;
  datosFabricante?: string;
  datosFormulador?: string;
  datosMaquilador?: string;
  usoAutorizado?: string;
  valorMercancia?: string;
  moneda?: string;
  fraccionArancelaria?: string;
  uuidComercioExt?: string;
  tipoMateria?: string;
  descripcionMateria?: string;
}
export interface IObjectNodeMerc {
  "@_BienesTransp": string;
  "@_Descripcion": string;
  "@_Cantidad": string;
  "@_ClaveUnidad": string;
  "@_PesoEnKg": string | number;
  "@_ClaveSTCC"?: string;
  "@_Unidad"?: string;
  "@_Dimensiones"?: string;
  "@_MaterialPeligroso"?: "Sí" | "No";
  "@_CveMaterialPeligroso"?: string | number;
  "@_Embalaje"?: string;
  "@_DescripEmbalaje"?: string;
  "@_SectorCOFEPRIS"?: string;
  "@_NombreIngredienteActivo"?: string;
  "@_NomQuimico"?: string;
  "@_DenominacionGenericaProd"?: string;
  "@_DenominacionDistintivaProd"?: string;
  "@_Fabricante"?: string;
  "@_FechaCaducidad"?: string;
  "@_LoteMedicamento"?: string;
  "@_FormaFarmaceutica"?: string;
  "@_CondicionesEspTransp"?: string;
  "@_RegistroSanitarioFolioAutorizacion"?: string;
  "@_PermisoImportacion"?: string;
  "@_FolioImpoVUCEM"?: string;
  "@_NumCAS"?: string;
  "@_RazonSocialEmpImp"?: string;
  "@_NumRegSanPlagCOFEPRIS"?: string;
  "@_DatosFabricante"?: string;
  "@_DatosFormulador"?: string;
  "@_DatosMaquilador"?: string;
  "@_UsoAutorizado"?: string;
  "@_ValorMercancia"?: string;
  "@_Moneda"?: string;
  "@_FraccionArancelaria"?: string;
  "@_UUIDComercioExt"?: string;
  "@_TipoMateria"?: string;
  "@_DescripcionMateria"?: string;
  "cartaporte31:CantidadTransporta"?: IObjectNodeCantTransporta[];
  "cartaporte31:DocumentacionAduanera": IObjectNodeDocAduanera[];
  "cartaporte31:GuiasIdentificacion": IObjectNodeGuiasIdent[];
  "cartaporte31:DetalleMercancia": IObjectNodeDetMercancia;
}
export interface INodeDocAduanera {
  tipoDocumento: string;
  numPedimento?: string;
  identDocAduanero?: string;
  rfcImpo?: string;
}
export interface IObjectNodeDocAduanera {
  "@_TipoDocumento": string;
  "@_NumPedimento"?: string;
  "@_IdentDocAduanero"?: string;
  "@_RFCImpo"?: string;
}
export interface INodeGuiasIdent {
  numeroGuiaIdentificacion: string;
  descripGuiaIdentificacion: string;
  pesoGuiaIdentificacion: string | number;
}
export interface IObjectNodeGuiasIdent {
  "@_NumeroGuiaIdentificacion": string;
  "@_DescripGuiaIdentificacion": string;
  "@_PesoGuiaIdentificacion": string | number;
}
export interface INodeCantTransporta {
  cantidad: string | number;
  idOrigen: string;
  idDestino: string;
  cvesTransporte?: string | number;
}
export interface IObjectNodeCantTransporta {
  "@_Cantidad": string | number;
  "@_IDOrigen": string;
  "@_IDDestino": string;
  "@_CvesTransporte"?: string | number;
}
export interface INodeDetMercancia {
  unidadPesoMerc: string;
  pesoBruto: string | number;
  pesoNeto: string | number;
  pesoTara: string | number;
  numPiezas?: string | number;
}
export interface IObjectNodeDetMercancia {
  "@_UnidadPesoMerc": string;
  "@_PesoBruto": string | number;
  "@_PesoNeto": string | number;
  "@_PesoTara": string | number;
  "@_NumPiezas"?: string | number;
}
export interface INodeAutotransporte {
  permSct: string;
  numPermisoSct: string;
}
export interface IObjectNodeAutotransporte {
  "@_PermSCT": string;
  "@_NumPermisoSCT": string;
  "cartaporte31:IdentificacionVehicular": IObjectNodeIdenVehicular;
  "cartaporte31:Seguros": IObjectNodeSeguros;
  "cartaporte31:Remolques"?: { "cartaporte31:Remolque": IObjectNodeRemolques[] };
}
export interface INodeIdenVehicular {
  configVehicular: string;
  pesoBrutoVehicular: string | number;
  placaVm: string;
  anioModeloVm: string | number;
}
export interface IObjectNodeIdenVehicular {
  "@_ConfigVehicular": string;
  "@_PesoBrutoVehicular": string | number;
  "@_PlacaVM": string;
  "@_AnioModeloVM": string | number;
}
export interface INodeSeguros {
  aseguraRespCivil: string;
  polizaRespCivil: string;
  aseguraMedAmbiente?: string;
  polizaMedAmbiente?: string;
  aseguraCarga?: string;
  polizaCarga?: string;
  primaSeguro?: string;
}
export interface IObjectNodeSeguros {
  "@_AseguraRespCivil": string;
  "@_PolizaRespCivil": string;
  "@_AseguraMedAmbiente"?: string;
  "@_PolizaMedAmbiente"?: string;
  "@_AseguraCarga"?: string;
  "@_PolizaCarga"?: string;
  "@_PrimaSeguro"?: string;
}
export interface INodeRemolques {
  subTipoRem: string;
  placa: string;
}
export interface IObjectNodeRemolques {
  "@_SubTipoRem": string;
  "@_Placa": string;
}

export interface INodeTipoFigura {
  tipoFigura: INodeTF;
  partesTransporte?: INodeParteTrans[];
  domicilio?: INodeTFDomicilio;
}
export interface INodeTF {
  nombreFigura: string;
  tipoFigura: string;
  rfcFigura?: string;
  numLicencia?: string;
  numRegIdTribFigura?: string;
  residenciaFiscalFigura?: string;
}
export interface IObjectNodeTF {
  "@_TipoFigura": string;
  "@_RFCFigura"?: string;
  "@_NumLicencia"?: string;
  "@_NombreFigura": string;
  "@_NumRegIdTribFigura"?: string;
  "@_ResidenciaFiscalFigura"?: string;
  "cartaporte31:Domicilio": IObjectTFDomicilio;
  "cartaporte31:PartesTransporte": IObjectNodeParteTrans[];
}
export interface INodeParteTrans {
  parteTransporte: string;
}
export interface IObjectNodeParteTrans {
  "@_ParteTransporte": string;
}
export interface INodeTFDomicilio extends INodeUbiDomicilio {}
export interface IObjectTFDomicilio extends IObjectNodeUbiDomicilio {}
