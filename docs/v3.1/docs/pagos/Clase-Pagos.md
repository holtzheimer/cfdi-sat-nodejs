# Clase Pagos

La clase `Pago` permite generar el complemento **Recepción de Pagos versión 2.0**, conforme a los lineamientos técnicos establecidos por el SAT.

Este complemento debe incluirse en los CFDI de tipo `P` (Pago) cuando el cliente realiza pagos posteriores a la emisión del comprobante, es decir, bajo el método de pago PPD (Pago en Parcialidades o Diferido).
Su uso es obligatorio para reflejar correctamente los abonos, saldos y detalles de documentos relacionados.

## Inicialización

```ts{6}
import { Pago, ConfigCfdi } from "cfdi-sat-nodejs";

const configCfdi = new ConfigCfdi({...});
const cfdi = `<?xml version="1.0"?><cfdi:Comprobante...`

const pago = new Pago(cfdi, cfdi_config);
```

- **cfdi**: Contenido del XML u objeto JSON donde se integrará el complemento.

- **configCfdi**: Instancia previamente configurada de `ConfigCfdi`.

::: info 📝 NOTA
Si en lugar de generar el XML decides trabajar directamente con un objeto JSON, asegúrate de que dicho JSON conserve la estructura completa, incluyendo los prefijos de los nodos como `cfdi:` y los atributos con el prefijo `@_`.

Esta estructura es necesaria para que `cfdi-sat-nodejs` pueda validar, sellar o convertir correctamente el JSON a XML conforme a los estándares del SAT.
:::

## Métodos disponibles

Una vez instanciado, `Pago` permite utilizar métodos como:

- [createNodeTotales](./createNodeTotales.md)
- [createNodePago](./createNodePago.md)
