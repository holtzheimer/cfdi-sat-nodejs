# createXmlSellado

El siguiente método permite obtener el comprobante fiscal digital (CFDI) junto el complemento pago 2.0 en formato XML sellado.

Este XML ya está listo para ser timbrado por un PAC autorizado.

```ts
const pagoSellado = await pago.createXmlSellado();
```
