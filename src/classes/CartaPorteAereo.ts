import { INodeAereo } from "../interfaces/ICartaPorte";
import CartaPorte from "./CartaPorte";
import ConfigCfdi from "./ConfigCfdi";

class CartaPorteAereo extends CartaPorte {
  constructor(cfdi: string | object, config_cfdi: ConfigCfdi) {
    super(cfdi, config_cfdi, "AV");
  }
  public createNodeAereo(data: INodeAereo) {
    this.setNodeTransporteAereo(data);
  }
}
export default CartaPorteAereo;
