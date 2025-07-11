# createNodeRelacionados

Este método agrega el nodo **`cfdi:CfdiRelacionados`** al comprobante, el cual permite relacionar el CFDI actual con uno o más CFDI anteriores.

Es comúnmente utilizado en situaciones como:

- **Notas de crédito**
- **Devoluciones**
- **Sustitución de CFDI**
- **Facturación de anticipos**

---

USO POR INSTANCIA: 0 a ilimitados

## Ejemplo de uso

```ts
factura.createNodeRelacionados({
  tipoRelacion: "01",
  uuids: ["12345678-1234-1234-1234-123456789012", "23456789-2345-2345-2345-234567890123"],
});
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad    | Tipo             | Descripción                              |
| ------------ | ---------------- | ---------------------------------------- |
| tipoRelacion | `c_TipoRelacion` | Tipo de relación con otros CFDI.         |
| uuids        | string[]         | Lista de UUIDs de los CFDI relacionados. |

::: tip Consideraciones

Es posible relacionar múltiples CFDI en una sola llamada, pasando un arreglo con todos los UUID.

Si no necesitas relacionar este CFDI con alguno previo, puedes omitir este método.
:::

<!-- ## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#cfdi-relacionados">`Lista de errores:CfdiRelacionados`</a> para tener la lista de errores que se puede generar. -->
