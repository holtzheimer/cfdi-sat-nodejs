# getCert

El método `getCert()` permite obtener información detallada del certificado `.cer` que fue cargado mediante la instancia de `ConfigCfdi`.

Aunque esta información es utilizada internamente por la biblioteca (por ejemplo, para generar el sello o incluir el número de certificado en el XML), también puedes acceder a ella directamente si necesitas validarla o mostrarla.

## ¿Qué información devuelve?

Este método retorna un objeto con datos clave del certificado, incluyendo:

- **`noCertificado`**: Número de certificado asignado por el SAT.
- **`pem`**: Certificado en formato codificado PEM.
- **`validity`**: Periodo de validez, compuesto por:
  - `notBefore`: Fecha de inicio de vigencia.
  - `notAfter`: Fecha de expiración.
- **`issuer`**: Datos del emisor del certificado.
- **`subject`**: Información del titular del certificado.
- **`version`**: Versión del certificado.

## Ejemplo de uso

```ts
import { ConfigCfdi } from "cfdi-sat-nodejs";

const configCfdi = new ConfigCfdi({...});

const certData = configCfdi.getCert();

console.log(certData.noCertificado); // Ejemplo: '30001000000400002434'
console.log(certData.validity.notBefore); // Fecha de inicio de vigencia, 2023-05-09T18:06:34.000Z
console.log(certData.validity.notAfter); // Fecha de expiración, 2027-05-08T18:06:34.000Z
```
