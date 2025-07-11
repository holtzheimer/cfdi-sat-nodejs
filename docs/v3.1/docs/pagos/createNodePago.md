# createNodePago

Este método crea un nodo `pago20:Pago`, que representa un pago individual realizado por el receptor del CFDI.

Dentro de este nodo se puede incluir la información relacionada al método de pago, moneda, cuentas bancarias, y los documentos CFDI que están siendo liquidados, ya sea total o parcialmente, incluyendo sus impuestos asociados.

Este nodo puede repetirse tantas veces como pagos se hayan realizado en fechas distintas.

USO POR INSTANCIA: 1 a ilimitados.

```ts
pago.createNodePago({
  pago: {...},
  doctoRelacionados: [...],
});
```

## Subpropiedad: pago

Define los detalles del pago recibido.

```ts
pago.createNodePago({
  pago: { // [!code focus]
    fechaPago: '2025-07-09T18:59:10', // [!code focus]
    formaDePagoP: "03", // [!code focus]
    monedaP: "MXN", // [!code focus]
    monto: 100, // [!code focus]
    tipoCambioP: 1, // [!code focus]
    numOperacion: "1111", // [!code focus]
    rfcEmisorCtaOrd: "XEXX010101000", // [!code focus]
    nomBancoOrdExt: "BANK OF TOKY", // [!code focus]
    ctaOrdenante: "123456789101112131", // [!code focus]
    rfcEmisorCtaBen: "MES420823153", // [!code focus]
    ctaBeneficiario: "123456789101114558", // [!code focus]
    tipoCadPago: "01", // [!code focus]
    certPago: "MIf3H30b...", // [!code focus]
    cadPago: "&#124;&#124;Pago&#124;Banco&#124;300.00&#124;&#124;", // [!code focus]
    selloPago: "Fi43nd...", // [!code focus]
  }, // [!code focus]
  doctoRelacionados: [...],
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad       | Tipo               | Descripción                                                                     |
| --------------- | ------------------ | ------------------------------------------------------------------------------- |
| fechaPago       | string             | Fecha y hora del pago en formato AAAA-MM-DDTHH:MM:ss                            |
| formaDePagoP    | `c_FormaPago`      | Clave SAT de la forma en que se realizó el pago.                                |
| monedaP         | `c_Moneda`         | Moneda del pago realizado.                                                      |
| monto           | string - number    | Monto total pagado.                                                             |
| tipoCambioP     | string - number    | (opcional) Tipo de cambio utilizado.                                            |
| numOperacion    | string             | (opcional) Número de operación o referencia bancaria.                           |
| rfcEmisorCtaOrd | string             | (opcional) RFC del banco ordenante.                                             |
| nomBancoOrdExt  | string             | (opcional) Nombre del banco extranjero.                                         |
| ctaOrdenante    | string             | (opcional) Número de cuenta del ordenante.                                      |
| rfcEmisorCtaBen | string             | (opcional) RFC del banco del beneficiario.                                      |
| ctaBeneficiario | string             | (opcional) Cuenta de destino.                                                   |
| tipoCadPago     | `c_TipoCadenaPago` | (opcional) Clave del tipo de cadena de pago.                                    |
| certPago        | string             | Requerido si `tipoCadPago` existe. Certificado digital del banco emisor.        |
| cadPago         | string             | Requerido si `tipoCadPago` existe. Cadena original del pago.                    |
| selloPago       | string             | Requerido si `tipoCadPago` existe. Sello digital del pago emitido por el banco. |

## Subpropiedad: doctoRelacionados

Cada pago puede liquidar uno o más documentos relacionados, como facturas previas. Esta sección permite declarar el UUID, parcialidad, montos y los impuestos correspondientes.

```ts
pago.createNodePago({
  pago: {...},
  doctoRelacionados: [// [!code focus]
    {// [!code focus]
      doctoRelacionado: {// [!code focus]
        idDocumento: "daca5d85-b8cd-463b-a056-b021fe33c2f9",// [!code focus]
        monedaDr: "MXN", // [!code focus]
        numParcialidad: "1", // [!code focus]
        impSaldoAnt: 100, // [!code focus]
        impPagado: 100, // [!code focus]
        impSaldoInsoluto: 0, // [!code focus]
        objetoImpDr: "02", // [!code focus]
        equivalenciaDr: 1, // [!code focus]
        serie: "CG", // [!code focus]
        folio: "324", // [!code focus]
      },// [!code focus]
      impuestos: {...},// [!code focus]
    },// [!code focus]
  ],// [!code focus]
});
```

### Objeto doctoRelacionado

#### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad        | Tipo            | Descripción                                                                                |
| ---------------- | --------------- | ------------------------------------------------------------------------------------------ |
| idDocumento      | string          | UUID del CFDI relacionado.                                                                 |
| monedaDr         | `c_Moneda`      | Moneda del CFDI relacionado.                                                               |
| numParcialidad   | string - number | Número de la parcialidad (ej. "1" para el primer pago).                                    |
| impSaldoAnt      | string - number | Importe del saldo anterior.                                                                |
| impPagado        | string - number | Importe pagado en este movimiento.                                                         |
| impSaldoInsoluto | string - number | Saldo restante después del pago.                                                           |
| objetoImpDr      | `c_ObjetoImp`   | Objeto de impuesto del pago.                                                               |
| equivalenciaDr   | string - number | Requerido si `monedaDr` es distinto a 'MXN'. Equivalencia cuando hay diferencia de moneda. |
| serie            | string          | (opcional) Serie del CFDI relacionado.                                                     |
| folio            | string          | (opcional) Folio del CFDI relacionado.                                                     |

### Objeto impuestos

```ts
pago.createNodePago({
    pago: {...},
    doctoRelacionados: [
      {
        doctoRelacionado: {...},
        impuestos: { // [!code focus]
          traslados: [// [!code focus]
            {// [!code focus]
              baseDr: 10,// [!code focus]
              impuestoDr: "002",// [!code focus]
              tipoFactorDr: "Tasa",// [!code focus]
              tasaOCuotaDr: 0.16,// [!code focus]
              importeDr: 1.6,// [!code focus]
            },// [!code focus]
          ],// [!code focus]
          retenciones: [// [!code focus]
            {// [!code focus]
              baseDr: 100,// [!code focus]
              impuestoDr: "001",// [!code focus]
              tipoFactorDr: "Tasa",// [!code focus]
              tasaOCuotaDr: 0.35,// [!code focus]
              importeDr: 35,// [!code focus]
            },// [!code focus]
          ],// [!code focus]
        },// [!code focus]
      },
    ],
  });
```

- **traslados**: Lista de impuestos trasladados.
- **retenciones**: Lista de impuestos retenidos.

#### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad    | Tipo            | Descripción                                          |
| ------------ | --------------- | ---------------------------------------------------- |
| baseDr       | string - number | Base gravable del impuesto.                          |
| impuestoDr   | `c_Impuesto`    | Clave del impuesto.                                  |
| tipoFactorDr | `c_TipoFactor`  | Tipo de factor. Para retenciones no existe `Exento`. |
| tasaOCuotaDr | string - number | (opcional) Tasa o cuota del impuesto.                |
| importeDr    | string - number | (opcional) Monto del impuesto.                       |
