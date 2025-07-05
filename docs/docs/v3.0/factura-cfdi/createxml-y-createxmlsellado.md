# createXml y createXmlSellado

Los siguientes métodos permiten obtener el comprobante fiscal digital (CFDI) en formato XML, ya sea sin sellar o con el sello digital aplicado.
Esto resulta útil si deseas visualizar el XML antes de sellarlo, validar la estructura, o enviar el CFDI al PAC.

## Método: createXml

Genera el XML sin sello digital, pero con toda la estructura completa del CFDI.

Este XML puede usarse para propósitos de revisión, previsualización o pruebas internas, pero no es válido fiscalmente hasta que se aplique el sello con el certificado correspondiente.

```ts
const xml = factura.createXml();
```

## Método: createXmlSellado

Genera el XML con el sello digital aplicado, utilizando la instancia de configuración (`ConfigCfdi`) previamente creada con tu CSD (**.cer** y **.key**).

Este XML ya está listo para ser timbrado por un PAC autorizado.

```ts
const xmlSellado = await factura.createXmlSellado();
```

::: tip ❔ ¿Cuál usar?

Usa `createXml()` si solo quieres revisar la estructura del CFDI sin firmarlo.

Usa `createXmlSellado()` cuando ya estés listo para enviarlo al PAC o almacenar el CFDI final.

:::
