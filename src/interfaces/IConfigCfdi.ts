export interface IConfigCfdi {
  cert_path: string;
  key_path: string;
  password: string;
}
export interface ICert {
  noCertificado: string;
  pem: string;
  validity: { notBefore: string; notAfter: string };
  issuer: string;
  subject: string;
  version: number;
}
