import resolveInclusions from "./resolveInclusions";
import SaxonJS from "saxon-js";
import crypto from "crypto";
import ConfigCfdi from "../classes/ConfigCfdi";

const generateCadenaOriginal = async (xml: string, config_cfdi: ConfigCfdi): Promise<string> => {
  try {
    const cadenaOriginalXslt = await resolveInclusions();

    let result = SaxonJS.XPath.evaluate(
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
          xml: xml,
          xslt: cadenaOriginalXslt,
        },
      }
    );
    const sign = crypto.createSign("SHA256");
    sign.update(result);
    sign.end();
    const signature = sign.sign(config_cfdi.getKeyPem(), "base64");
    return signature;
  } catch (error) {
    throw new Error(`Error generating Cadena Original: ${error}`);
  }
};
export default generateCadenaOriginal;
