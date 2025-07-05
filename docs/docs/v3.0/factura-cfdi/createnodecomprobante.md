# createNodeComprobante

Este método permite definir la información del nodo principal **`cfdi:Comprobante`**, el cual representa la raíz de todo CFDI y contiene los datos generales del comprobante fiscal: tipo, fecha, monto, lugar de expedición, entre otros.

USO POR INSTANCIA: 1

> 💡 Si llamas `createNodeComprobante()` más de una vez, se sobrescribirá el nodo anterior.

## Ejemplo de uso

```ts
factura.createNodeComprobante({
  tipoDeComprobante: "I",
  serie: "FAC",
  folio: "1",
  fecha: "2025-06-21T03:18:54",
  total: 199.94,
  subtotal: "200",
  lugarExpedicion: "64000",
  metodoPago: "PPD",
  formaPago: 99,
  moneda: "MXN",
  tipoCambio: "1",
  condicionesDePago: "Pago a 3 meses",
  descuento: 0,
  exportacion: "01",
});
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad         | Tipo            | Descripción                                                                                                                            |
| ----------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| tipoDeComprobante | `I` - `E` - `T` | (opcional) Define el tipo de CFDI para el contribuyente emisor, por defecto su valor es "I".                                           |
| serie             | string          | Serie del comprobante para control interno del emisor.                                                                                 |
| folio             | string          | Número del comprobante dentro de la serie. Es el número de folio de la factura.                                                        |
| fecha             | string          | Fecha y hora de emisión del CFDI bajo el formato: YYYY-MM-DDTHH:mm:ss                                                                  |
| total             | string - number | Importe total del comprobante. Incluye impuestos, descuentos, etc.                                                                     |
| subtotal          | string - number | Importe antes de aplicar impuestos o descuentos.                                                                                       |
| lugarExpedicion   | string - number | Código postal desde donde se emite el comprobante.                                                                                     |
| metodoPago        | `c_MetodoPago`  | Requerido cuando el tipo de comprobante es distinto a "T". Clave que corresponda si se paga en una sola exhibición o en parcialidades. |
| formaPago         | `c_FormaPago`   | Requerido cuando el tipo de comprobante es distinto a "T". Clave que indica cómo se pagaron los bienes o servicios.                    |
| moneda            | `c_Moneda`      | (opcional) Clave de la moneda usada, por defecto su valor es "MXN".                                                                    |
| tipoCambio        | string          | Obligatorio si la moneda es distinta de "MXN".                                                                                         |
| condicionesDePago | string          | (opcional) Condiciones comerciales aplicables para el pago del comprobante.                                                            |
| descuento         | string - number | (opcional) Importe total de los descuentos aplicables antes de impuestos.                                                              |
| exportacion       | `c_Exportacion` | (opcional) Clave con la que se identifica si el comprobante ampara una operación de exportación. su valor por defecto es "01".         |

::: warning CAMPOS OBLIGATORIOS

Asegúrate de incluir los campos requeridos por el SAT para el tipo de comprobante que estás generando. los campos no requeridos estan declarados como opcionales, dependiendo del tipo de comprobante que desee hacer, puede que algunos campos si sean obligatorios.

:::

## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#comprobante">`Lista de errores:Comprobante`</a> para tener la lista de errores que se puede generar.
