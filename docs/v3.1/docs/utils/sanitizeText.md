# sanitizeText

Este método limpia una cadena de texto eliminando:

- Tildes y acentos (á, é, í, ó, ú, ñ, etc.).
- Caracteres no válidos que puedan provocar errores en la validación o timbrado del CFDI.

Es especialmente útil cuando estás generando comprobantes a partir de datos externos o proporcionados por usuarios y necesitas asegurar compatibilidad con el esquema del SAT.

```ts
const text = Utils.sanitizeText(text);
```

## Argumentos

| Argumento | Tipo   | Descripción                |
| --------- | ------ | -------------------------- |
| text      | string | Cadena de texto a limpiar. |

## Ejemplo de uso

```ts
const original = "José Ñáñez, México D.F.";
const texto = Utils.sanitizeText(original);
console.log(texto);
// Resultado: "Jose Nanez, Mexico D.F."
```

## Consideraciones

- No transforma el texto a mayúsculas ni elimina espacios entre palabras.
- Elimina únicamente caracteres que puedan causar rechazo en la validación de un CFDI.
- No debe usarse si necesitas conservar los acentos por motivos legales o comerciales, salvo que el SAT lo requiera.
