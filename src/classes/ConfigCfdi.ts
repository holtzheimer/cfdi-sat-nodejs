import { ICert, IConfigCfdi } from "../interfaces/IConfigCfdi";
import fs from "fs";
import forge from "node-forge";
import crypto from "crypto";

class ConfigCfdi {
  private readonly password: string;
  private cert: ICert = {
    noCertificado: "",
    pem: "",
    validity: { notAfter: "", notBefore: "" },
    version: 0,
    issuer: "",
    subject: "",
  };
  private key_pem: string = "";
  constructor(options: IConfigCfdi) {
    this.password = options.password;
    this.readCert(options.cert_path);
    this.readKey(options.key_path);
  }
  private readCert(path: string): void {
    try {
      const file = fs.readFileSync(path);
      const certAsn1 = forge.asn1.fromDer(file.toString("binary"));
      const cert: forge.pki.Certificate = forge.pki.certificateFromAsn1(certAsn1);

      if (!cert) {
        throw new Error("Certificate not found or invalid format");
      }
      this.cert = {
        noCertificado: (cert.serialNumber as any)
          .match(/.{1,2}/g)
          .map(function (v: any) {
            return String.fromCharCode(parseInt(v, 16));
          })
          .join(""),
        pem: forge.pki.certificateToPem(cert),
        validity: {
          notAfter: cert.validity.notAfter.toString(),
          notBefore: cert.validity.notBefore.toString(),
        },
        version: cert.version,
        issuer: cert.issuer.attributes.map((attr) => `${attr.shortName ?? attr.name}=${attr.value}`).join(", "),
        subject: cert.subject.attributes.map((attr) => `${attr.shortName ?? attr.name ?? attr.type}=${attr.value}`).join(", "),
      };
    } catch (error) {
      throw new Error(`Error reading certificate: ${error}`);
    }
  }
  private readKey(path: string): void {
    try {
      const file = fs.readFileSync(path);
      const pem = crypto.createPrivateKey({
        key: file,
        format: "der",
        type: "pkcs8",
        passphrase: this.password,
      });
      const pemString = pem.export({ format: "pem", type: "pkcs8" });
      this.key_pem = pemString as string;
    } catch (error) {
      throw new Error(`Error reading key: ${error}`);
    }
  }
  public getCert(): ICert {
    return this.cert;
  }
  public getKeyPem(): string {
    return this.key_pem;
  }
}
export default ConfigCfdi;
