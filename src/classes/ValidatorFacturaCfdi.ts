import { INodeComprobante } from "../interfaces/IFacturaCfdi";
import Validator from "./Validator";
import { errors_fecha, errors_folio, errors_forma_pago, errors_metodo_pago, errors_serie, errors_tipo_comprobante } from "../utils/errors_factura_cfdi";
import Utils from "./Utils";
interface IError {
  code: string;
  message: string;
}
type nodesTypes = "comprobante";
const tiposComprobante = ["I", "E", "P", "T"];
class ValidatorFacturaCfdi<T extends Record<string, any>> extends Validator {
  private readonly type: nodesTypes | null = null;
  constructor(type: nodesTypes, private readonly data: T) {
    super();
    this.type = type;
    this.run();
  }
  private run() {
    switch (this.type) {
      case "comprobante":
        this.validateNodeComprobante();
        break;
      default:
        return [];
    }
  }
  private validateNodeComprobante() {
    const data = this.data as unknown as INodeComprobante;
    if ("tipoDeComprobante" in data) {
      const err_tipo_comprobante_code = this.validateTipoComprobante(data.tipoDeComprobante);
      if (err_tipo_comprobante_code !== "") {
        return this.setErrors(errors_tipo_comprobante.find((i) => i.code === err_tipo_comprobante_code)!);
      }
    }
    const err_serie_code = this.validateSerie(data.serie);
    if (err_serie_code !== "") {
      return this.setErrors(errors_serie.find((i) => i.code === err_serie_code)!);
    }
    const err_folio_code = this.validateFolio(data.folio);
    if (err_folio_code !== "") {
      return this.setErrors(errors_folio.find((i) => i.code === err_folio_code)!);
    }
    const err_fecha_code = this.validateFecha(data.fecha);
    if (err_fecha_code !== "") {
      return this.setErrors(errors_fecha.find((i) => i.code === err_fecha_code)!);
    }
    const err_metodo_pago_cod = this.validateMetodoPago(data.metodoPago, data.tipoDeComprobante ?? "I");
    if (err_metodo_pago_cod !== "") {
      return this.setErrors(errors_metodo_pago.find((i) => i.code === err_metodo_pago_cod)!);
    }
    const err_forma_pago_code = this.validateFormaPago(data.formaPago, data.tipoDeComprobante ?? "I", data.metodoPago);
    if (err_forma_pago_code !== "") {
      return this.setErrors(errors_forma_pago.find((i) => i.code === err_forma_pago_code)!);
    }
  }
  private validateTipoComprobante(tipo_comprobante: string | undefined): string {
    if (typeof tipo_comprobante !== "string") {
      return "CSN40106";
    }
    if (!tiposComprobante.includes(tipo_comprobante)) {
      return "CSN40107";
    }
    return "";
  }
  private validateSerie(serie: string | undefined): string {
    if (serie === undefined) {
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
  private validateFolio(folio: string | undefined): string {
    if (folio === undefined) {
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
  private validateFecha(data: string | undefined): string {
    if (!data) {
      return "CSN40115";
    } else {
      if (typeof data !== "string") {
        return "CSN40116";
      }
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(data)) {
        return "CSN40114";
      }
      if (new Date(data) > new Date(Utils.dateCurrent())) {
        return "CSN40117";
      }
      const date = new Date(data);
      const today = new Date();
      if (date.getMonth() !== today.getMonth() || date.getFullYear() !== today.getFullYear()) {
        return "CSN40118";
      }
    }
    return "";
  }
  private validateMetodoPago(mp: string | undefined, tipo_comprobante: `I` | `E` | `P` | `T` | "N"): string {
    if (["I", "E", "N"].includes(tipo_comprobante)) {
      if (mp === undefined) return "CSN40125";
      if (!["string"].includes(typeof mp)) return "CSN40126";
      if (mp === "") return "CSN40127";
      if (!["PPD", "PUE"].includes(mp)) return "CSN40128";
    }
    if (["P", "T"].includes(tipo_comprobante) && mp !== undefined) return "CSN40129";
    return "";
  }
  private validateFormaPago(data: string | number | undefined, tipo_comprobante: `I` | `E` | `P` | `T` | "N", mp: "PPD" | "PUE" | undefined): string {
    if (["I", "E"].includes(tipo_comprobante)) {
      if (data === undefined) {
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
    if (["P", "N", "T"].includes(tipo_comprobante) && data !== undefined) {
      return "CSN40119";
    }
    return "";
  }
}
export default ValidatorFacturaCfdi;
