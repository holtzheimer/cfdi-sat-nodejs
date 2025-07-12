# jsonToXml

Convierte un objeto JSON con estructura válida en un XML.

Este método es útil cuando se trabaja con CFDI o complementos en formato JSON y se necesita generar el XML correspondiente, ya sea para emitir, validar o sellar un comprobante.

```ts
Utils.jsonToXml(json);
```

## Argumentos

| Argumento | Tipo   | Descripción                                                                                                           |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| json      | object | Objeto JSON que debe respetar la estructura completa del CFDI, incluyendo prefijos como `cfdi:` y atributos con `@_`. |

## Ejemplo de uso

```ts
const json = {
  "cfdi:Comprobante": {
    "@_Version": "4.0",
    "@_Fecha": "2025-07-04T12:00:00",
    // ... otros atributos y nodos
  },
};

const xml = Utils.jsonToXml(json);
```

::: warning ⚠️ ADVERTENCIA
Si el JSON no respeta estos requisitos, el XML generado podría ser inválido o incompleto.
:::
