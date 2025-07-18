import { INodeComprobante } from "../interfaces/IFacturaCfdi";
import Validator from "./Validator";
import { errors_fecha, errors_tipo_comprobante } from "../utils/errors_factura_cfdi";
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
    const err_fecha_code = this.validateFecha(data.fecha);
    if (err_fecha_code !== "") {
      return this.setErrors(errors_fecha.find((i) => i.code === err_fecha_code)!);
    }
  }
  private validateTipoComprobante(tipo_comprobante: string | undefined): string {
    if (typeof tipo_comprobante !== "string") {
      return "CSN401210";
    }
    if (!tiposComprobante.includes(tipo_comprobante)) {
      return "CFDI40121";
    }
    return "";
  }
  private validateFecha(data: string | undefined): string {
    if (!data) {
      return "CSN401010";
    } else {
      if (typeof data !== "string") {
        return "CSN401011";
      }
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(data)) {
        return "CFDI40101";
      }
      if (new Date(data) > new Date(Utils.dateCurrent())) {
        return "CSN401012";
      }
      const fecha = new Date(data);
      const hoy = new Date();
      if (fecha.getMonth() !== hoy.getMonth() || fecha.getFullYear() !== hoy.getFullYear()) {
        return "CSN401013";
      }
    }
    return "";
  }
}
export default ValidatorFacturaCfdi;
