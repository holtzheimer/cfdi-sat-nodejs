# createNodeInformacionGlobal

Este método permite agregar el nodo opcional **`cfdi:InformacionGlobal`**, requerido únicamente en casos donde el CFDI forma parte de una factura global, como suele ocurrir con ventas al público en general o en operaciones periódicas.

Debe usarse **solo una vez si aplica** según el contexto fiscal de la operación.

---

## Ejemplo de uso

```ts
factura.createNodeInformacionGlobal({
  periodicidad: "01",
  meses: "02",
  anio: 2025,
});
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad    | Tipo            | Descripción                                             |
| ------------ | --------------- | ------------------------------------------------------- |
| periodicidad | `01` al `05`    | Tipo de periodo que abarca el comprobante.              |
| meses        | `01` al `18`    | Mes o meses que abarca los movimientos del comprobante. |
| anio         | string - number | Año que abarca los movimientos del comprobante.         |

<!-- ## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#informacion-global">`Lista de errores:InformacionGlobal`</a> para tener la lista de errores que se puede generar.
 -->
