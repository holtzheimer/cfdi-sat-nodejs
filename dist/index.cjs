"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CartaPorteAereo: () => CartaPorteAereo_default,
  CartaPorteAutotransporte: () => CartaPorteAutotransporte_default,
  CartaPorteFerroviario: () => CartaPorteFerroviario_default,
  CartaPorteMaritimo: () => CartaPorteMaritimo_default,
  CatalogoSat: () => CatalogoSat_default,
  ConfigCfdi: () => ConfigCfdi_default,
  FacturaCfdi: () => FacturaCfdi_default,
  Pago: () => Pago_default,
  Utils: () => Utils_default
});
module.exports = __toCommonJS(index_exports);

// src/classes/ConfigCfdi.ts
var import_fs = __toESM(require("fs"), 1);
var import_node_forge = __toESM(require("node-forge"), 1);
var import_crypto = __toESM(require("crypto"), 1);
var ConfigCfdi = class {
  constructor(options) {
    this.cert = {
      noCertificado: "",
      pem: "",
      validity: { notAfter: "", notBefore: "" },
      version: 0,
      issuer: "",
      subject: ""
    };
    this.key_pem = "";
    this.password = options.password;
    this.readCert(options.cert_path);
    this.readKey(options.key_path);
  }
  readCert(path3) {
    try {
      const file = import_fs.default.readFileSync(path3);
      const certAsn1 = import_node_forge.default.asn1.fromDer(file.toString("binary"));
      const cert = import_node_forge.default.pki.certificateFromAsn1(certAsn1);
      if (!cert) {
        throw new Error("Certificate not found or invalid format");
      }
      this.cert = {
        noCertificado: cert.serialNumber.match(/.{1,2}/g).map(function(v) {
          return String.fromCharCode(parseInt(v, 16));
        }).join(""),
        pem: import_node_forge.default.pki.certificateToPem(cert),
        validity: {
          notAfter: cert.validity.notAfter.toString(),
          notBefore: cert.validity.notBefore.toString()
        },
        version: cert.version,
        issuer: cert.issuer.attributes.map((attr) => `${attr.shortName ?? attr.name}=${attr.value}`).join(", "),
        subject: cert.subject.attributes.map((attr) => `${attr.shortName ?? attr.name ?? attr.type}=${attr.value}`).join(", ")
      };
    } catch (error) {
      throw new Error(`Error reading certificate: ${error}`);
    }
  }
  readKey(path3) {
    try {
      const file = import_fs.default.readFileSync(path3);
      const pem = import_crypto.default.createPrivateKey({
        key: file,
        format: "der",
        type: "pkcs8",
        passphrase: this.password
      });
      const pemString = pem.export({ format: "pem", type: "pkcs8" });
      this.key_pem = pemString;
    } catch (error) {
      throw new Error(`Error reading key: ${error}`);
    }
  }
  getCert() {
    return this.cert;
  }
  getKeyPem() {
    return this.key_pem;
  }
};
var ConfigCfdi_default = ConfigCfdi;

// src/classes/FacturaCfdi.ts
var import_xmlbuilder2 = require("xmlbuilder2");
var import_xmldom2 = require("@xmldom/xmldom");

// src/utils/resolveInclusions.ts
var import_path = __toESM(require("path"), 1);
var import_fs2 = __toESM(require("fs"), 1);
var import_xpath = __toESM(require("xpath"), 1);
var import_xmldom = require("@xmldom/xmldom");
var import_url = require("url");
var import_meta = {};
var __dname = typeof __dirname !== "undefined" ? __dirname : import_path.default.dirname((0, import_url.fileURLToPath)(import_meta?.url));
var resolveInclusions = async () => {
  try {
    const basePath = import_path.default.resolve(__dname, "resources", "xslt");
    const xsltFile = import_path.default.resolve(basePath, "./cadenaoriginal_4_0.xslt");
    const xsltContent = await import_fs2.default.promises.readFile(xsltFile, "utf8");
    const doc = new import_xmldom.DOMParser().parseFromString(xsltContent, "text/xml");
    const selectNameSpace = import_xpath.default.useNamespaces({
      xsl: "http://www.w3.org/1999/XSL/Transform",
      cfdi: "http://www.sat.gob.mx/cfd/4",
      xs: "http://www.w3.org/2001/XMLSchema",
      fn: "http://www.w3.org/2005/xpath-functions",
      cce11: "http://www.sat.gob.mx/ComercioExterior11",
      donat: "http://www.sat.gob.mx/donat",
      divisas: "http://www.sat.gob.mx/divisas",
      implocal: "http://www.sat.gob.mx/implocal",
      leyendasFisc: "http://www.sat.gob.mx/leyendasFiscales",
      pfic: "http://www.sat.gob.mx/pfic",
      tpe: "http://www.sat.gob.mx/TuristaPasajeroExtranjero",
      nomina12: "http://www.sat.gob.mx/nomina12",
      registrofiscal: "http://www.sat.gob.mx/registrofiscal",
      pagoenespecie: "http://www.sat.gob.mx/pagoenespecie",
      aerolineas: "http://www.sat.gob.mx/aerolineas",
      valesdedespensa: "http://www.sat.gob.mx/valesdedespensa",
      consumodecombustibles: "http://www.sat.gob.mx/consumodecombustibles",
      notariospublicos: "http://www.sat.gob.mx/notariospublicos",
      vehiculousado: "http://www.sat.gob.mx/vehiculousado",
      servicioparcial: "http://www.sat.gob.mx/servicioparcialconstruccion",
      decreto: "http://www.sat.gob.mx/renovacionysustitucionvehiculos",
      destruccion: "http://www.sat.gob.mx/certificadodestruccion",
      obrasarte: "http://www.sat.gob.mx/arteantiguedades",
      ine: "http://www.sat.gob.mx/ine",
      iedu: "http://www.sat.gob.mx/iedu",
      ventavehiculos: "http://www.sat.gob.mx/ventavehiculos",
      terceros: "http://www.sat.gob.mx/terceros",
      pago20: "http://www.sat.gob.mx/Pagos",
      detallista: "http://www.sat.gob.mx/detallista",
      ecc12: "http://www.sat.gob.mx/EstadoDeCuentaCombustible12",
      consumodecombustibles11: "http://www.sat.gob.mx/ConsumoDeCombustibles11",
      gceh: "http://www.sat.gob.mx/GastosHidrocarburos10",
      ieeh: "http://www.sat.gob.mx/IngresosHidrocarburos10",
      cartaporte20: "http://www.sat.gob.mx/CartaPorte20",
      cartaporte30: "http://www.sat.gob.mx/CartaPorte30",
      cartaporte31: "http://www.sat.gob.mx/CartaPorte31"
    });
    const includeNodes = selectNameSpace("//xsl:include", doc);
    if (!includeNodes || includeNodes.length === 0) {
      throw new Error("No include nodes found in the XSLT file.");
    }
    for (const node of includeNodes) {
      const href = node.getAttribute("href");
      if (href) {
        const includePath = import_path.default.resolve(basePath, href);
        const data = await import_fs2.default.promises.readFile(includePath, "utf8");
        const includeDoc = new import_xmldom.DOMParser().parseFromString(data, "application/xml");
        while (includeDoc.documentElement.childNodes.length > 0) {
          const importedNode = includeDoc.documentElement.childNodes[0];
          node.parentNode.insertBefore(importedNode, node);
        }
        node.parentNode.removeChild(node);
      }
    }
    return new import_xmldom.XMLSerializer().serializeToString(doc);
  } catch (error) {
    throw new Error(`Error resolving inclusions: ${error.message}`);
  }
};
var resolveInclusions_default = resolveInclusions;

// src/utils/generateCadenaOriginal.ts
var import_saxon_js = __toESM(require("saxon-js"), 1);
var import_crypto2 = __toESM(require("crypto"), 1);

// src/classes/Utils.ts
var import_fast_xml_parser = require("fast-xml-parser");
var import_uuid = require("uuid");
var Utils = class {
  static xmlToJson(xml) {
    const parser2 = new import_fast_xml_parser.XMLParser({ ignoreAttributes: false });
    return parser2.parse(xml);
  }
  static jsonToXml(json) {
    const builder = new import_fast_xml_parser.XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      format: true,
      suppressEmptyNode: true
    });
    return builder.build(json);
  }
  static generateUuid() {
    return (0, import_uuid.v4)().toLowerCase();
  }
  static sanitizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9\s.,-]/g, "").trim();
  }
  static dateCurrent() {
    return (/* @__PURE__ */ new Date()).toISOString().slice(0, 19);
  }
  static generateIdCcp() {
    const uuid = (0, import_uuid.v4)();
    const partes = uuid.split("-");
    partes[0] = partes[0].slice(0, 5);
    return `CCC${partes.join("-")}`;
  }
  simplifyJson(obj) {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.simplifyJson(item));
    } else if (typeof obj === "object" && obj !== null) {
      const simplified = {};
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
};
var Utils_default = Utils;

// src/utils/generateCadenaOriginal.ts
var generateCadenaOriginal = async (cfdi, config_cfdi) => {
  try {
    const xml = typeof cfdi === "object" ? Utils_default.jsonToXml(cfdi) : cfdi;
    const cadenaOriginalXslt = await resolveInclusions_default();
    let result = import_saxon_js.default.XPath.evaluate(
      `transform(
        map {
          'source-node' : parse-xml($xml),
          'stylesheet-text' : $xslt,
          'delivery-format' : 'serialized'
          }
      )?output`,
      [],
      {
        params: {
          xml,
          xslt: cadenaOriginalXslt
        }
      }
    );
    const sign = import_crypto2.default.createSign("SHA256");
    sign.update(result);
    sign.end();
    const signature = sign.sign(config_cfdi.getKeyPem(), "base64");
    return signature;
  } catch (error) {
    throw new Error(`Error generating Cadena Original: ${error}`);
  }
};
var generateCadenaOriginal_default = generateCadenaOriginal;

// src/classes/Validator.ts
var Validator = class {
  constructor() {
    this.errors = [];
  }
  getErrors() {
    return this.errors;
  }
  setErrors(errors) {
    this.errors = [errors];
  }
  static validateRfc(rfc) {
    const regex = /^([A-ZÑ&]{3,4})-?([0-9]{2})([0-1][0-9])([0-3][0-9])-?([A-Z\d]{3})$/i;
    return regex.test(rfc);
  }
  static validateIdCcp(IdCcp) {
    const regex = /^C{3}[a-f0-9A-F]{5}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12}$/;
    return regex.test(IdCcp);
  }
};
var Validator_default = Validator;

// src/utils/errors_factura_cfdi.ts
var errors_tipo_comprobante = [
  {
    code: "CSN40106",
    message: 'El tipo de la propiedad "tipoDeComprobante" no es valido. Debe ser de tipo string.'
  },
  {
    code: "CSN40107",
    message: "El campo tipoDeComprobante, no contiene un valor del cat\xE1logo c_TipoDeComprobante."
  }
];
var errors_serie = [
  {
    code: "CSN40108",
    message: 'No existe la propiedad "serie".'
  },
  {
    code: "CSN40109",
    message: 'El tipo de la propiedad "serie" no es valido. Debe ser de tipo string.'
  },
  {
    code: "CSN40110",
    message: 'La propiedad "serie" no puede estar vac\xEDo.'
  }
];
var errors_folio = [
  {
    code: "CSN40111",
    message: 'No existe la propiedad "folio".'
  },
  {
    code: "CSN40112",
    message: 'El tipo de la propiedad "folio" no es valido. Debe ser de tipo string.'
  },
  {
    code: "CSN40113",
    message: 'La propiedad "folio" no puede estar vac\xEDo.'
  }
];
var errors_fecha = [
  {
    code: "CSN40114",
    message: "El campo fecha no cumple con el patr\xF3n requerido. Debe seguir el formato YYYY-MM-DDTHH:mm:ss"
  },
  {
    code: "CSN40115",
    message: 'No existe la propiedad "fecha".'
  },
  {
    code: "CSN40116",
    message: 'El tipo de la propiedad "fecha" no es valido. Debe ser de tipo string.'
  },
  {
    code: "CSN40117",
    message: "La fecha ingresada es superior a la fecha y hora actual."
  },
  {
    code: "CSN40118",
    message: "La fecha no pertenece al mes vigente."
  }
];
var errors_forma_pago = [
  {
    code: "CSN40119",
    message: "Si existe el tipo de comprobante T, N o P, la propiedad formaPago no debe existir."
  },
  {
    code: "CSN40120",
    message: "El campo FormaPago no contiene un valor del cat\xE1logo c_FormaPago."
  },
  {
    code: "CSN40121",
    message: 'La propiedad formaPago no contiene el valor "99". Esta propiedad debe contener el valor \u201C99\u201D cuando la propiedad metodoPago contenga el valor \u201CPPD\u201D.'
  },
  {
    code: "CSN40122",
    message: 'No existe la propiedad "formaPago".'
  },
  {
    code: "CSN40123",
    message: 'El tipo de la propiedad "formaPago" no es valido. Debe ser de tipo string o number.'
  },
  {
    code: "CSN40124",
    message: 'La propiedad "formaPago" no puede estar vac\xEDo.'
  }
];
var errors_metodo_pago = [
  {
    code: "CSN40125",
    message: 'No existe la propiedad "metodoPago".'
  },
  {
    code: "CSN40126",
    message: 'El tipo de la propiedad "metodoPago" no es valido. Debe ser de tipo string.'
  },
  {
    code: "CSN40127",
    message: 'La propiedad "metodoPago" no puede estar vac\xEDo.'
  },
  {
    code: "CSN40128",
    message: 'La propiedad "metodoPago", no contiene un valor del cat\xE1logo c_MetodoPago.'
  },
  {
    code: "CSN40129",
    message: 'Si existe el tipo de comprobante P o T, la propiedad "metodoPago" no debe existir.'
  }
];

// src/classes/ValidatorFacturaCfdi.ts
var tiposComprobante = ["I", "E", "P", "T"];
var ValidatorFacturaCfdi = class extends Validator_default {
  constructor(type, data) {
    super();
    this.data = data;
    this.type = null;
    this.type = type;
    this.run();
  }
  run() {
    switch (this.type) {
      case "comprobante":
        this.validateNodeComprobante();
        break;
      default:
        return [];
    }
  }
  validateNodeComprobante() {
    const data = this.data;
    if ("tipoDeComprobante" in data) {
      const err_tipo_comprobante_code = this.validateTipoComprobante(data.tipoDeComprobante);
      if (err_tipo_comprobante_code !== "") {
        return this.setErrors(errors_tipo_comprobante.find((i) => i.code === err_tipo_comprobante_code));
      }
    }
    const err_serie_code = this.validateSerie(data.serie);
    if (err_serie_code !== "") {
      return this.setErrors(errors_serie.find((i) => i.code === err_serie_code));
    }
    const err_folio_code = this.validateFolio(data.folio);
    if (err_folio_code !== "") {
      return this.setErrors(errors_folio.find((i) => i.code === err_folio_code));
    }
    const err_fecha_code = this.validateFecha(data.fecha);
    if (err_fecha_code !== "") {
      return this.setErrors(errors_fecha.find((i) => i.code === err_fecha_code));
    }
    const err_metodo_pago_cod = this.validateMetodoPago(data.metodoPago, data.tipoDeComprobante ?? "I");
    if (err_metodo_pago_cod !== "") {
      return this.setErrors(errors_metodo_pago.find((i) => i.code === err_metodo_pago_cod));
    }
    const err_forma_pago_code = this.validateFormaPago(data.formaPago, data.tipoDeComprobante ?? "I", data.metodoPago);
    if (err_forma_pago_code !== "") {
      return this.setErrors(errors_forma_pago.find((i) => i.code === err_forma_pago_code));
    }
  }
  validateTipoComprobante(tipo_comprobante) {
    if (typeof tipo_comprobante !== "string") {
      return "CSN40106";
    }
    if (!tiposComprobante.includes(tipo_comprobante)) {
      return "CSN40107";
    }
    return "";
  }
  validateSerie(serie) {
    if (serie === void 0) {
      return "CSN40108";
    } else {
      if (typeof serie !== "string") {
        return "CSN40109";
      }
      if (serie.trim() === "") {
        return "CSN40110";
      }
    }
    return "";
  }
  validateFolio(folio) {
    if (folio === void 0) {
      return "CSN40111";
    } else {
      if (typeof folio !== "string") {
        return "CSN40112";
      }
      if (folio.trim() === "") {
        return "CSN40113";
      }
    }
    return "";
  }
  validateFecha(data) {
    if (!data) {
      return "CSN40115";
    } else {
      if (typeof data !== "string") {
        return "CSN40116";
      }
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(data)) {
        return "CSN40114";
      }
      if (new Date(data) > new Date(Utils_default.dateCurrent())) {
        return "CSN40117";
      }
      const date = new Date(data);
      const today = /* @__PURE__ */ new Date();
      if (date.getMonth() !== today.getMonth() || date.getFullYear() !== today.getFullYear()) {
        return "CSN40118";
      }
    }
    return "";
  }
  validateMetodoPago(mp, tipo_comprobante) {
    if (["I", "E", "N"].includes(tipo_comprobante)) {
      if (mp === void 0) return "CSN40125";
      if (!["string"].includes(typeof mp)) return "CSN40126";
      if (mp === "") return "CSN40127";
      if (!["PPD", "PUE"].includes(mp)) return "CSN40128";
    }
    if (["P", "T"].includes(tipo_comprobante) && mp !== void 0) return "CSN40129";
    return "";
  }
  validateFormaPago(data, tipo_comprobante, mp) {
    if (["I", "E"].includes(tipo_comprobante)) {
      if (data === void 0) {
        return "CSN40122";
      }
      if (!["string", "number"].includes(typeof data)) {
        return "CSN40123";
      }
      if (data.toString() === "") {
        return "CSN40124";
      }
      if (data.toString() !== "99" && mp === "PPD") {
        return "CSN40121";
      }
    }
    if (["P", "N", "T"].includes(tipo_comprobante) && data !== void 0) {
      return "CSN40119";
    }
    return "";
  }
};
var ValidatorFacturaCfdi_default = ValidatorFacturaCfdi;

// src/classes/FacturaCfdi.ts
var FacturaCfdi = class extends Utils_default {
  constructor(config_cfdi) {
    super();
    this.node_comprobante = {
      serie: "",
      folio: "",
      fecha: "",
      subtotal: "",
      formaPago: "",
      total: "",
      metodoPago: "PUE",
      lugarExpedicion: ""
    };
    this.node_informacion_global = {
      exist: false,
      periodicidad: "01",
      meses: "01",
      anio: ""
    };
    this.node_relacionados = [];
    this.node_emisor = {
      rfc: "",
      nombre: "",
      regimenFiscal: ""
    };
    this.node_receptor = {
      rfc: "",
      nombre: "",
      usoCfdi: "",
      domicilioFiscal: "",
      regimenFiscal: ""
    };
    this.node_conceptos = [];
    this.node_addendas = {
      nodeBase: "",
      attributes: {}
    };
    this.config_cfdi = config_cfdi;
  }
  createNodeComprobante(options) {
    const errors = new ValidatorFacturaCfdi_default("comprobante", options).getErrors();
    if (errors.length > 0) {
      const err = `Exist an error at createNodeComprobante: ${errors[0].code}: ${errors[0].message}`;
      throw new Error(err);
    }
    this.node_comprobante = options;
  }
  createNodeInformacionGlobal(options) {
    this.node_informacion_global = options;
    this.node_informacion_global.exist = true;
  }
  createNodeRelacionados(options) {
    this.node_relacionados.push(options);
  }
  createNodeEmisor(options) {
    this.node_emisor = options;
  }
  createNodeReceptor(options) {
    this.node_receptor = options;
  }
  createNodeConcepto(options) {
    this.node_conceptos.push(options);
  }
  createNodeAddenda(options) {
    this.node_addendas = options;
  }
  createXml() {
    return this.generateXml();
  }
  createJson(simplified = false) {
    const xml = this.createXml();
    const json = Utils_default.xmlToJson(xml);
    return simplified ? this.simplifyJson(json) : json;
  }
  async createXmlSellado() {
    const xml = this.generateXml();
    return generateCadenaOriginal_default(xml, this.config_cfdi).then((sign) => {
      const parser2 = new import_xmldom2.DOMParser();
      const xmlDoc = parser2.parseFromString(xml, "application/xml");
      const comprobanteElement = xmlDoc.getElementsByTagName("cfdi:Comprobante")[0];
      if (comprobanteElement) {
        comprobanteElement.setAttribute("Sello", sign);
      }
      const serializer = new import_xmldom2.XMLSerializer();
      return serializer.serializeToString(xmlDoc);
    }).catch((err) => {
      throw new Error(err.message);
    });
  }
  async createJsonSellado(simplified = false) {
    const xml = await this.createXmlSellado();
    const json = Utils_default.xmlToJson(xml);
    return simplified ? this.simplifyJson(json) : json;
  }
  generateXml() {
    const doc = (0, import_xmlbuilder2.create)({
      version: "1.0"
    }).ele("cfdi:Comprobante", this.generateNodeComprobante());
    if (this.node_informacion_global.exist) {
      doc.ele("cfdi:InformacionGlobal", {
        Periodicidad: this.node_informacion_global.periodicidad,
        Meses: this.node_informacion_global.meses,
        A\u00F1o: this.node_informacion_global.anio
      });
    }
    if (this.node_relacionados.length > 0) {
      for (const relation of this.node_relacionados) {
        const ele_relacionados = doc.ele("cfdi:CfdiRelacionados", {
          TipoRelacion: relation.tipoRelacion
        });
        for (const uuid of relation.uuids) {
          ele_relacionados.ele("cfdi:CfdiRelacionado", {
            UUID: uuid
          });
        }
      }
    }
    doc.ele("cfdi:Emisor", this.generateNodeEmisor());
    doc.ele("cfdi:Receptor", this.generateNodeReceptor());
    const ele_conceptos = doc.ele("cfdi:Conceptos");
    for (const concepto of this.node_conceptos) {
      const ele_concepto = ele_conceptos.ele("cfdi:Concepto", this.generateNodeConcepto(concepto.concepto));
      if ("impuestos" in concepto && concepto.concepto.objetoImp !== "01") {
        const ele_imp = ele_concepto.ele("cfdi:Impuestos");
        if ("traslados" in concepto.impuestos && concepto.impuestos.traslados.length > 0) {
          const ele_tras = ele_imp.ele("cfdi:Traslados");
          for (const traslado of concepto.impuestos.traslados) {
            ele_tras.ele("cfdi:Traslado", this.generateNodeTraslado(traslado));
          }
        }
        if ("retenciones" in concepto.impuestos && concepto.impuestos.retenciones.length > 0) {
          const ele_ret = ele_imp.ele("cfdi:Retenciones");
          for (const retencion of concepto.impuestos.retenciones) {
            ele_ret.ele("cfdi:Retencion", this.generateNodeRetencion(retencion));
          }
        }
      }
      if ("aCuentaTerceros" in concepto) {
        ele_concepto.ele("cfdi:ACuentaTerceros", this.generateNodeACuentaTerceros(concepto.aCuentaTerceros));
      }
      if ("informacionAduanera" in concepto && concepto.informacionAduanera.length > 0) {
        for (const ia of concepto.informacionAduanera) {
          ele_concepto.ele("cfdi:InformacionAduanera", {
            NumeroPedimento: ia.numeroPedimento
          });
        }
      }
      if ("cuentaPredial" in concepto && concepto.cuentaPredial.length > 0) {
        for (const cp of concepto.cuentaPredial) {
          ele_concepto.ele("cfdi:CuentaPredial", {
            Numero: cp.numero
          });
        }
      }
      if ("complementoConcepto" in concepto && concepto.complementoConcepto.length > 0) {
        const ele_compl_conc = ele_concepto.ele("cfdi:ComplementoConcepto");
        for (const comple of concepto.complementoConcepto) {
          ele_compl_conc.ele(comple.node, comple.attributes);
        }
      }
      if ("parte" in concepto && concepto.parte.length > 0) {
        for (const part of concepto.parte) {
          const ele_parte = ele_concepto.ele("cfdi:Parte", this.generateNodeParte(part.concepto));
          if ("informacionAduanera" in part && part.informacionAduanera.length > 0) {
            for (const ia of part.informacionAduanera) {
              ele_parte.ele("cfdi:InformacionAduanera", {
                NumeroPedimento: ia.numeroPedimento
              });
            }
          }
        }
      }
    }
    const createNodeImpuestos = this.createNodeImpuestos();
    if (createNodeImpuestos.total_impuestos_retenidos.total > 0 || createNodeImpuestos.total_impuestos_trasladados.total > 0) {
      const ele_impuestos = doc.ele("cfdi:Impuestos", {
        TotalImpuestosRetenidos: createNodeImpuestos.total_impuestos_retenidos.total > 0 ? createNodeImpuestos.total_impuestos_retenidos.total.toFixed(2) : void 0,
        TotalImpuestosTrasladados: createNodeImpuestos.total_impuestos_trasladados.total > 0 ? createNodeImpuestos.total_impuestos_trasladados.total.toFixed(2) : void 0
      });
      if (createNodeImpuestos.total_impuestos_retenidos.data.length > 0) {
        const ele_ret = ele_impuestos.ele("cfdi:Retenciones");
        for (const ret of createNodeImpuestos.total_impuestos_retenidos.data) {
          ele_ret.ele("cfdi:Retencion", {
            Importe: ret.importe,
            Impuesto: ret.impuesto
          });
        }
      }
      if (createNodeImpuestos.total_impuestos_trasladados.data.length > 0) {
        const ele_tras = ele_impuestos.ele("cfdi:Traslados");
        for (const tras of createNodeImpuestos.total_impuestos_trasladados.data) {
          ele_tras.ele("cfdi:Traslado", {
            Base: tras.base,
            Impuesto: tras.impuesto,
            TipoFactor: tras.tipoFactor,
            TasaOCuota: parseFloat(tras.tasaOCuota).toFixed(6),
            Importe: tras.importe
          });
        }
      }
    }
    if (this.node_addendas.nodeBase !== "") {
      const node_addenda = doc.ele("cfdi:Addenda").ele(this.node_addendas.nodeBase, this.node_addendas.attributes);
      if ("content" in this.node_addendas && this.node_addendas.content !== "" && !("nodes" in this.node_addendas)) {
        node_addenda.txt(this.node_addendas.content);
      }
      if ("nodes" in this.node_addendas && this.node_addendas.nodes.length > 0 && !("content" in this.node_addendas)) {
        for (const node of this.node_addendas.nodes) {
          const addenda = node_addenda.ele(node.nodeName);
          if ("content" in node && node.content !== "" && !("nodes" in node)) {
            addenda.txt(node.content.toString());
          }
          if ("nodes" in node && node.nodes.length > 0 && !("content" in node)) {
            for (const a of node.nodes) {
              addenda.ele(a.nodeName).txt(a.content.toString());
            }
          }
        }
      }
    }
    return doc.end({ prettyPrint: true });
  }
  generateNodeComprobante() {
    const node_comprobante = {
      "xsi:schemaLocation": "http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd",
      "xmlns:cfdi": "http://www.sat.gob.mx/cfd/4",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      Version: "4.0",
      Serie: this.node_comprobante.serie,
      Folio: this.node_comprobante.folio,
      Fecha: this.node_comprobante.fecha,
      SubTotal: this.node_comprobante.tipoDeComprobante === "P" ? "0" : parseFloat(this.node_comprobante.subtotal.toString()).toFixed(2),
      Moneda: this.node_comprobante.moneda ?? "MXN",
      Total: this.node_comprobante.tipoDeComprobante === "P" ? "0" : parseFloat(this.node_comprobante.total.toString()).toFixed(2),
      TipoDeComprobante: this.node_comprobante.tipoDeComprobante ?? "I",
      LugarExpedicion: this.node_comprobante.lugarExpedicion,
      NoCertificado: this.config_cfdi.getCert().noCertificado,
      Certificado: this.config_cfdi.getCert().pem.replace("-----BEGIN CERTIFICATE-----", "").replace("-----END CERTIFICATE-----", "").replace(/(\r\n|\n|\r)/gm, ""),
      Exportacion: this.node_comprobante.exportacion ?? "01"
    };
    if ("formaPago" in this.node_comprobante && !["T", "P"].includes(this.node_comprobante.tipoDeComprobante)) {
      node_comprobante.FormaPago = this.node_comprobante.formaPago;
    }
    if ("metodoPago" in this.node_comprobante && !["T", "P"].includes(this.node_comprobante.tipoDeComprobante)) {
      node_comprobante.MetodoPago = this.node_comprobante.metodoPago;
    }
    if ("tipoCambio" in this.node_comprobante && node_comprobante.Moneda !== "MXN") {
      node_comprobante.TipoCambio = this.node_comprobante.tipoCambio;
    }
    if ("condicionesDePago" in this.node_comprobante && !["P"].includes(this.node_comprobante.tipoDeComprobante)) {
      node_comprobante.CondicionesDePago = this.node_comprobante.condicionesDePago;
    }
    if ("descuento" in this.node_comprobante && parseFloat(this.node_comprobante.descuento.toString()) > 0 && !["P"].includes(this.node_comprobante.tipoDeComprobante)) {
      node_comprobante.Descuento = this.node_comprobante.descuento;
    }
    return node_comprobante;
  }
  generateNodeEmisor() {
    const node_attr = {
      Rfc: this.node_emisor.rfc,
      Nombre: this.node_emisor.nombre,
      RegimenFiscal: this.node_emisor.regimenFiscal
    };
    if ("facAtrAdquirente" in this.node_emisor) {
      node_attr.FacAtrAdquirente = this.node_emisor.facAtrAdquirente.padStart(10, "0");
    }
    return node_attr;
  }
  generateNodeReceptor() {
    const node_attr = {
      Rfc: this.node_receptor.rfc,
      Nombre: this.node_receptor.nombre,
      UsoCFDI: this.node_receptor.usoCfdi,
      DomicilioFiscalReceptor: this.node_receptor.domicilioFiscal,
      RegimenFiscalReceptor: this.node_receptor.regimenFiscal
    };
    if ("residenciaFiscal" in this.node_receptor) {
      node_attr.ResidenciaFiscal = this.node_receptor.residenciaFiscal;
    }
    if ("numRegIdTrib" in this.node_receptor) {
      node_attr.NumRegIdTrib = this.node_receptor.numRegIdTrib;
    }
    return node_attr;
  }
  generateNodeConcepto(concepto) {
    const node_attr = {
      ClaveProdServ: concepto.claveProdServ,
      Cantidad: concepto.cantidad,
      ClaveUnidad: concepto.claveUnidad,
      Descripcion: concepto.descripcion,
      Importe: this.node_comprobante.tipoDeComprobante === "P" ? "0" : parseFloat(concepto.importe).toFixed(2),
      ObjetoImp: concepto.objetoImp ?? "02",
      ValorUnitario: this.node_comprobante.tipoDeComprobante === "P" ? "0" : parseFloat(concepto.valorUnitario.toString()).toFixed(2)
    };
    if ("unidad" in concepto) {
      node_attr.Unidad = concepto.unidad;
    }
    if ("noIdentificacion" in concepto) {
      node_attr.NoIdentificacion = concepto.noIdentificacion;
    }
    if ("descuento" in concepto && parseFloat(concepto.descuento) > 0) {
      node_attr.Descuento = parseFloat(concepto.descuento).toFixed(2);
    }
    return node_attr;
  }
  generateNodeTraslado(traslado) {
    const node_attr = {
      Base: parseFloat(traslado.base.toString()).toFixed(2),
      Impuesto: traslado.impuesto,
      TipoFactor: traslado.tipoFactor
    };
    if ("tasaOCuota" in traslado) {
      node_attr.TasaOCuota = parseFloat(traslado.tasaOCuota.toString()).toFixed(6);
    }
    if ("importe" in traslado) {
      node_attr.Importe = parseFloat(traslado.importe.toString()).toFixed(2);
    }
    return node_attr;
  }
  generateNodeRetencion(retencion) {
    const node_attr = {
      Base: parseFloat(retencion.base.toString()).toFixed(2),
      Impuesto: retencion.impuesto,
      TipoFactor: retencion.tipoFactor
    };
    if ("tasaOCuota" in retencion) {
      node_attr.TasaOCuota = parseFloat(retencion.tasaOCuota.toString()).toFixed(6);
    }
    if ("importe" in retencion) {
      node_attr.Importe = parseFloat(retencion.importe.toString()).toFixed(2);
    }
    return node_attr;
  }
  generateNodeACuentaTerceros(aCuentaTerceros) {
    return {
      RfcACuentaTerceros: aCuentaTerceros.rfcACuentaTerceros,
      NombreACuentaTerceros: aCuentaTerceros.nombreACuentaTerceros,
      DomicilioFiscalACuentaTerceros: aCuentaTerceros.domicilioFiscalACuentaTerceros,
      RegimenFiscalACuentaTerceros: aCuentaTerceros.regimenFiscalACuentaTerceros
    };
  }
  generateNodeParte(parte) {
    const node_attr = {
      Cantidad: parte.cantidad,
      ClaveProdServ: parte.claveProdServ,
      Descripcion: parte.descripcion
    };
    if ("unidad" in parte) {
      node_attr.Unidad = parte.unidad;
    }
    if ("noIdentificacion" in parte) {
      node_attr.NoIdentificacion = parte.noIdentificacion;
    }
    if ("valorUnitario" in parte && parseFloat(parte.valorUnitario) > 0) {
      node_attr.ValorUnitario = parseFloat(parte.valorUnitario).toFixed(2);
    }
    if ("importe" in parte && parseFloat(parte.importe) > 0) {
      node_attr.Importe = parseFloat(parte.importe).toFixed(2);
    }
    return node_attr;
  }
  createNodeImpuestos() {
    const imp_obj = {
      total_impuestos_retenidos: {
        total: 0,
        data: []
      },
      total_impuestos_trasladados: {
        total: 0,
        data: []
      }
    };
    for (const concepto of this.node_conceptos) {
      if ("impuestos" in concepto && concepto.concepto.objetoImp !== "01") {
        if ("traslados" in concepto.impuestos && concepto.impuestos.traslados.length > 0) {
          imp_obj.total_impuestos_trasladados.data.push(
            ...concepto.impuestos.traslados.map((traslado) => {
              const node_attr = {
                base: parseFloat(traslado.base.toString()).toFixed(2),
                impuesto: traslado.impuesto,
                tipoFactor: traslado.tipoFactor
              };
              if ("tasaOCuota" in traslado) {
                node_attr.tasaOCuota = parseFloat(traslado.tasaOCuota.toString()).toFixed(6);
              }
              if ("importe" in traslado) {
                node_attr.importe = parseFloat(traslado.importe.toString()).toFixed(2);
                imp_obj.total_impuestos_trasladados.total += parseFloat(traslado.importe.toString());
              }
              return node_attr;
            })
          );
        }
        if ("retenciones" in concepto.impuestos && concepto.impuestos.retenciones.length > 0) {
          imp_obj.total_impuestos_retenidos.data.push(
            ...concepto.impuestos.retenciones.map((retencion) => {
              const node_attr = {
                impuesto: retencion.impuesto
              };
              if ("importe" in retencion) {
                node_attr.importe = parseFloat(retencion.importe.toString()).toFixed(2);
                imp_obj.total_impuestos_retenidos.total += parseFloat(retencion.importe.toString());
              }
              return node_attr;
            })
          );
        }
      }
    }
    return imp_obj;
  }
};
var FacturaCfdi_default = FacturaCfdi;

// src/classes/CatalogoSat.ts
var import_path2 = __toESM(require("path"), 1);
var import_fs3 = __toESM(require("fs"), 1);
var import_stream_json = __toESM(require("stream-json"), 1);
var import_StreamArray = __toESM(require("stream-json/streamers/StreamArray.js"), 1);
var import_url2 = require("url");
var import_meta2 = {};
var { parser } = import_stream_json.default;
var { streamArray } = import_StreamArray.default;
var __dname2 = typeof __dirname !== "undefined" ? __dirname : import_path2.default.dirname((0, import_url2.fileURLToPath)(import_meta2?.url));
var CatalogoSat = class {
  constructor(name) {
    this.catPath = null;
    const result = this.searchCatalogo(name);
    if (!result) throw new Error("There is no catalog");
  }
  searchCatalogo(name) {
    try {
      const json_file = import_path2.default.join(__dname2, "resources", `catalogos/${name.toLowerCase()}.json`);
      if (import_fs3.default.existsSync(json_file)) {
        this.catPath = json_file;
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }
  search(key, value) {
    return new Promise((resolve, reject) => {
      if (!this.catPath) return reject(new Error("The catalog does not exist"));
      const data = import_fs3.default.createReadStream(this.catPath).pipe(parser()).pipe(streamArray());
      let found = false;
      data.on("data", (chunk) => {
        if (!chunk.value[key]) {
          return reject(new Error(`The specified key does not exist: ${key}`));
        }
        if (chunk.value[key].toString() === value.toString()) {
          found = true;
          data.destroy();
          return resolve(chunk.value);
        }
      });
      data.on("error", (err) => reject(err));
      data.on("end", () => {
        if (!found) reject(new Error("Not found"));
      });
    });
  }
};
var CatalogoSat_default = CatalogoSat;

// src/utils/mercancia_keys.ts
var merc_att_keys = [
  { entrada: "cargoPorTasacion", salida: "@_CargoPorTasacion" },
  { entrada: "logisticaInversaRecoleccionDevolucion", salida: "@_LogisticaInversaRecoleccionDevolucion" },
  { entrada: "numTotalMercancias", salida: "@_NumTotalMercancias" },
  { entrada: "pesoBrutoTotal", salida: "@_PesoBrutoTotal" },
  { entrada: "pesoNetoTotal", salida: "@_PesoNetoTotal" },
  { entrada: "unidadPeso", salida: "@_UnidadPeso" }
];
var mercancia_keys = [
  { entrada: "bienesTransp", salida: "@_BienesTransp" },
  { entrada: "descripcion", salida: "@_Descripcion" },
  { entrada: "cantidad", salida: "@_Cantidad" },
  { entrada: "claveUnidad", salida: "@_ClaveUnidad" },
  { entrada: "pesoEnKg", salida: "@_PesoEnKg" },
  { entrada: "claveStcc", salida: "@_ClaveSTCC" },
  { entrada: "unidad", salida: "@_Unidad" },
  { entrada: "dimensiones", salida: "@_Dimensiones" },
  { entrada: "materialPeligroso", salida: "@_MaterialPeligroso" },
  { entrada: "cveMaterialPeligroso", salida: "@_CveMaterialPeligroso" },
  { entrada: "embalaje", salida: "@_Embalaje" },
  { entrada: "descripEmbalaje", salida: "@_DescripEmbalaje" },
  { entrada: "sectorCofepris", salida: "@_SectorCOFEPRIS" },
  { entrada: "nombreIngredienteActivo", salida: "@_NombreIngredienteActivo" },
  { entrada: "nomQuimico", salida: "@_NomQuimico" },
  { entrada: "denominacionGenericaProd", salida: "@_DenominacionGenericaProd" },
  { entrada: "denominacionDistintivaProd", salida: "@_DenominacionDistintivaProd" },
  { entrada: "fabricante", salida: "@_Fabricante" },
  { entrada: "fechaCaducidad", salida: "@_FechaCaducidad" },
  { entrada: "loteMedicamento", salida: "@_LoteMedicamento" },
  { entrada: "formaFarmaceutica", salida: "@_FormaFarmaceutica" },
  { entrada: "condicionesEspTransp", salida: "@_CondicionesEspTransp" },
  { entrada: "registroSanitarioFolioAutorizacion", salida: "@_RegistroSanitarioFolioAutorizacion" },
  { entrada: "permisoImportacion", salida: "@_PermisoImportacion" },
  { entrada: "folioImpoVucem", salida: "@_FolioImpoVUCEM" },
  { entrada: "numCas", salida: "@_NumCAS" },
  { entrada: "razonSocialEmpImp", salida: "@_RazonSocialEmpImp" },
  { entrada: "numRegSanPlagCofepris", salida: "@_NumRegSanPlagCOFEPRIS" },
  { entrada: "datosFabricante", salida: "@_DatosFabricante" },
  { entrada: "datosFormulador", salida: "@_DatosFormulador" },
  { entrada: "datosMaquilador", salida: "@_DatosMaquilador" },
  { entrada: "usoAutorizado", salida: "@_UsoAutorizado" },
  { entrada: "valorMercancia", salida: "@_ValorMercancia" },
  { entrada: "moneda", salida: "@_Moneda" },
  { entrada: "fraccionArancelaria", salida: "@_FraccionArancelaria" },
  { entrada: "uuidComercioExt", salida: "@_UUIDComercioExt" },
  { entrada: "tipoMateria", salida: "@_TipoMateria" },
  { entrada: "descripcionMateria", salida: "@_DescripcionMateria" }
];
var merc_doc_aduanera = [
  { entrada: "identDocAduanero", salida: "@_IdentDocAduanero" },
  { entrada: "numPedimento", salida: "@_NumPedimento" },
  { entrada: "rfcImpo", salida: "@_RFCImpo" },
  { entrada: "tipoDocumento", salida: "@_TipoDocumento" }
];
var merc_guias_ident = [
  { entrada: "descripGuiaIdentificacion", salida: "@_DescripGuiaIdentificacion" },
  { entrada: "numeroGuiaIdentificacion", salida: "@_NumeroGuiaIdentificacion" },
  { entrada: "pesoGuiaIdentificacion", salida: "@_PesoGuiaIdentificacion" }
];

// src/utils/autotransporte_keys.ts
var auto_seguros_keys = [
  { entrada: "aseguraRespCivil", salida: "@_AseguraRespCivil" },
  { entrada: "polizaRespCivil", salida: "@_PolizaRespCivil" },
  { entrada: "aseguraCarga", salida: "@_AseguraCarga" },
  { entrada: "polizaCarga", salida: "@_PolizaCarga" },
  { entrada: "aseguraMedAmbiente", salida: "@_AseguraMedAmbiente" },
  { entrada: "polizaMedAmbiente", salida: "@_PolizaMedAmbiente" },
  { entrada: "primaSeguro", salida: "@_PrimaSeguro" }
];

// src/utils/tipos_figura_keys.ts
var tipos_figura_keys = [
  { entrada: "nombreFigura", salida: "@_NombreFigura" },
  { entrada: "rfcFigura", salida: "@_RFCFigura" },
  { entrada: "tipoFigura", salida: "@_TipoFigura" },
  { entrada: "numLicencia", salida: "@_NumLicencia" },
  { entrada: "numRegIdTribFigura", salida: "@_NumRegIdTribFigura" },
  { entrada: "residenciaFiscalFigura", salida: "@_ResidenciaFiscalFigura" }
];
var tipos_figura_domicilio = [
  { entrada: "codigoPostal", salida: "@_CodigoPostal" },
  { entrada: "estado", salida: "@_Estado" },
  { entrada: "pais", salida: "@_Pais" },
  { entrada: "calle", salida: "@_Calle" },
  { entrada: "numeroInterior", salida: "@_NumeroInterior" },
  { entrada: "numeroExterior", salida: "@_NumeroExterior" },
  { entrada: "colonia", salida: "@_Colonia" },
  { entrada: "localidad", salida: "@_Localidad" },
  { entrada: "municipio", salida: "@_Municipio" },
  { entrada: "referencia", salida: "@_Referencia" }
];

// src/utils/ubicacion_keys.ts
var ubicacion_keys = [
  { entrada: "tipoUbicacion", salida: "@_TipoUbicacion" },
  { entrada: "rfcRemitenteDestinatario", salida: "@_RFCRemitenteDestinatario" },
  { entrada: "idUbicacion", salida: "@_IDUbicacion" },
  { entrada: "fechaHoraSalidaLlegada", salida: "@_FechaHoraSalidaLlegada" },
  { entrada: "distanciaRecorrida", salida: "@_DistanciaRecorrida" },
  { entrada: "navegacionTrafico", salida: "@_NavegacionTrafico" },
  { entrada: "nombreEstacion", salida: "@_NombreEstacion" },
  { entrada: "nombreRemitenteDestinatario", salida: "@_NombreRemitenteDestinatario" },
  { entrada: "numEstacion", salida: "@_NumEstacion" },
  { entrada: "numRegIdTrib", salida: "@_NumRegIdTrib" },
  { entrada: "residenciaFiscal", salida: "@_ResidenciaFiscal" },
  { entrada: "tipoEstacion", salida: "@_TipoEstacion" }
];

// src/utils/maritimotransporte_key.ts
var maritimo_keys = [
  { entrada: "permSct", salida: "@_PermSCT" },
  { entrada: "numPermisoSct", salida: "@_NumPermisoSCT" },
  { entrada: "tipoEmbarcacion", salida: "@_TipoEmbarcacion" },
  { entrada: "matricula", salida: "@_Matricula" },
  { entrada: "numeroOmi", salida: "@_NumeroOMI" },
  { entrada: "nacionalidadEmbarc", salida: "@_NacionalidadEmbarc" },
  { entrada: "unidadesDeArqBruto", salida: "@_UnidadesDeArqBruto" },
  { entrada: "tipoCarga", salida: "@_TipoCarga" },
  { entrada: "nombreAgenteNaviero", salida: "@_NombreAgenteNaviero" },
  { entrada: "numAutorizacionNaviero", salida: "@_NumAutorizacionNaviero" },
  { entrada: "numViaje", salida: "@_NumViaje" },
  { entrada: "numConocEmbarc", salida: "@_NumConocEmbarc" },
  { entrada: "permisoTempNavegacion", salida: "@_PermisoTempNavegacion" },
  { entrada: "anioEmbarcacion", salida: "@_AnioEmbarcacion" },
  { entrada: "nombreEmbarc", salida: "@_NombreEmbarc" },
  { entrada: "eslora", salida: "@_Eslora" },
  { entrada: "manga", salida: "@_Manga" },
  { entrada: "calado", salida: "@_Calado" },
  { entrada: "puntal", salida: "@_Puntal" },
  { entrada: "lineaNaviera", salida: "@_LineaNaviera" },
  { entrada: "nombreAseg", salida: "@_NombreAseg" },
  { entrada: "numPolizaSeguro", salida: "@_NumPolizaSeguro" }
];
var contenedor_keys = [
  { entrada: "tipoContenedor", salida: "@_TipoContenedor" },
  { entrada: "matriculaContenedor", salida: "@_MatriculaContenedor" },
  { entrada: "fechaCertificacionCcp", salida: "@_FechaCertificacionCCP" },
  { entrada: "idCcpRelacionado", salida: "@_IdCCPRelacionado" },
  { entrada: "numPrecinto", salida: "@_NumPrecinto" },
  { entrada: "placaVmCcp", salida: "@_PlacaVMCCP" }
];

// src/utils/aereo_keys.ts
var aereo_keys = [
  { entrada: "permSct", salida: "@_PermSCT" },
  { entrada: "numPermisoSct", salida: "@_NumPermisoSCT" },
  { entrada: "codigoTransportista", salida: "@_CodigoTransportista" },
  { entrada: "numeroGuia", salida: "@_NumeroGuia" },
  { entrada: "rfcEmbarcador", salida: "@_RFCEmbarcador" },
  { entrada: "lugarContrato", salida: "@_LugarContrato" },
  { entrada: "matriculaAeronave", salida: "@_MatriculaAeronave" },
  { entrada: "nombreAseg", salida: "@_NombreAseg" },
  { entrada: "nombreEmbarcador", salida: "@_NombreEmbarcador" },
  { entrada: "numPolizaSeguro", salida: "@_NumPolizaSeguro" },
  { entrada: "numRegIdTribEmbarc", salida: "@_NumRegIdTribEmbarc" },
  { entrada: "residenciaFiscalEmbarc", salida: "@_ResidenciaFiscalEmbarc" }
];

// src/utils/ferroviario_keys.ts
var ferroviario_keys = [
  { entrada: "tipoDeServicio", salida: "@_TipoDeServicio" },
  { entrada: "tipoDeTrafico", salida: "@_TipoDeTrafico" },
  { entrada: "nombreAseg", salida: "@_NombreAseg" },
  { entrada: "numPolizaSeguro", salida: "@_NumPolizaSeguro" }
];

// src/classes/CartaPorte.ts
var CartaPorte = class extends Utils_default {
  constructor(cfdi, config_cfdi, type) {
    super();
    this.attributes = {
      idCcp: "",
      transpInternac: "No"
    };
    this.node_regimenes_aduaneros = [];
    this.node_ubicaciones = [];
    this.node_mercancias_attr = {
      numTotalMercancias: 0,
      pesoBrutoTotal: 0,
      unidadPeso: ""
    };
    this.node_mercancias = [];
    this.node_transporte = {
      numPermisoSct: "",
      permSct: ""
    };
    this.node_identificacion_vehicular = {
      anioModeloVm: "",
      configVehicular: "",
      pesoBrutoVehicular: "",
      placaVm: ""
    };
    this.node_autotransporte_seguros = {
      aseguraRespCivil: "",
      polizaRespCivil: ""
    };
    this.node_autotransporte_remolques = [];
    this.node_transporte_maritimo = {
      matricula: "",
      nacionalidadEmbarc: "",
      nombreAgenteNaviero: "",
      numAutorizacionNaviero: "",
      numeroOmi: "",
      numPermisoSct: "",
      permSct: "",
      tipoCarga: "",
      tipoEmbarcacion: "",
      unidadesDeArqBruto: ""
    };
    this.node_contenedores_maritimos = [];
    this.node_transporte_aereo = {
      numPermisoSct: "",
      permSct: "",
      codigoTransportista: "",
      numeroGuia: ""
    };
    this.node_transporte_ferroviario = {
      tipoDeServicio: "",
      tipoDeTrafico: ""
    };
    this.node_derechos_de_paso = [];
    this.node_carro = [];
    this.node_tipo_figura = [];
    this.cfdi = cfdi;
    this.config_cfdi = config_cfdi;
    this.type_cp = type;
  }
  setAttributes(data) {
    this.attributes = data;
  }
  createNodeRegimenesAduaneros(data) {
    this.node_regimenes_aduaneros = data;
  }
  createNodeUbicacion(data) {
    this.node_ubicaciones.push(data);
  }
  createNodeMercancias(data) {
    this.node_mercancias_attr = data;
  }
  createNodeMercancia(data) {
    this.node_mercancias.push(data);
  }
  createNodeTipoFigura(data) {
    this.node_tipo_figura.push(data);
  }
  async createXmlSellado() {
    try {
      const json = this.generateJson();
      const sign = await generateCadenaOriginal_default(json, this.config_cfdi);
      json["cfdi:Comprobante"]["@_Sello"] = sign;
      return Utils_default.jsonToXml(json);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async createJsonSellado(simplified = false) {
    try {
      const { ["?xml"]: _omit, ...rest } = this.generateJson();
      const sign = await generateCadenaOriginal_default(rest, this.config_cfdi);
      rest["cfdi:Comprobante"]["@_Sello"] = sign;
      return simplified ? this.simplifyJson(rest) : rest;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //public async createXmlSellado() {}
  generateJson() {
    let json = this.cfdi;
    if (typeof this.cfdi === "string") {
      json = Utils_default.xmlToJson(this.cfdi);
    }
    json["cfdi:Comprobante"]["@_xsi:schemaLocation"] = `${json["cfdi:Comprobante"]["@_xsi:schemaLocation"]} http://www.sat.gob.mx/CartaPorte31 http://www.sat.gob.mx/sitio_internet/cfd/CartaPorte/CartaPorte31.xsd`;
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
      "cartaporte31:CartaPorte": nodeCartaPorteAttrs
    };
    if (!json["cfdi:Comprobante"]["cfdi:Complemento"]) {
      json["cfdi:Comprobante"]["cfdi:Complemento"] = node_carta_porte;
    } else {
      Object.assign(json["cfdi:Comprobante"]["cfdi:Complemento"], node_carta_porte);
    }
    return json;
  }
  generateAttribute() {
    const att = {
      "@_IdCCP": this.attributes.idCcp,
      "@_TranspInternac": this.attributes.transpInternac,
      "@_Version": 3.1
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
  generateNodeRegimenesAduaneros() {
    return {
      "cartaporte31:RegimenAduaneroCCP": this.node_regimenes_aduaneros.map((r) => ({
        "@_RegimenAduanero": r
      }))
    };
  }
  generateNodeUbicaciones() {
    return {
      "cartaporte31:Ubicacion": this.node_ubicaciones.map((r) => {
        const node = {};
        for (const uk of ubicacion_keys) {
          if (r.ubicacion[uk.entrada]) {
            node[uk.salida] = r.ubicacion[uk.entrada];
          }
        }
        if ("domicilio" in r) {
          const node_dom = {};
          for (const ud of tipos_figura_domicilio) {
            if (r.domicilio[ud.entrada]) {
              node_dom[ud.salida] = r.domicilio[ud.entrada];
            }
          }
          node["cartaporte31:Domicilio"] = node_dom;
        }
        return node;
      })
    };
  }
  generateNodeMercancias() {
    const att = {};
    for (const mak of merc_att_keys) {
      if (this.node_mercancias_attr[mak.entrada]) {
        att[mak.salida] = this.node_mercancias_attr[mak.entrada];
      }
    }
    att["cartaporte31:Mercancia"] = this.node_mercancias.map((i) => {
      const node = {};
      for (const mk of mercancia_keys) {
        if (i.mercancia[mk.entrada]) {
          node[mk.salida] = i.mercancia[mk.entrada];
        }
      }
      if ("documentacionAduanera" in i && i.documentacionAduanera.length > 0) {
        node["cartaporte31:DocumentacionAduanera"] = i.documentacionAduanera.map((da) => {
          const da_node = {};
          for (const mda of merc_doc_aduanera) {
            if (da[mda.entrada]) {
              da_node[mda.salida] = da[mda.entrada];
            }
          }
          return da_node;
        });
      }
      if ("guiasIdentificacion" in i && i.guiasIdentificacion.length > 0) {
        node["cartaporte31:GuiasIdentificacion"] = i.guiasIdentificacion.map((gi) => {
          const gi_node = {};
          for (const mgi of merc_guias_ident) {
            if (gi[mgi.entrada]) {
              gi_node[mgi.salida] = gi[mgi.entrada];
            }
          }
          return gi_node;
        });
      }
      if ("cantidadTransporta" in i && i.cantidadTransporta.length > 0) {
        node["cartaporte31:CantidadTransporta"] = i.cantidadTransporta.map((ct) => {
          const ct_node = {
            "@_Cantidad": ct.cantidad,
            "@_IDOrigen": ct.idOrigen,
            "@_IDDestino": ct.idDestino
          };
          if ("cvesTransporte" in ct) {
            ct_node["@_CvesTransporte"] = ct.cvesTransporte;
          }
          return ct_node;
        });
      }
      if ("detalleMercancia" in i) {
        const att2 = {
          "@_PesoBruto": i.detalleMercancia.pesoBruto,
          "@_PesoNeto": i.detalleMercancia.pesoNeto,
          "@_PesoTara": i.detalleMercancia.pesoTara,
          "@_UnidadPesoMerc": i.detalleMercancia.unidadPesoMerc
        };
        if ("numPiezas" in i.detalleMercancia) {
          att2["@_NumPiezas"] = i.detalleMercancia.numPiezas;
        }
        node["cartaporte31:DetalleMercancia"] = att2;
      }
      return node;
    });
    if (this.type_cp === "A") {
      att["cartaporte31:Autotransporte"] = this.generateNodeAutotransporte();
    }
    if (this.type_cp === "M") {
      att["cartaporte31:TransporteMaritimo"] = this.generateNodeMaritimo();
    }
    if (this.type_cp === "AV") {
      att["cartaporte31:TransporteAereo"] = this.generateNodeAereo();
    }
    if (this.type_cp === "F") {
      att["cartaporte31:TransporteFerroviario"] = this.generateNodeFerroviario();
    }
    return att;
  }
  generateNodeAutotransporte() {
    const node_att_seguros = {};
    for (const ask of auto_seguros_keys) {
      if (this.node_autotransporte_seguros[ask.entrada]) {
        node_att_seguros[ask.salida] = this.node_autotransporte_seguros[ask.entrada];
      }
    }
    const node = {
      "@_PermSCT": this.node_transporte.permSct,
      "@_NumPermisoSCT": this.node_transporte.numPermisoSct,
      "cartaporte31:IdentificacionVehicular": {
        "@_AnioModeloVM": this.node_identificacion_vehicular.anioModeloVm,
        "@_ConfigVehicular": this.node_identificacion_vehicular.configVehicular,
        "@_PesoBrutoVehicular": this.node_identificacion_vehicular.pesoBrutoVehicular.toString(),
        "@_PlacaVM": this.node_identificacion_vehicular.placaVm
      },
      "cartaporte31:Seguros": node_att_seguros
    };
    if (this.node_autotransporte_remolques.length > 0) {
      node["cartaporte31:Remolques"] = {
        "cartaporte31:Remolque": this.node_autotransporte_remolques.map((r) => ({
          "@_SubTipoRem": r.subTipoRem,
          "@_Placa": r.placa
        }))
      };
    }
    return node;
  }
  generateNodeMaritimo() {
    const node = {};
    for (const mk of maritimo_keys) {
      if (this.node_transporte_maritimo[mk.entrada]) {
        node[mk.salida] = this.node_transporte_maritimo[mk.entrada];
      }
    }
    if (this.node_contenedores_maritimos.length > 0) {
      node["cartaporte31:Contenedor"] = this.node_contenedores_maritimos.map((cm) => this.generateNodeContenedor(cm));
    }
    return node;
  }
  generateNodeContenedor(cm) {
    const node = {};
    for (const ck of contenedor_keys) {
      if (cm.contenedor[ck.entrada]) {
        node[ck.salida] = cm.contenedor[ck.entrada];
      }
    }
    if ("remolques" in cm && cm.remolques.length > 0) {
      node["cartaporte31:RemolquesCCP"] = {
        "cartaporte31:RemolqueCCP": cm.remolques.map((r) => {
          return {
            "@_PlacaCCP": r.placaCcp,
            "@_SubTipoRemCCP": r.subTipoRemCcp
          };
        })
      };
    }
    return node;
  }
  generateNodeAereo() {
    const node = {};
    for (const ak of aereo_keys) {
      if (this.node_transporte_aereo[ak.entrada]) {
        node[ak.salida] = this.node_transporte_aereo[ak.entrada];
      }
    }
    return node;
  }
  generateNodeFerroviario() {
    const node = {};
    for (const fk of ferroviario_keys) {
      if (this.node_transporte_ferroviario[fk.entrada]) {
        node[fk.salida] = this.node_transporte_ferroviario[fk.entrada];
      }
    }
    if (this.node_derechos_de_paso.length > 0) {
      node["cartaporte31:DerechosDePaso"] = this.node_derechos_de_paso.map((dp) => ({
        "@_KilometrajePagado": dp.kilometrajePagado,
        "@_TipoDerechoDePaso": dp.tipoDerechoDePaso
      }));
    }
    if (this.node_carro.length > 0) {
      node["cartaporte31:Carro"] = this.node_carro.map((c) => {
        const node_carro = {
          "@_TipoCarro": c.carro.tipoCarro,
          "@_MatriculaCarro": c.carro.matriculaCarro,
          "@_GuiaCarro": c.carro.guiaCarro,
          "@_ToneladasNetasCarro": c.carro.toneladasNetasCarro
        };
        if ("contenedor" in c && c.contenedores.length > 0) {
          node_carro["cartaporte31:Contenedor"] = c.contenedores.map((con) => ({
            "@_PesoContenedorVacio": con.pesoContenedorVacio,
            "@_PesoNetoMercancia": con.pesoNetoMercancia,
            "@_TipoContenedor": con.tipoContenedor
          }));
        }
        return node_carro;
      });
    }
    return node;
  }
  generateNodeFiguraTranporte() {
    const node = {
      "cartaporte31:TiposFigura": this.node_tipo_figura.map((tf) => {
        const node_att = {};
        for (const tfk of tipos_figura_keys) {
          if (tf.tipoFigura[tfk.entrada]) {
            node_att[tfk.salida] = tf.tipoFigura[tfk.entrada];
          }
        }
        if ("partesTransporte" in tf) {
          node_att["cartaporte31:PartesTransporte"] = tf.partesTransporte.map((pt) => ({
            "@_ParteTransporte": pt.parteTransporte
          }));
        }
        if ("domicilio" in tf) {
          const node_att_dom = {};
          for (const tfd of tipos_figura_domicilio) {
            if (tf.domicilio[tfd.entrada]) {
              node_att_dom[tfd.salida] = tf.domicilio[tfd.entrada];
            }
          }
          node_att["cartaporte31:Domicilio"] = node_att_dom;
        }
        return node_att;
      })
    };
    return node;
  }
  setNodeTransporteData(data) {
    this.node_transporte = data;
  }
  setNodeTransporteMaritimo(data) {
    this.node_transporte_maritimo = data;
  }
  setNodeAutotransporteIdenVehicular(data) {
    this.node_identificacion_vehicular = data;
  }
  setNodeAutotransporteSeguros(data) {
    this.node_autotransporte_seguros = data;
  }
  setNodeAutotransporteRemolques(data) {
    this.node_autotransporte_remolques.push(data);
  }
  setNodeContenedorMaritimo(data) {
    this.node_contenedores_maritimos.push(data);
  }
  setNodeTransporteAereo(data) {
    this.node_transporte_aereo = data;
  }
  setNodeTransporteFerroviario(data) {
    this.node_transporte_ferroviario = data;
  }
  setNodeDerechoDePasoFerr(data) {
    this.node_derechos_de_paso.push(data);
  }
  setNodeCarroFerroviario(data) {
    this.node_carro.push(data);
  }
};
var CartaPorte_default = CartaPorte;

// src/classes/CartaPorteAutotransporte.ts
var CartaPorteAutotransporte = class extends CartaPorte_default {
  constructor(cfdi, config_cfdi) {
    super(cfdi, config_cfdi, "A");
  }
  createNodeAutotransporte(data) {
    this.setNodeTransporteData(data);
  }
  createNodeIdentificacionVehicular(data) {
    this.setNodeAutotransporteIdenVehicular(data);
  }
  createNodeSeguros(data) {
    this.setNodeAutotransporteSeguros(data);
  }
  createNodeRemolques(data) {
    this.setNodeAutotransporteRemolques(data);
  }
};
var CartaPorteAutotransporte_default = CartaPorteAutotransporte;

// src/classes/CartaPorteMaritimo.ts
var CartaPorteMaritimo = class extends CartaPorte_default {
  constructor(cfdi, config_cfdi) {
    super(cfdi, config_cfdi, "M");
  }
  createNodeMaritimo(data) {
    this.setNodeTransporteMaritimo(data);
  }
  createNodeContenedor(data) {
    this.setNodeContenedorMaritimo(data);
  }
};
var CartaPorteMaritimo_default = CartaPorteMaritimo;

// src/classes/CartaPorteAereo.ts
var CartaPorteAereo = class extends CartaPorte_default {
  constructor(cfdi, config_cfdi) {
    super(cfdi, config_cfdi, "AV");
  }
  createNodeAereo(data) {
    this.setNodeTransporteAereo(data);
  }
};
var CartaPorteAereo_default = CartaPorteAereo;

// src/classes/CartaPorteFerroviario.ts
var CartaPorteFerroviario = class extends CartaPorte_default {
  constructor(cfdi, config_cfdi) {
    super(cfdi, config_cfdi, "F");
  }
  createNodeFerroviario(data) {
    this.setNodeTransporteFerroviario(data);
  }
  createNodeDerechoDePaso(data) {
    this.setNodeDerechoDePasoFerr(data);
  }
  createNodeCarro(data) {
    this.setNodeCarroFerroviario(data);
  }
};
var CartaPorteFerroviario_default = CartaPorteFerroviario;

// src/utils/pagos.ts
var totales_keys = [
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
  { entrada: "totalTrasladosImpuestoIva8", salida: "@_TotalTrasladosImpuestoIVA8" }
];
var pagos_keys = [
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
  { entrada: "selloPago", salida: "@_SelloPago" }
];
var doc_relacionado_keys = [
  { entrada: "idDocumento", salida: "@_IdDocumento" },
  { entrada: "monedaDr", salida: "@_MonedaDR" },
  { entrada: "numParcialidad", salida: "@_NumParcialidad" },
  { entrada: "impSaldoAnt", salida: "@_ImpSaldoAnt" },
  { entrada: "impPagado", salida: "@_ImpPagado" },
  { entrada: "impSaldoInsoluto", salida: "@_ImpSaldoInsoluto" },
  { entrada: "objetoImpDr", salida: "@_ObjetoImpDR" },
  { entrada: "serie", salida: "@_Serie" },
  { entrada: "folio", salida: "@_Folio" },
  { entrada: "equivalenciaDr", salida: "@_EquivalenciaDR" }
];

// src/classes/Pago.ts
var Pago = class extends Utils_default {
  constructor(cfdi, config_cfdi) {
    super();
    this.totales = {
      montoTotalPagos: 0
    };
    this.pagos = [];
    this.retenciones = [];
    this.traslados = [];
    if (typeof cfdi === "string") {
      this.cfdi = Utils_default.xmlToJson(cfdi);
    } else {
      this.cfdi = cfdi;
    }
    this.config_cfdi = config_cfdi;
  }
  createNodeTotales(data) {
    this.totales = data;
  }
  createNodePago(data) {
    this.pagos.push(data);
  }
  async createJsonSellado(simplified = false) {
    try {
      const { ["?xml"]: _omit, ...rest } = this.generateJson();
      const sign = await generateCadenaOriginal_default(rest, this.config_cfdi);
      rest["cfdi:Comprobante"]["@_Sello"] = sign;
      return simplified ? this.simplifyJson(rest) : rest;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async createXmlSellado() {
    try {
      const json = this.generateJson();
      const sign = await generateCadenaOriginal_default(json, this.config_cfdi);
      json["cfdi:Comprobante"]["@_Sello"] = sign;
      return Utils_default.jsonToXml(json);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  generateJson() {
    let json = this.cfdi;
    json["cfdi:Comprobante"]["@_xsi:schemaLocation"] = `${json["cfdi:Comprobante"]["@_xsi:schemaLocation"]} http://www.sat.gob.mx/Pagos20 http://www.sat.gob.mx/sitio_internet/cfd/Pagos/Pagos20.xsd`;
    json["cfdi:Comprobante"]["@_xmlns:pago20"] = "http://www.sat.gob.mx/Pagos20";
    const nodePagoAttrs = this.generateAttribute();
    if (!json["cfdi:Comprobante"]["cfdi:Complemento"]) {
      json["cfdi:Comprobante"]["cfdi:Complemento"] = {
        "pago20:Pagos": nodePagoAttrs
      };
    } else {
      Object.assign(json["cfdi:Comprobante"]["cfdi:Complemento"], {
        "pago20:Pagos": nodePagoAttrs
      });
    }
    return json;
  }
  generateAttribute() {
    const att = {
      "@_Version": "2.0",
      "pago20:Totales": this.generateNodeTotales(),
      "pago20:Pago": this.pagos.map((p) => this.generateNodePago(p))
    };
    return att;
  }
  generateNodeTotales() {
    const node = {};
    for (const tk of totales_keys) {
      if (this.totales[tk.entrada] != null) {
        node[tk.salida] = parseFloat(this.totales[tk.entrada].toString()).toFixed(2);
      }
    }
    return node;
  }
  generateNodePago(data) {
    const node = {};
    for (const pk of pagos_keys) {
      if (data.pago[pk.entrada]) {
        node[pk.salida] = pk.entrada === "monto" ? parseFloat(data.pago[pk.entrada].toString()).toFixed(2) : data.pago[pk.entrada];
      }
    }
    if ("doctoRelacionados" in data) {
      node["pago20:DoctoRelacionado"] = data.doctoRelacionados.map((dr) => this.generateDoctoRelacionado(dr));
    }
    if (this.retenciones.length > 0 || this.traslados.length > 0) {
      node["pago20:ImpuestosP"] = {};
      if (this.retenciones.length > 0) {
        node["pago20:ImpuestosP"]["pago20:RetencionesP"] = {
          "pago20:RetencionP": this.retenciones.map((r) => ({
            "@_ImpuestoP": r.impuestoDr,
            "@_ImporteP": parseFloat(r.importeDr.toString()).toFixed(2)
          }))
        };
      }
      if (this.traslados.length > 0) {
        node["pago20:ImpuestosP"]["pago20:TrasladosP"] = {
          "pago20:TrasladoP": this.traslados.map((t) => {
            const att = {
              "@_BaseP": parseFloat(t.baseDr.toString()).toFixed(2),
              "@_ImpuestoP": t.impuestoDr,
              "@_TipoFactorP": t.tipoFactorDr
            };
            if ("tasaOCuotaDr" in t) {
              att["@_TasaOCuotaP"] = parseFloat(t.tasaOCuotaDr.toString()).toFixed(6);
            }
            if ("importeDr" in t) {
              att["@_ImporteP"] = parseFloat(t.importeDr.toString()).toFixed(2);
            }
            return att;
          })
        };
      }
    }
    return node;
  }
  generateDoctoRelacionado(data) {
    const node = {};
    for (const drk of doc_relacionado_keys) {
      if (data.doctoRelacionado[drk.entrada] != null) {
        node[drk.salida] = drk.entrada !== "equivalenciaDr" && typeof data.doctoRelacionado[drk.entrada] !== "string" ? parseFloat(data.doctoRelacionado[drk.entrada].toString()).toFixed(2) : data.doctoRelacionado[drk.entrada];
      }
    }
    if ("impuestos" in data) {
      node["pago20:ImpuestosDR"] = this.generateNodeImpuestos(data.impuestos);
    }
    return node;
  }
  generateNodeImpuestos(data) {
    const node = {};
    if ("retenciones" in data && data.retenciones.length > 0) {
      node["pago20:RetencionesDR"] = {
        "pago20:RetencionDR": data.retenciones.map((r) => {
          const retencion_index = this.retenciones.findIndex((aR) => aR.impuestoDr === r.impuestoDr);
          if (retencion_index > -1) {
            this.retenciones[retencion_index].importeDr = parseFloat(this.retenciones[retencion_index].importeDr.toString()) + parseFloat(r.importeDr.toString());
          } else {
            this.retenciones.push(r);
          }
          return {
            "@_BaseDR": parseFloat(r.baseDr.toString()).toFixed(2),
            "@_ImpuestoDR": r.impuestoDr,
            "@_TipoFactorDR": r.tipoFactorDr,
            "@_TasaOCuotaDR": parseFloat(r.tasaOCuotaDr.toString()).toFixed(6),
            "@_ImporteDR": parseFloat(r.importeDr.toString()).toFixed(2)
          };
        })
      };
    }
    if ("traslados" in data && data.traslados.length > 0) {
      this.traslados = data.traslados;
      node["pago20:TrasladosDR"] = {
        "pago20:TrasladoDR": data.traslados.map((t) => {
          const n_traslado = {
            "@_BaseDR": parseFloat(t.baseDr.toString()).toFixed(2),
            "@_ImpuestoDR": t.impuestoDr,
            "@_TipoFactorDR": t.tipoFactorDr
          };
          if ("tasaOCuotaDr" in t) {
            n_traslado["@_TasaOCuotaDR"] = parseFloat(t.tasaOCuotaDr.toString()).toFixed(6);
          }
          if ("importeDr" in t) {
            n_traslado["@_ImporteDR"] = parseFloat(t.importeDr.toString()).toFixed(2);
          }
          return n_traslado;
        })
      };
    }
    return node;
  }
};
var Pago_default = Pago;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CartaPorteAereo,
  CartaPorteAutotransporte,
  CartaPorteFerroviario,
  CartaPorteMaritimo,
  CatalogoSat,
  ConfigCfdi,
  FacturaCfdi,
  Pago,
  Utils
});
