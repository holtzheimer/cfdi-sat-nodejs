# createNodeTotales

Este método genera el nodo `pago20:Totales`, el cual contiene el resumen global de los importes involucrados en todos los pagos registrados dentro del complemento. Es un nodo obligatorio cuando se generan detalles de pagos individuales mediante `createNodePago`.

Se utiliza para declarar de forma centralizada los montos totales pagados, así como los impuestos retenidos y trasladados asociados a todos los pagos.

USO POR INSTANCIA: 1

```ts
pago.createNodeTotales({
  montoTotalPagos: 100,
  totalRetencionesIva: 0,
  totalRetencionesIeps: 0,
  totalRetencionesIsr: 0,
  totalTrasladosBaseIva0: 0,
  totalTrasladosBaseIva16: 0,
  totalTrasladosBaseIva8: 0,
  totalTrasladosImpuestoIva0: 0,
  totalTrasladosImpuestoIva16: 0,
  totalTrasladosImpuestoIva8: 0,
  totalTrasladosBaseIvaExento: 0,
});
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad                   | Tipo            | Descripción                                                |
| --------------------------- | --------------- | ---------------------------------------------------------- |
| montoTotalPagos             | string - number | Monto total de todos los pagos realizados.                 |
| totalRetencionesIva         | string - number | (opcional) Total de IVA retenido en todos los pagos.       |
| totalRetencionesIeps        | string - number | (opcional) Total de IEPS retenido.                         |
| totalRetencionesIsr         | string - number | (opcional) Total de ISR retenido.                          |
| totalTrasladosBaseIva0      | string - number | (opcional) Base gravable acumulada con tasa 0% de IVA.     |
| totalTrasladosBaseIva8      | string - number | (opcional) Base gravable acumulada con tasa 8% de IVA.     |
| totalTrasladosBaseIva16     | string - number | (opcional) Base gravable acumulada con tasa 16% de IVA.    |
| totalTrasladosImpuestoIva0  | string - number | (opcional) Total del impuesto IVA trasladado con tasa 0%.  |
| totalTrasladosImpuestoIva8  | string - number | (opcional) Total del impuesto IVA trasladado con tasa 8%.  |
| totalTrasladosImpuestoIva16 | string - numbr  | (opcional) Total del impuesto IVA trasladado con tasa 16%. |
| totalTrasladosBaseIvaExento | string - number | (opcional) Base de operaciones exentas de IVA.             |
