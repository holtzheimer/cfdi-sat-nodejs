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
    });
    return builder.build(json);
  }
  public static validateRFC(rfc: string): boolean {
    const regex = /^([A-ZÑ&]{3,4})-?([0-9]{2})([0-1][0-9])([0-3][0-9])-?([A-Z\d]{3})$/i;
    return regex.test(rfc);
  }
  public static generateUUID(): string {
    return uuidv4();
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
}
export default Utils;
