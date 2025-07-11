# Clase `ConfigCfdi`

La clase `ConfigCfdi` permite crear una instancia de configuración necesaria para firmar los CFDI y leer información básica del certificado. Es fundamental para establecer las rutas de los archivos del certificado y la llave privada, así como la contraseña de la clave.

## ¿Para qué se utiliza?

Esta clase es el primer paso para habilitar la firma de comprobantes y el uso del sello digital, ya que:

- Lee y valida el contenido del archivo `.cer` (certificado).
- Desencripta la llave privada `.key` utilizando la contraseña proporcionada.
- Prepara internamente los datos para generar sellos digitales válidos.

## Parámetros requeridos

Al crear una nueva instancia, debes proporcionar lo siguiente:

- **`cerPath`**: Ruta absoluta del archivo `.cer`.
- **`keyPath`**: Ruta absoluta del archivo `.key`.
- **`password`**: Contraseña de la clave privada.

```ts
import { ConfigCfdi } from "cfdi-sat-nodejs";

const config = new ConfigCfdi({
  cerPath: "./certificados/certificado.cer",
  keyPath: "./certificados/llave.key",
  password: "12345678a",
});
```

::: tip
Se recomienda crear un archivo separado para definir la instancia de `ConfigCfdi` y exportarla desde ahí. Esto facilita su reutilización en otras partes del proyecto, ya que muchas clases dentro de la biblioteca requieren esta instancia para generar los XML o estructuras JSON.
:::
