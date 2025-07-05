# Clase CartaPorteMaritimo

Clase utilizada para la generación de la Carta Porte con medio de transporte marítimo, cumpliendo con los lineamientos del SAT en la versión 3.1 del complemento cartaporte.

Esta clase encapsula toda la lógica necesaria para generar nodos y atributos relacionados con el transporte por vía marítima.

## Inicialización

```ts{6}
import { CartaPorteMaritimo, ConfigCfdi } from "cfdi-sat-nodejs";

const configCfdi = new ConfigCfdi({...});
const cfdi = `<?xml version="1.0"?><cfdi:Comprobante...`

const cartaporte = new CartaPorteMaritimo(cfdi, configCfdi);
```

- **cfdi**: Contenido del xml u objeto json donde se integrará el complemento.

- **configCfdi**: Instancia previamente configurada de ConfigCfdi.

::: info 📝 NOTA
Si en lugar de generar el XML decides trabajar directamente con un objeto JSON, asegúrate de que dicho JSON conserve la estructura completa, incluyendo los prefijos de los nodos como `cfdi:` y los atributos con el prefijo `@_`.

Esta estructura es necesaria para que `cfdi-sat-nodejs` pueda validar, sellar o convertir correctamente el JSON a XML conforme a los estándares del SAT.
:::

---

## Métodos disponibles

Una vez instanciado, `CartaPorteMaritimo` permite utilizar métodos como:

- [createNodeMaritimo](/docs/v3.0/carta-porte-maritimo/createNodeMaritimo)
- [createNodeContenedor](/docs/v3.0/carta-porte-maritimo/createNodeContenedor)
