import path from "path";
import fs from "fs";
import xpath from "xpath";
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";
import { fileURLToPath } from "url";
const __dname: any = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta?.url));

const resolveInclusions = async () => {
  try {
    const basePath = path.resolve(__dname, "resources", "xslt");
    const xsltFile = path.resolve(basePath, "./cadenaoriginal_4_0.xslt");
    const xsltContent = await fs.promises.readFile(xsltFile, "utf8");

    const doc = new DOMParser().parseFromString(xsltContent, "text/xml");
    const selectNameSpace = xpath.useNamespaces({
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
      cartaporte31: "http://www.sat.gob.mx/CartaPorte31",
    });

    const includeNodes = selectNameSpace("//xsl:include", doc as unknown as Node);

    if (!includeNodes || (includeNodes as any).length === 0) {
      throw new Error("No include nodes found in the XSLT file.");
    }
    for (const node of includeNodes as any) {
      const href = node.getAttribute("href");
      if (href) {
        const includePath = path.resolve(basePath, href);
        const data = await fs.promises.readFile(includePath, "utf8");
        const includeDoc = new DOMParser().parseFromString(data, "application/xml") as unknown as Document;

        while (includeDoc.documentElement.childNodes.length > 0) {
          const importedNode = includeDoc.documentElement.childNodes[0];
          node.parentNode.insertBefore(importedNode, node);
        }

        node.parentNode.removeChild(node);
      }
    }
    return new XMLSerializer().serializeToString(doc);
  } catch (error: any) {
    throw new Error(`Error resolving inclusions: ${error.message}`);
  }
};
export default resolveInclusions;
