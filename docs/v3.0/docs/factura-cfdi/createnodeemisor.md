# createNodeEmisor

Este método agrega el nodo **`cfdi:Emisor`** al comprobante, con los **datos fiscales del contribuyente que emite el CFDI**.  
Es un nodo **obligatorio** y **solo debe declararse una vez por comprobante**.

USO POR INSTANCIA: 1

> 💡 Si llamas `createNodeEmisor()` más de una vez, se sobrescribirá el nodo anterior.

---

## Ejemplo de uso

```ts
factura.createNodeEmisor({
  rfc: "CAÑF770131PA3",
  nombre: "FERNANDO CASTILLO ÑABARRO",
  regimenFiscal: 612,
  FacAtrAdquirente: 12345,
});
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad        | Tipo              | Descripción                                                                                                                                     |
| ---------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| rfc              | string            | RFC del emisor del comprobante.                                                                                                                 |
| nombre           | string            | Nombre, denominación o razón social inscrito del emisor del comprobante.                                                                        |
| regimenFiscal    | `c_RegimenFiscal` | Clave vigente del regimen fiscal del emisor.                                                                                                    |
| FacAtrAdquirente | string - number   | (opcional) Número de operación proporcionado por el SAT cuando se trate de un comprobante a través del adquirente de los productos o servicios. |

::: tip Obligatorio
Este nodo debe definirse siempre, ya que representa al contribuyente emisor del comprobante.
:::

<!-- ## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#emisor">`Lista de errores:Emisor`</a> para tener la lista de errores que se puede generar.
 -->
