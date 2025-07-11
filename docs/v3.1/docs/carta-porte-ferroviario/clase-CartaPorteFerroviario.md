# Clase CartaPorteFerroviario

Clase utilizada para generar el complemento Carta Porte cuando el medio de transporte es **ferroviario**. Esta clase se encarga de construir todos los nodos específicos requeridos por el SAT en traslados por ferrocarril conforme a la versión 3.1 del complemento cartaporte.

## Inicialización

```ts{6}
import { CartaPorteFerroviario, ConfigCfdi } from "cfdi-sat-nodejs";

const configCfdi = new ConfigCfdi({...});
const cfdi = `<?xml version="1.0"?><cfdi:Comprobante...`

const cartaporte = new CartaPorteFerroviario(cfdi, configCfdi);
```

- **cfdi**: Contenido del xml u objeto json donde se integrará el complemento.

- **configCfdi**: Instancia previamente configurada de ConfigCfdi.

::: info 📝 NOTA
Si en lugar de generar el XML decides trabajar directamente con un objeto JSON, asegúrate de que dicho JSON conserve la estructura completa, incluyendo los prefijos de los nodos como `cfdi:` y los atributos con el prefijo `@_`.

Esta estructura es necesaria para que `cfdi-sat-nodejs` pueda validar, sellar o convertir correctamente el JSON a XML conforme a los estándares del SAT.
:::

---

## Métodos disponibles

Una vez instanciado, `CartaPorteFerroviario` permite utilizar métodos como:

- [createNodeFerroviario](./createNodeFerroviario.md)
- [createNodeDerechoDePaso](./createNodeDerechoDePaso.md)
- [createNodeCarro](./createNodeCarro.md)
