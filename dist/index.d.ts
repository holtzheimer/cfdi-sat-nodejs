interface IConfigCfdi {
    cert_path: string;
    key_path: string;
    password: string;
}
interface ICert {
    noCertificado: string;
    pem: string;
    validity: {
        notBefore: string;
        notAfter: string;
    };
    issuer: string;
    subject: string;
    version: number;
}

declare class ConfigCfdi {
    private readonly password;
    private cert;
    private key_pem;
    constructor(options: IConfigCfdi);
    private readCert;
    private readKey;
    getCert(): ICert;
    getKeyPem(): string;
}

interface INodeComprobante {
    serie: string;
    folio: string;
    fecha: string;
    subtotal: string | number;
    formaPago?: string | number;
    total: string | number;
    metodoPago?: "PUE" | "PPD";
    lugarExpedicion: string | number;
    tipoDeComprobante?: "I" | "E" | "T" | "P";
    moneda?: string;
    exportacion?: string;
    condicionesDePago?: string;
    descuento?: string | number;
    tipoCambio?: string;
}
interface INodeInformacionGlobal {
    exist: boolean;
    periodicidad: "01" | "02" | "03" | "04" | "05";
    meses: "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18";
    anio: string | number;
}
interface INodeRelacionados {
    tipoRelacion: "01" | "02" | "03" | "04" | "05" | "06" | "07";
    uuids: string[];
}
interface INodeEmisor {
    rfc: string;
    nombre: string;
    regimenFiscal: string | number;
    facAtrAdquirente?: string;
}
interface INodeReceptor {
    rfc: string;
    nombre: string;
    domicilioFiscal: string | number;
    regimenFiscal: string | number;
    usoCfdi: string;
    residenciaFiscal?: string;
    numRegIdTrib?: string | number;
}
interface INodeConcepto {
    concepto: INodeConc;
    impuestos?: INodeImp;
    aCuentaTerceros?: INodeACuentaTerceros;
    informacionAduanera?: INodeInformacionAduanera[];
    cuentaPredial?: {
        numero: string | number;
    }[];
    complementoConcepto?: INodeComplementoConcepto[];
    parte?: INodeParte[];
}
interface INodeConc {
    claveProdServ: string | number;
    cantidad: string | number;
    claveUnidad: string;
    descripcion: string;
    valorUnitario: string | number;
    importe: string;
    unidad?: string;
    objetoImp?: "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08";
    noIdentificacion?: string;
    descuento?: string;
}
interface INodeImp {
    traslados?: INodeTraslado[];
    retenciones?: INodeRetencion[];
}
interface INodeTraslado {
    base: string | number;
    impuesto: "001" | "002" | "003";
    tipoFactor: "Tasa" | "Cuota" | "Exento";
    tasaOCuota?: string | number;
    importe?: string | number;
}
interface INodeRetencion extends INodeTraslado {
}
interface INodeACuentaTerceros {
    rfcACuentaTerceros: string;
    nombreACuentaTerceros: string;
    regimenFiscalACuentaTerceros: string | number;
    domicilioFiscalACuentaTerceros: string | number;
}
interface INodeInformacionAduanera {
    numeroPedimento: string;
}
interface INodeComplementoConcepto {
    node: string;
    attributes: Record<string, string>;
}
interface INodeParte {
    concepto: INodeConcParte;
    informacionAduanera?: INodeInformacionAduanera[];
}
interface INodeConcParte extends Omit<INodeConc, "claveUnidad" | "objetoImp" | "descuento" | "valorUnitario" | "importe" | "unidad"> {
    valorUnitario?: string;
    importe?: string;
    unidad?: string;
}
interface INodeAddenda {
    nodeBase: string;
    attributes: Record<string, string>;
    content?: string;
    nodes?: {
        nodeName: string;
        content?: string | number;
        nodes?: INodeObjectAddenda[];
    }[];
}
interface INodeObjectAddenda {
    nodeName: string;
    content: string | number;
}

declare class Utils {
    static xmlToJson(xml: string): any;
    static jsonToXml(json: any): string;
    static generateUuid(): string;
    static sanitizeText(text: string): string;
    static dateCurrent(): string;
    static generateIdCcp(): string;
    protected simplifyJson(obj: any): any;
}

declare class FacturaCfdi extends Utils {
    private readonly config_cfdi;
    private node_comprobante;
    private node_informacion_global;
    private readonly node_relacionados;
    private node_emisor;
    private node_receptor;
    private readonly node_conceptos;
    private node_addendas;
    constructor(config_cfdi: ConfigCfdi);
    createNodeComprobante(options: INodeComprobante): void;
    createNodeInformacionGlobal(options: INodeInformacionGlobal): void;
    createNodeRelacionados(options: INodeRelacionados): void;
    createNodeEmisor(options: INodeEmisor): void;
    createNodeReceptor(options: INodeReceptor): void;
    createNodeConcepto(options: INodeConcepto): void;
    createNodeAddenda(options: INodeAddenda): void;
    createXml(): string;
    createJson(simplified?: boolean): any;
    createXmlSellado(): Promise<string>;
    createJsonSellado(simplified?: boolean): Promise<any>;
    private generateXml;
    private generateNodeComprobante;
    private generateNodeEmisor;
    private generateNodeReceptor;
    private generateNodeConcepto;
    private generateNodeTraslado;
    private generateNodeRetencion;
    private generateNodeACuentaTerceros;
    private generateNodeParte;
    private createNodeImpuestos;
}

declare class CatalogoSat {
    private catPath;
    constructor(name: string);
    private searchCatalogo;
    search(key: string, value: string | number): Promise<any>;
}

interface ICartaPorte {
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
interface INodeUbicacion {
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
    navegacionTrafico?: "Altura" | "Cabotaje";
    tipoEstacion?: string;
    distanciaRecorrida?: string | number;
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
interface INodeMercancias {
    pesoBrutoTotal: string | number;
    unidadPeso: string;
    numTotalMercancias: string | number;
    logisticaInversaRecoleccionDevolucion?: string;
    pesoNetoTotal?: string | number;
    cargoPorTasacion?: string;
}
interface INodeMercancia {
    mercancia: INodeMerc;
    documentacionAduanera?: INodeDocAduanera[];
    guiasIdentificacion?: INodeGuiasIdent[];
    cantidadTransporta?: INodeCantTransporta[];
    detalleMercancia?: INodeDetMercancia;
}
interface INodeMerc {
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
interface INodeDocAduanera {
    tipoDocumento: string;
    numPedimento?: string;
    identDocAduanero?: string;
    rfcImpo?: string;
}
interface INodeGuiasIdent {
    numeroGuiaIdentificacion: string;
    descripGuiaIdentificacion: string;
    pesoGuiaIdentificacion: string | number;
}
interface INodeCantTransporta {
    cantidad: string | number;
    idOrigen: string;
    idDestino: string;
    cvesTransporte?: string | number;
}
interface INodeDetMercancia {
    unidadPesoMerc: string;
    pesoBruto: string | number;
    pesoNeto: string | number;
    pesoTara: string | number;
    numPiezas?: string | number;
}
interface INodeTransporte {
    permSct: string;
    numPermisoSct: string;
}
interface INodeMaritimo extends INodeTransporte {
    tipoEmbarcacion: string;
    matricula: string;
    numeroOmi: string;
    nacionalidadEmbarc: string;
    unidadesDeArqBruto: string;
    tipoCarga: string;
    nombreAgenteNaviero: string;
    numAutorizacionNaviero: string;
    numViaje?: string;
    numConocEmbarc?: string;
    permisoTempNavegacion?: string;
    anioEmbarcacion?: string | number;
    nombreEmbarc?: string;
    eslora?: string | number;
    manga?: string | number;
    calado?: string | number;
    puntal?: string | number;
    lineaNaviera?: string;
    nombreAseg?: string;
    numPolizaSeguro?: string;
}
interface INodeAereo extends INodeTransporte {
    matriculaAeronave?: string;
    nombreAseg?: string;
    numPolizaSeguro?: string;
    numeroGuia: string;
    lugarContrato?: string;
    codigoTransportista: string;
    rfcEmbarcador?: string;
    numRegIdTribEmbarc?: string;
    residenciaFiscalEmbarc?: string;
    nombreEmbarcador?: string;
}
interface INodeFerroviario {
    tipoDeServicio: string;
    tipoDeTrafico: string;
    nombreAseg?: string;
    numPolizaSeguro?: string | number;
}
interface INodeDerechosDePaso {
    tipoDerechoDePaso: string;
    kilometrajePagado: string | number;
}
interface INodeCarro {
    carro: INodeCarroF;
    contenedores?: INodeContenedorCarro[];
}
interface INodeCarroF {
    tipoCarro: string;
    matriculaCarro: string;
    guiaCarro: string;
    toneladasNetasCarro: string | number;
}
interface INodeContenedorCarro {
    tipoContenedor: string;
    pesoContenedorVacio: string | number;
    pesoNetoMercancia: string | number;
}
interface INodeContenedorM {
    contenedor: INodeContenedor;
    remolques?: INodeRemolqueM[];
}
interface INodeContenedor {
    tipoContenedor: string;
    matriculaContenedor?: string;
    numPrecinto?: string;
    idCcpRelacionado?: string;
    placaVmCcp?: string;
    fechaCertificacionCcp?: string;
}
interface INodeRemolqueM {
    subTipoRemCcp: string;
    placaCcp: string;
}
interface INodeIdenVehicular {
    configVehicular: string;
    pesoBrutoVehicular: string | number;
    placaVm: string;
    anioModeloVm: string | number;
}
interface INodeSeguros {
    aseguraRespCivil: string;
    polizaRespCivil: string;
    aseguraMedAmbiente?: string;
    polizaMedAmbiente?: string;
    aseguraCarga?: string;
    polizaCarga?: string;
    primaSeguro?: string;
}
interface INodeRemolques {
    subTipoRem: string;
    placa: string;
}
interface INodeTipoFigura {
    tipoFigura: INodeTF;
    partesTransporte?: INodeParteTrans[];
    domicilio?: INodeTFDomicilio;
}
interface INodeTF {
    nombreFigura: string;
    tipoFigura: string;
    rfcFigura?: string;
    numLicencia?: string;
    numRegIdTribFigura?: string;
    residenciaFiscalFigura?: string;
}
interface INodeParteTrans {
    parteTransporte: string;
}
interface INodeTFDomicilio extends INodeUbiDomicilio {
}

declare abstract class CartaPorte extends Utils {
    private readonly cfdi;
    private readonly config_cfdi;
    private readonly type_cp;
    private attributes;
    private node_regimenes_aduaneros;
    private readonly node_ubicaciones;
    private node_mercancias_attr;
    private readonly node_mercancias;
    private node_transporte;
    private node_identificacion_vehicular;
    private node_autotransporte_seguros;
    private readonly node_autotransporte_remolques;
    private node_transporte_maritimo;
    private readonly node_contenedores_maritimos;
    private node_transporte_aereo;
    private node_transporte_ferroviario;
    private readonly node_derechos_de_paso;
    private readonly node_carro;
    private readonly node_tipo_figura;
    constructor(cfdi: string | object, config_cfdi: ConfigCfdi, type: "A" | "M" | "F" | "AV");
    setAttributes(data: ICartaPorte): void;
    createNodeRegimenesAduaneros(data: string[]): void;
    createNodeUbicacion(data: INodeUbicacion): void;
    createNodeMercancias(data: INodeMercancias): void;
    createNodeMercancia(data: INodeMercancia): void;
    createNodeTipoFigura(data: INodeTipoFigura): void;
    createXmlSellado(): Promise<string>;
    createJsonSellado(simplified?: boolean): Promise<any>;
    private generateJson;
    private generateAttribute;
    private generateNodeRegimenesAduaneros;
    private generateNodeUbicaciones;
    private generateNodeMercancias;
    private generateNodeAutotransporte;
    private generateNodeMaritimo;
    private generateNodeContenedor;
    private generateNodeAereo;
    private generateNodeFerroviario;
    private generateNodeFiguraTranporte;
    protected setNodeTransporteData(data: INodeTransporte): void;
    protected setNodeTransporteMaritimo(data: INodeMaritimo): void;
    protected setNodeAutotransporteIdenVehicular(data: INodeIdenVehicular): void;
    protected setNodeAutotransporteSeguros(data: INodeSeguros): void;
    protected setNodeAutotransporteRemolques(data: INodeRemolques): void;
    protected setNodeContenedorMaritimo(data: INodeContenedorM): void;
    protected setNodeTransporteAereo(data: INodeAereo): void;
    protected setNodeTransporteFerroviario(data: INodeFerroviario): void;
    protected setNodeDerechoDePasoFerr(data: INodeDerechosDePaso): void;
    protected setNodeCarroFerroviario(data: INodeCarro): void;
}

declare class CartaPorteAutotransporte extends CartaPorte {
    constructor(cfdi: string | object, config_cfdi: ConfigCfdi);
    createNodeAutotransporte(data: INodeTransporte): void;
    createNodeIdentificacionVehicular(data: INodeIdenVehicular): void;
    createNodeSeguros(data: INodeSeguros): void;
    createNodeRemolques(data: INodeRemolques): void;
}

declare class CartaPorteMaritimo extends CartaPorte {
    constructor(cfdi: string | object, config_cfdi: ConfigCfdi);
    createNodeMaritimo(data: INodeMaritimo): void;
    createNodeContenedor(data: INodeContenedorM): void;
}

declare class CartaPorteAereo extends CartaPorte {
    constructor(cfdi: string | object, config_cfdi: ConfigCfdi);
    createNodeAereo(data: INodeAereo): void;
}

declare class CartaPorteFerroviario extends CartaPorte {
    constructor(cfdi: string | object, config_cfdi: ConfigCfdi);
    createNodeFerroviario(data: INodeFerroviario): void;
    createNodeDerechoDePaso(data: INodeDerechosDePaso): void;
    createNodeCarro(data: INodeCarro): void;
}

interface INodeTotales {
    montoTotalPagos: string | number;
    totalRetencionesIva?: string | number;
    totalRetencionesIsr?: string | number;
    totalRetencionesIeps?: string | number;
    totalTrasladosBaseIva16?: string | number;
    totalTrasladosImpuestoIva16?: string | number;
    totalTrasladosBaseIva8?: string | number;
    totalTrasladosImpuestoIva8?: string | number;
    totalTrasladosBaseIva0?: string | number;
    totalTrasladosImpuestoIva0?: string | number;
    totalTrasladosBaseIvaExento?: string | number;
}
interface INodePago {
    pago: IPago;
    doctoRelacionados: IDocRelacionado[];
}
interface IPago {
    fechaPago: string;
    formaDePagoP: string;
    monedaP: string;
    monto: string | number;
    tipoCambioP?: string | number;
    numOperacion?: string;
    rfcEmisorCtaOrd?: string;
    nomBancoOrdExt?: string;
    ctaOrdenante?: string;
    rfcEmisorCtaBen?: string;
    ctaBeneficiario?: string;
    tipoCadPago?: string;
    certPago?: string;
    cadPago?: string;
    selloPago?: string;
}
interface IDocRelacionado {
    doctoRelacionado: IDocRela;
    impuestos: {
        retenciones?: IDocRelRetenciones[];
        traslados?: IDocRelTraslado[];
    };
}
interface IDocRela {
    idDocumento: string;
    monedaDr: string;
    numParcialidad: string | number;
    impSaldoAnt: string | number;
    impPagado: string | number;
    impSaldoInsoluto: string | number;
    objetoImpDr: string;
    serie?: string;
    folio?: string;
    equivalenciaDr?: string | number;
}
interface IDocRelRetenciones {
    baseDr: string | number;
    impuestoDr: string;
    tipoFactorDr: string;
    tasaOCuotaDr: string | number;
    importeDr: string | number;
}
interface IDocRelTraslado extends Omit<IDocRelRetenciones, "tasaOCuotaDr" | "importeDr"> {
    tasaOCuotaDr?: string | number;
    importeDr?: string | number;
}

declare class Pago extends Utils {
    private readonly cfdi;
    private readonly config_cfdi;
    private totales;
    private readonly pagos;
    private readonly retenciones;
    private traslados;
    constructor(cfdi: string | Record<string, string>, config_cfdi: ConfigCfdi);
    createNodeTotales(data: INodeTotales): void;
    createNodePago(data: INodePago): void;
    createJsonSellado(simplified?: boolean): Promise<any>;
    createXmlSellado(): Promise<string>;
    private generateJson;
    private generateAttribute;
    private generateNodeTotales;
    private generateNodePago;
    private generateDoctoRelacionado;
    private generateNodeImpuestos;
}

export { CartaPorteAereo, CartaPorteAutotransporte, CartaPorteFerroviario, CartaPorteMaritimo, CatalogoSat, ConfigCfdi, FacturaCfdi, Pago, Utils };
