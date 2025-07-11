# getKeyPem

El método `getKeyPem()` devuelve el contenido completo de la **llave privada** en formato PEM, incluyendo los encabezados y pie del bloque codificado.

Este valor es utilizado internamente por la biblioteca para generar los sellos digitales, pero también puede ser útil si necesitas trabajar directamente con la llave en otros procesos criptográficos.

## ¿Qué devuelve?

Una cadena de texto con la estructura típica de una clave privada encriptada, por ejemplo:

<pre>
"-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIF...contenido...de...la...clave...
-----END ENCRYPTED PRIVATE KEY-----"
</pre>

## Ejemplo de uso

```ts
import { ConfigCfdi } from "cfdi-sat-nodejs";

const configCfdi = new ConfigCfdi({...});

const keyPem = configCfdi.getKeyPem();

console.log(keyPem);
// Imprime la llave en formato PEM
```

::: warning ⚠️ ADVERTENCIA
Evita exponer este contenido públicamente o guardarlo en registros (logs), ya que contiene información sensible relacionada con la identidad del contribuyente.
:::
