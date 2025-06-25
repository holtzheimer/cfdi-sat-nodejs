export interface ICartaPorte {
  idCcp: string;
  transpInternac: "Sí" | "No";
  entradaSalidaMerc?: "Entrada" | "Salida";
  paisOrigenDestino?: string;
  totalDistRec?: string | number;
  registroISTMO?: "Sí" | "No";
  ubicacionPoloOrigen?: string;
  ubicacionPoloDestino?: string;
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
}
export interface INodeUbicacion {
  ubicacion: INodeUbi;
  domicilio?: INodeUbiDomicilio;
}
interface INodeUbi {
  tipoUbicacion: "Origen" | "Destino";
  rfcRemitenteDestinatario: string;
  fechaHoraSalidaLlegada: string;
  idUbicacion?: string;
  nombreRemitenteDestinatario?: string;
  residenciaFiscal?: string;
  numRegIdTrib?: string | number;
  numEstacion?: string;
  nombreEstacion?: string;
  navegacionTrafico?: string;
  tipoEstacion?: string;
  distanciaRecorrida?: string | number;
}
export interface IObjectNodeUbi {
  TipoUbicacion: "Origen" | "Destino";
  RFCRemitenteDestinatario: string;
  FechaHoraSalidaLlegada: string;
  IDUbicacion?: string;
  NombreRemitenteDestinatario?: string;
  ResidenciaFiscal?: string;
  NumRegIdTrib?: string | number;
  NumEstacion?: string;
  NombreEstacion?: string;
  NavegacionTrafico?: string;
  TipoEstacion?: string;
  DistanciaRecorrida?: string | number;
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
  UuidComercioExt?: string;
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
  numeroGuiaIdentificacion: string | number;
  descripGuiaIdentificacion: string;
  pesoGuiaIdentificacion: string | number;
}
export interface IObjectNodeGuiasIdent {
  "@_NumeroGuiaIdentificacion": string | number;
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
  "@_cantidad": string | number;
  "@_idOrigen": string;
  "@_idDestino": string;
  "@_cvesTransporte"?: string | number;
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
export interface INodeIdenVehicular {
  configVehicular: string;
  pesoBrutoVehicular: string;
  placaVm: string;
  anioModeloVm: string | number;
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
export interface INodeRemolques {
  subTipoRem: string;
  placa: string;
}

export interface INodeTipoFigura {
  tipoFigura: INodeTF;
  partesTransporte?: INodeParteTrans[];
  domicilio?: INodeTFDomicilio;
}
interface INodeTF {
  tipoFigura: string;
  rfcFigura?: string;
  numLicencia?: string;
  nombreFigura: string;
  numRegIdTribFigura?: string;
  residenciaFiscalFigura?: string;
}
interface INodeParteTrans {
  parteTransporte: string;
}
interface INodeTFDomicilio extends INodeUbiDomicilio {}
