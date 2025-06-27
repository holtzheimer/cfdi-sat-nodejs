import { XMLParser, XMLBuilder } from "fast-xml-parser";
import { v4 as uuidv4 } from "uuid";
class Utils {
  public static xmlToJson(xml: string) {
    const parser = new XMLParser({ ignoreAttributes: false });
    return parser.parse(xml);
  }
  public static jsonToXml(json: any): string {
    const builder = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      format: true,
      suppressEmptyNode: true,
    });
    return builder.build(json);
  }
  public static generateUuid(): string {
    return uuidv4().toLowerCase();
  }
  public static sanitizeText(text: string): string {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9\s.,-]/g, "")
      .trim();
  }
  public static dateCurrent(): string {
    return new Date().toISOString().slice(0, 19);
  }
  public static generateIdCcp(): string {
    const uuid = uuidv4();
    const partes = uuid.split("-");
    partes[0] = partes[0].slice(0, 5);
    return `CCC${partes.join("-")}`;
  }
}
export default Utils;
