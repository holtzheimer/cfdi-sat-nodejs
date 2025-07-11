# createNodeConcepto

Este método agrega un nodo **`cfdi:Concepto`** al comprobante, representando un producto o servicio incluido en la factura.  
Cada concepto contiene información detallada como la descripción, clave del producto, unidad de medida, cantidad, importe y atributos relacionados con impuestos.

USO POR INSTANCIA: 1 a ilimitados.

```ts
factura.createNodeConcepto({
  concepto: {...},
  impuestos: {...},
  aCuentaTerceros: {...},
  informacionAduanera: [...],
  cuentaPredial: [...],
});
```

## Propiedad: concepto

Esta propiedad representa la información completa de un producto o servicio que será incluido en el comprobante como un nodo `cfdi:Concepto`.

Debe ser un objeto que contenga los datos fiscales y comerciales del concepto, como clave SAT, cantidad, unidad, precio, importe, impuestos, descuentos, entre otros.

Es un campo obligatorio al llamar createNodeConcepto().

```ts
factura.createNodeConcepto({
  concepto: {
    claveProdServ: 50211503,
    cantidad: 1,
    claveUnidad: "H87",
    unidad: "Pieza",
    descripcion: "Cigarros",
    valorUnitario: 200,
    importe: 200,
    objetoImp: "02",
    noIdentificacion: "123456789",
    descuento: 0,
  },
});
```

| Propiedad        | Tipo              | Descripción                                                                                                          |
| ---------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| claveProdServ    | `c_ClaveProdServ` | Clave que permita clasificar los conceptos del comprobante como productos o servicios.                               |
| cantidad         | string - number   | Cantidad de bienes o servicios que correspondan al concepto.                                                         |
| claveUnidad      | `c_ClaveUnidad`   | Clave unidad del producto o servicio.                                                                                |
| unidad           | string            | Nombre de la unidad de medida correspondiente a la claveUnidad.                                                      |
| descripcion      | string            | Descripción del producto o servicio a facturar.                                                                      |
| valorUnitario    | string - number   | Valor o precio unitario del producto o servicio.                                                                     |
| importe          | string - number   | Importe total de producto o servicio, resultado de la multiplicación de la cantidad por el valorUnitario.            |
| objetoImp        | `c_ObjectoImp`    | Clave correspondiente para indicar si la operación es objeto o no de impuesto.                                       |
| noIdentificacion | string            | (opcional) Identificador del producto o servicio, puede ser el código de barras, SKU o cualquier otro identificador. |
| descuento        | string - number   | (opcional) Valor a aplicar al importe. debe contener la misma cantidad de decimales que el importe.                  |

### ¿Para qué se utiliza?

Cada objeto concepto será transformado en un nodo XML individual que representa un ítem de la factura. Si el comprobante tiene múltiples productos o servicios, se deben pasar múltiples objetos concepto llamando al método varias veces.

## Propiedad: impuestos

La propiedad impuestos dentro del objeto concepto permite definir los impuestos aplicables a cada producto o servicio facturado. Este campo se utiliza para desglosar los impuestos trasladados (como el IVA) o retenidos (como ISR o IVA retenido), según lo establecido en las reglas del SAT.

```ts
factura.createNodeConcepto({
  concepto: {...},
  impuestos: { // [!code focus]
    traslados: [...], // [!code focus]
    retenciones: [...] // [!code focus]
  }, // [!code focus]
});
```

Cada concepto puede tener sus propios impuestos, los cuales se detallan dentro de esta propiedad. Es fundamental que coincidan con el valor de la propiedad objetoImp, ya que si el concepto no está sujeto a impuestos, esta propiedad debe omitirse.

A continuación, documentamos la subpropiedad traslados, que representa los impuestos trasladados al cliente, como el IVA.

### Subpropiedad: traslados

La subpropiedad traslados permite especificar los impuestos trasladados al cliente dentro del concepto, como el IVA. Es un arreglo de objetos, ya que un mismo concepto puede incluir uno o más impuestos.

Cada objeto dentro del arreglo define un impuesto con su base, tipo, tasa o cuota, y el importe calculado.

```ts
factura.createNodeConcepto({
  concepto: {...},
  impuestos: {
    traslados: [ // [!code focus]
      { // [!code focus]
        base: 1, // [!code focus]
        impuesto: "002", // [!code focus]
        tipoFactor: "Tasa", // [!code focus]
        tasaOCuota: 0.16, // [!code focus]
        importe: 0.16, // [!code focus]
      }, // [!code focus]
    ], // [!code focus]
  },
});
```

#### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad  | Tipo            | Descripción                                                                                                    |
| ---------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| base       | string - number | Valor para el cálculo del impuesto que se traslada.                                                            |
| impuesto   | `c_Impuesto`    | Clave del tipo de impuesto aplicable.                                                                          |
| tipoFactor | `c_TipoFactor`  | Tipo de factor que se aplica a la base del impuesto.                                                           |
| tasaOCuota | string - number | Requerido si el tipoFactor es distinto a "Exento". Valor de la tasa o cuota del impuesto.                      |
| importe    | string - number | Requerido si el tipoFactor es distinto a "Exento". Importe del impuesto trasladado que aplica a cada concepto. |

### Subpropiedad: retenciones

La subpropiedad retenciones permite declarar los impuestos retenidos aplicables al concepto, como **ISR** o **IVA retenido**.
Al igual que traslados, se define como un arreglo de objetos, ya que pueden existir múltiples retenciones por concepto.

Estas retenciones deben reflejarse de forma correcta para cumplir con los requisitos del SAT y afectar correctamente los totales del CFDI.

```ts
factura.createNodeConcepto({
  concepto: {...},
  impuestos: {
    // [!code focus]
    retenciones: [
      // [!code focus]
      {
        // [!code focus]
        base: 1, // [!code focus]
        impuesto: "002", // [!code focus]
        tipoFactor: "Tasa", // [!code focus]
        tasaOCuota: 0.16, // [!code focus]
        importe: 0.16, // [!code focus]
      }, // [!code focus]
    ], // [!code focus]
  }, // [!code focus]
});
```

#### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad  | Tipo            | Descripción                                                 |
| ---------- | --------------- | ----------------------------------------------------------- |
| base       | string - number | Valor para el cálculo del impuesto que se retiene.          |
| impuesto   | `c_Impuesto`    | Clave del tipo de impuesto aplicable.                       |
| tipoFactor | `c_TipoFactor`  | Tipo de factor que se aplica a la base del impuesto.        |
| tasaOCuota | string - number | Valor de la tasa o cuota del impuesto.                      |
| importe    | string - number | Importe del impuesto trasladado que aplica a cada concepto. |

## Propiedad: aCuentaTerceros

La propiedad aCuentaTerceros permite declarar que el concepto se factura a nombre y por cuenta de un tercero, en sustitución del antiguo complemento PorCuentaDeTerceros del CFDI 3.3.
Con el estándar CFDI 4.0, el SAT eliminó ese complemento y lo reemplazó con el elemento `<ACuentaTerceros>` directamente dentro del nodo `cfdi:Concepto`.

Este nodo es útil cuando, por ejemplo, un comisionista, agente de cobranza o representante legal realiza operaciones en nombre de otra entidad.

```ts
factura.createNodeConcepto({
  concepto: {...},
  // [!code focus]
  aCuentaTerceros: {
    rfcACuentaTerceros: "FIMA420127R44", // [!code focus]
    nombreACuentaTerceros: "MARTON ALEJANDRO SANZI FIERROR", // [!code focus]
    regimenFiscalACuentaTerceros: 606, // [!code focus]
    domicilioFiscalACuentaTerceros: 64000, // [!code focus]
  }, // [!code focus]
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad                      | Tipo              | Descripción                                                    |
| ------------------------------ | ----------------- | -------------------------------------------------------------- |
| rfcACuentaTerceros             | string            | RFC del contribuyente Tercero.                                 |
| nombreACuentaTerceros          | string            | Nombre, denominación o razón social del contribuyente Tercero. |
| regimenFiscalACuentaTerceros   | `c_RegimenFiscal` | Clave del régimen del contribuyente Tercero.                   |
| domicilioFiscalACuentaTerceros | string - number   | Código postal del domicilio fiscal del Tercero.                |

## Propiedad: informacionAduanera

La propiedad informacionAduanera permite declarar los **datos del pedimento aduanal** correspondiente a mercancías importadas.
Este nodo **debe incluirse cuando el producto o servicio facturado proviene del comercio exterior**, es decir, cuando fue importado legalmente al país.

Cada entrada en el arreglo representa un pedimento aduanal válido, registrado ante la autoridad aduanera.

```ts
fac.createNodeConcepto({
  concepto: {...},
  // [!code focus]
  informacionAduanera: [
    // [!code focus]
    {
      // [!code focus]
      numeroPedimento: "12345678", // [!code focus]
    }, // [!code focus]
  ], // [!code focus]
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad       | Tipo   | Descripción                                                  |
| --------------- | ------ | ------------------------------------------------------------ |
| numeroPedimento | string | Número del pedimento que ampara la importación del producto. |

## Propiedad: cuentaPredial

La propiedad cuentaPredial se utiliza cuando el concepto facturado está relacionado con **el uso, goce o arrendamiento de un inmueble**, y dicho inmueble cuenta con un número de cuenta predial registrado ante una entidad catastral.

Este dato permite identificar el bien inmueble con precisión y es requerido por el SAT en operaciones que involucren propiedad raíz.

```ts
factura.createNodeConcepto({
  concepto: {...},
  // [!code focus]
  cuentaPredial: [
    // [!code focus]
    {
      // [!code focus]
      numero: "aB3cD4eF5gH6iJ7kL8mN9oP0", // [!code focus]
    }, // [!code focus]
  ], // [!code focus]
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad | Tipo   | Descripción                               |
| --------- | ------ | ----------------------------------------- |
| numero    | string | Número de la cuenta predial del inmueble. |

::: tip ℹ️ ¿Cuándo debe usarse?

Este nodo es obligatorio cuando se emite un CFDI por:

Arrendamiento de inmuebles

Uso temporal de terrenos, locales o propiedades

Cualquier servicio vinculado a un bien inmueble registrado

:::

## Propiedad: complementoConcepto

La propiedad complementoConcepto permite **incluir complementos específicos** directamente dentro de un concepto.
Estos complementos son estructuras XML adicionales definidas por el SAT para ciertos sectores o actividades (por ejemplo: educación, arrendamiento, donativos, notarios, etc.).

Se utiliza cuando un producto o servicio requiere **información adicional normativa** según su giro o sector regulado.

```ts
factura.createNodeConcepto({
  concepto: {...},
  complementoConcepto: [ // [!code focus]
    { // [!code focus]
      node: "iedu:instEducativas", // [!code focus]
      attributes: { // [!code focus]
        "xmlns:iedu": "http://www.sat.gob.mx/iedu", // [!code focus]
        rfcPago: "CACX7605101P8", // [!code focus]
      }, // [!code focus]
    }, // [!code focus]
  ], // [!code focus]
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad  | Tipo   | Descripción                                                               |
| ---------- | ------ | ------------------------------------------------------------------------- |
| node       | string | Nombre del nodo del complemento con prefijo.                              |
| attributes | object | Atributos del nodo. Se definen como un objeto plano con claves y valores. |

::: tip Complementos comunes por concepto

Algunos de los complementos que pueden usarse en conceptos incluyen:

**iedu:instEducativas** – Instituciones educativas privadas

**donat:Donatarias** – Donatarias autorizadas

**notarios:NotariosPublicos** – Operaciones ante notarios

**valesdedespensa:ValesDeDespensa** – Vales entregados por la empresa

:::

## Propiedad: parte

La propiedad parte permite desglosar un concepto en **subcomponentes o productos individuales** que lo integran.
Es útil cuando un concepto general (como un paquete, kit o servicio compuesto) está formado por varios productos o servicios más pequeños, los cuales se desean **describir individualmente sin facturarlos por separado**.

Cada elemento dentro del arreglo **representa una parte que conforma el concepto principal**, y puede incluir también información aduanera si aplica.

```ts
factura.createNodeConcepto({
  concepto: {...},
  parte: [ // [!code focus]
    { // [!code focus]
      concepto: { // [!code focus]
        cantidad: "2", // [!code focus]
        claveProdServ: "10101501", // [!code focus]
        descripcion: "Parte de prueba", // [!code focus]
        unidad: "MTR", // [!code focus]
        noIdentificacion: "P-12345", // [!code focus]
        valorUnitario: "50.00", // [!code focus]
        importe: "100.00", // [!code focus]
      }, // [!code focus]
      informacionAduanera: [ // [!code focus]
        { // [!code focus]
          numeroPedimento: "12345678", // [!code focus]
        }, // [!code focus]
      ], // [!code focus]
    }, // [!code focus]
  ], // [!code focus]
});
```

### Subpropiedad: concepto

El objeto concepto dentro de una parte describe el producto o servicio específico que forma parte del concepto principal.

```ts
factura.createNodeConcepto({
  concepto: {...},
  parte: [
    {
      concepto: { // [!code focus]
        cantidad: "2", // [!code focus]
        claveProdServ: "10101501", // [!code focus]
        descripcion: "Parte de prueba", // [!code focus]
        unidad: "MTR", // [!code focus]
        noIdentificacion: "P-12345", // [!code focus]
        valorUnitario: "50.00", // [!code focus]
        importe: "100.00", // [!code focus]
      }, // [!code focus]
      informacionAduanera: [
        {
          numeroPedimento: "12345678",
        },
      ],
    },
  ],
});
```

| Propiedad        | Tipo              | Descripción                                               |
| ---------------- | ----------------- | --------------------------------------------------------- |
| cantidad         | string - number   | Cantidad de unidades de la parte.                         |
| claveProdServ    | `c_ClaveProdServ` | Clave del producto o servicio según el catálogo del SAT.  |
| descripcion      | string            | Descripción detallada del componente.                     |
| unidad           | string            | Unidad de medida.                                         |
| noIdentificacion | string            | (opcional) Número de identificación interna del producto. |
| valorUnitario    | string - number   | Precio unitario (sin impuestos ni descuentos).            |
| importe          | string - number   | Importe total del componente.                             |

### Subpropiedad: informacionAduanera

Este campo es opcional y permite indicar si la parte fue importada, incluyendo el número de pedimento aduanal correspondiente.

```ts
factura.createNodeConcepto({
  concepto: {...},
  parte: [
    {
      concepto: {
        cantidad: "2",
        claveProdServ: "10101501",
        descripcion: "Parte de prueba",
        unidad: "MTR",
        noIdentificacion: "P-12345",
        valorUnitario: "50.00",
        importe: "100.00",
      },
      informacionAduanera: [ // [!code focus]
        { // [!code focus]
          numeroPedimento: "12345678", // [!code focus]
        }, // [!code focus]
      ], // [!code focus]
    },
  ],
});
```

| Propiedad       | Tipo   | Descripción                                                          |
| --------------- | ------ | -------------------------------------------------------------------- |
| numeroPedimento | string | Número de pedimento aduanal válido conforme a la estructura del SAT. |

<!-- ## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#concepto">`Lista de errores:Concepto`</a> para tener la lista de errores que se puede generar. -->
