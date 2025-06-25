import { INodeAutotransporte, INodeIdenVehicular, INodeRemolques, INodeSeguros } from "../interfaces/ICartaPorte";
import CartaPorte from "./CartaPorte";

class CartaPorteAutotransporte extends CartaPorte {
  constructor(cfdi: string | object) {
    super(cfdi);
  }
  public createNodeAutotransporte(data: INodeAutotransporte) {
    this.setNodeAutotransporteData(data);
  }
  public createNodeIdentificacionVehicular(data: INodeIdenVehicular) {
    this.setNodeAutotransporteIdenVehicular(data);
  }
  public createNodeSeguros(data: INodeSeguros) {
    this.setNodeAutotransporteSeguros(data);
  }
  public createNodeRemolques(data: INodeRemolques) {
    this.setNodeAutotransporteRemolques(data);
  }
}
export default CartaPorteAutotransporte;
