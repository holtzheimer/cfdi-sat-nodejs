# Clase CartaPorteAereo

Clase utilizada para generar el complemento Carta Porte cuando el medio de transporte es aéreo. Esta clase encapsula la lógica necesaria para construir nodos específicos requeridos por el SAT en traslados por vía aérea.

Esta implementación cumple con los lineamientos del complemento Carta Porte versión 3.1.

## Inicialización

```ts{6}
import { CartaPorteAereo, ConfigCfdi } from "cfdi-sat-nodejs";

const configCfdi = new ConfigCfdi({...});
const cfdi = `<?xml version="1.0"?><cfdi:Comprobante...`

const cartaporte = new CartaPorteAereo(cfdi, configCfdi);
```

- **cfdi**: Contenido del xml u objeto json donde se integrará el complemento.

- **configCfdi**: Instancia previamente configurada de ConfigCfdi.

::: info 📝 NOTA
Si en lugar de generar el XML decides trabajar directamente con un objeto JSON, asegúrate de que dicho JSON conserve la estructura completa, incluyendo los prefijos de los nodos como `cfdi:` y los atributos con el prefijo `@_`.

Esta estructura es necesaria para que `cfdi-sat-nodejs` pueda validar, sellar o convertir correctamente el JSON a XML conforme a los estándares del SAT.
:::

---

## Métodos disponibles

Una vez instanciado, `CartaPorteAereo` permite utilizar métodos como:

- [createNodeAereo](./createNodeAereo.md)
