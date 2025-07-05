# Clase CartaPorteAutotransporte

La clase **CartaPorteAutotransporte** permite generar el complemento Carta Porte 3.1 específicamente para el medio de transporte terrestre por carretera (autotransporte federal).
Extiende la funcionalidad base de la carta porte y proporciona los métodos necesarios para definir elementos como remolques, vehículos, seguros y otras características propias del transporte terrestre.

## Inicialización

```ts
import { CartaPorteAutotransporte, ConfigCfdi } from "cfdi-sat-nodejs";

const configCfdi = new ConfigCfdi({...});
const cfdi = `<?xml version="1.0"?><cfdi:Comprobante...`
const cartaporte = new CartaPorteAutotransporte(cfdi, configCfdi);
```

- **cfdi**: Contenido del xml u objeto json donde se integrará el complemento.

- **configCfdi**: Instancia previamente configurada de ConfigCfdi.

::: info 📝 NOTA
Si en lugar de generar el XML decides trabajar directamente con un objeto JSON, asegúrate de que dicho JSON conserve la estructura completa, incluyendo los prefijos de los nodos como `cfdi:` y los atributos con el prefijo `@_`.

Esta estructura es necesaria para que `cfdi-sat-nodejs` pueda validar, sellar o convertir correctamente el JSON a XML conforme a los estándares del SAT.
:::

## ¿Cuándo debo usar esta clase?

Utiliza `CartaPorteAutotransporte` cuando el medio de transporte principal para el traslado de mercancías sea el **autotransporte federal**, regulado por la Secretaría de Infraestructura, Comunicaciones y Transportes (SICT).

Esto aplica a transportes con vehículos de carga como:

- Camiones de carga pesada

- Tractocamiones con remolques o semirremolques

- Unidades que requieren pólizas de seguro registradas ante la SICT

---

## Métodos disponibles

Una vez instanciado, `CartaPorteAutotransporte` permite utilizar métodos como:

- [createNodeAutotransporte](/docs/v3.0/carta-porte-autotransporte/createNodeAutotransporte)
- [createNodeIdentificacionVehicular](/docs/v3.0/carta-porte-autotransporte/createNodeIdentificacionVehicular)
- [createNodeRemolques](/docs/v3.0/carta-porte-autotransporte/createNodeRemolques)
