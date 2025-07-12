# xmlToJson

Convierte una estructura XML en un objeto JSON.

Este método es útil para leer, inspeccionar o transformar comprobantes fiscales digitales (CFDI) desde su formato original en XML a una estructura manipulable por JavaScript.

```ts
Utils.xmlToJson(xml, simplified?);
```

## Argumentos

| Argumento  | Tipo    | Descripción                                                                                                                                                                          |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| xml        | string  | El contenido XML que se desea convertir. Puede provenir de un archivo .xml o de un string generado con `FacturaCfdi`.                                                                |
| simplified | boolean | (Opcional) Si es `true`, devuelve un JSON más limpio y legible, eliminando prefijos como `cfdi:` y atributos con `@_`. Si se omite o es `false`, se conserva la estructura completa. |

## Ejemplo de uso

```ts
const xml = fs.readFileSync("cfdi.xml", "utf8");
// Versión completa
const jsonFull = Utils.xmlToJson(xml);
// Versión simplificada
const jsonSimple = Utils.xmlToJson(xml, true);
```

## Diferencias entre versión completa y simplificada

- **Completa**: Respeta todos los prefijos XML como `cfdi:` y atributos como `@_`, útil para validación, debugging o cuando se necesita fidelidad exacta con el XML.
- **Simplificada**: Limpia los prefijos y atributos complejos, haciendo el JSON más accesible y legible para desarrolladores. Ideal para inspección visual o procesamiento liviano.

::: info CONSIDERACIÓN
Este método no valida el CFDI, solo transforma su estructura.
:::
