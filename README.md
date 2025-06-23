# PAQUETE CFDI SAT PARA NODEJS

### Herramienta para generar y manejar CFDI 4.0. Incluye utilidades para trabajar con certificados digitales, generar XML o JSON sellados y sin sellar, consultar catálogos del SAT eficientemente, convertir XML a JSON y más. Ideal para desarrolladores que necesitan generar facturas electrónicas válidas para el SAT.

### Tabla de contenido

- [Instalación](#Instalación)
- [Importación](#Importación)
- [Clase ConfigCfdi](#Clase-ConfigCfdi)
  - [Método getCert](#Método-getCert)
  - [Método getKeyPem](#Método-getKeyPem)
- [Clase FacturaCfdi](#Clase-FacturaCfdi)
  - [Método createNodeComprobante](#Método-createNodeComprobante)
  - [Método createNodeInformacionGlobal](#Método-createNodeInformacionGlobal)
  - [Método createNodeRelacionados](#Método-createNodeRelacionados)
  - [Método createNodeEmisor](#Método-createNodeEmisor)
  - [Método createNodeReceptor](#Método-createNodeReceptor)
  - [Método createNodeConcepto](#Método-createNodeConcepto)
  - [Método createNodeAddenda](#Método-createNodeAddenda)
- [XML de tipo Egreso](#XML-de-tipo-Egreso)
  - [Nota de crédito](#Nota-de-crédito)
  - [Devolución](#Devolución)
- [XML de tipo Traslado](#XML-de-tipo-Traslado)
- [Carta Porte](#Carta-porte)
  - [Creando un nuevo complemento Carta Porte](#Creando-un-nuevo-complemento-Carta-Porte)
  - [Método crearRegimenesAduaneros](#Método-crearRegimenesAduaneros)
  - [Método crearUbicacionOrigen](#Método-crearUbicacionOrigen)
  - [Método crearUbicacionDestino](#Método-crearUbicacionDestino)
  - [Método crearMercancias](#Método-crearMercancias)
  - [Método crearMercancia](#Método-crearMercancia)
  - [Método crearDocumentacionAduanera](#Método-crearDocumentacionAduanera)
  - [Método crearCantidadTransporta](#Método-crearCantidadTransporta)
  - [Método crearAutotransporte](#Método-crearAutotransporte)
  - [Método crearIdentificacionVehicular](#Método-crearIdentificacionVehicular)
  - [Método crearSeguros](#Método-crearSeguros)
  - [Método crearRemolques](#Método-crearRemolques)
  - [Método crearTipoFigura](#Método-crearTipoFigura)
  - [Método crearPartesTransporte](#Método-crearPartesTransporte)
  - [Método crearDomicilioTipoFigura](#Método-crearDomicilioTipoFigura)
  - [Método crearSello](#Método-crearSello)
  - [Método generarCartaPorte](#Método-generarCartaPorte)
- [Catálogos](#Catálogos)

### **Instalación**

Puede instalar mediante NPM

```bash
npm install --save cfdi-sat-nodejs
```

### **Importación**

Para empezar a usar cfdi-sat-nodejs primero importa la clase ConfigCfdi

```javascript
const { ConfigCfdi } = require("cfdi-sat-nodejs"); // Si usas CommonJS
import { ConfigCfdi } from "cfdi-sat-nodejs"; // si usas ESM

const config = new ConfigCfdi();
```

### **Clase ConfigCfdi**

La clase ConfigCfdi permite configurar las rutas de tu certificado digital, la clave privada y la contraseña proporcionados por el SAT para generar sellos digitales necesarios para firmar el comprobante.

```javascript
const configCfdi = new ConfigCfdi({
  cerPath: "/ruta/al/archivo.cer",
  keyPath: "/ruta/al/archivo.key",
  password: "contraseña_del_key",
});
```

`ConfigCfdi` recibe un objeto con propiedades:

| Propiedad | Tipo   | Descripción                                         |
| --------- | ------ | --------------------------------------------------- |
| cerPath   | string | Ruta absoluta del certificado en formato \*.cer     |
| keyPath   | string | Ruta absoluta de la clave privada en formato \*.key |
| password  | string | Contraseña de la clave privada                      |

NOTA: Puedes crear un archivo dedicado para exponer una instancia preconfigurada de ConfigCfdi, y así reutilizarla en cualquier parte del proyecto.

`ConfigCfdi` expone varios métodos que son utilizados internamente por el paquete, pero también están disponibles en caso de que necesites usarlos de forma directa.

### **Método getCert**

Permite obtener la información contenida en el certificado, como su número de certificado, vigencia y otros datos.

```javascript
const cert = configCfdi.getCert();
console.log(cert);
/*
OUTPUT:
    {
        noCertificado: '30001000000500003283',
        pem: '-----BEGIN CERTIFICATE----- .... -----END CERTIFICATE-----',
        validity: {
            notBefore: '2023-05-09T18:06:34.000Z',
            notAfter: '2027-05-08T18:06:34.000Z'
        },
        issuer: 'CN=AC UAT, O=SERVICIO DE ADMINISTRACION TRIBUTARIA...',
        subject: 'CN=FERNANDO CASTILLO ÑABARRO, 2.5.4.41=FERNANDO CASTILLO ÑABARRO...',
        version: 3
    } 
*/
```

### **Método getKeyPem**

Obtiene y devuelve la clave privada en formato PEM.
El método lee el archivo .key, lo desencripta usando el password proporcionado y lo expone en formato PEM listo para su uso.

```javascript
const key = configCfdi.getKeyPem();
console.log(key);

// OUTPUT: "-----BEGIN ENCRYPTED PRIVATE KEY----- MIIF... -----END ENCRYPTED PRIVATE KEY-----";
```

### **Clase FacturaCfdi**

Genera los comprobantes fiscales en formato XML y JSON.
Permite crear CFDIs sellados o sin sellar de tipo ingreso, egreso y traslado.

Para crear un nuevo CFDI es necesario crear una instancia de `FacturaCfdi`, pasando como argumento una instancia previamente configurada de la clase `ConfigCfdi`.

```javascript
const { FacturaCfdi } = require("cfdi-sat-nodejs");

const configCfdi = new ConfigCfdi({...});

const fac = new FacturaCfdi(configCfdi);
```

### **Método createNodeComprobante**

Establece los datos generales del comprobante fiscal, como serie, folio, fecha, forma de pago, total, tipo de comprobante, entre otros.

Este nodo es obligatorio en la estructura del CFDI.

```javascript
fac.createNodeComprobante({
  tipoDeComprobante: "I",
  serie: "FAC",
  folio: "1",
  fecha: "2025-06-21T03:18:54",
  formaPago: 99,
  total: 199.94,
  subtotal: "200",
  metodoPago: "PPD",
  lugarExpedicion: "64000",
  moneda: "MXN",
  tipoCambio: "1",
  condicionesDePago: "Pago a 3 meses",
  descuento: 0,
  exportacion: "01",
});
```

Debe usarse una sola vez por comprobante.

| Propiedad         | Tipo            | Descripción                                                                                                                    |
| ----------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| tipoDeComprobante | "I" / "E" / "T" | (opcional) Define el tipo de CFDI para el contribuyente emisor, por defecto su valor es "I".                                   |
| serie             | string          | Serie del comprobante para control interno del emisor.                                                                         |
| folio             | string          | Número del comprobante dentro de la serie. Es el número de folio de la factura.                                                |
| fecha             | string          | Fecha y hora de emisión del CFDI bajo el formato: YYYY-MM-DDTHH:mm:ss                                                          |
| formaPago         | string / number | Clave que indica cómo se pagaron los bienes o servicios.                                                                       |
| total             | string / number | Importe total del comprobante. Incluye impuestos, descuentos, etc.                                                             |
| subtotal          | string / number | Importe antes de aplicar impuestos o descuentos.                                                                               |
| metodoPago        | string          | Clave que corresponda depende si se paga en una sola exhibición o en parcialidades                                             |
| lugarExpedicion   | string / number | Código postal desde donde se emite el comprobante.                                                                             |
| moneda            | string          | (opcional) Clave de la moneda usada, por defecto su valor es "MXN".                                                            |
| tipoCambio        | string          | Obligatorio si la moneda es distinta de "MXN".                                                                                 |
| condicionesDePago | string          | (opcional) Condiciones comerciales aplicables para el pago del comprobante.                                                    |
| descuento         | string / number | (opcional) Importe total de los descuentos aplicables antes de impuestos.                                                      |
| exportacion       | string / number | (opcional) Clave con la que se identifica si el comprobante ampara una operación de exportación. su valor por defecto es "01". |

### **Método createNodeInformacionGlobal**

Agrega el nodo `cfdi:InformacionGlobal` al comprobante, necesario cuando se emiten facturas globales por operaciones con el público en general.

```javascript
fac.createNodeInformacionGlobal({
  periodicidad: "01",
  meses: "02",
  anio: 2025,
});
```

Debe usarse una sola vez por comprobante.

| Propiedad    | Tipo            | Descripción                                            |
| ------------ | --------------- | ------------------------------------------------------ |
| periodicidad | "01" al "05"    | Tipo de periodo del comprobante                        |
| meses        | "01" al "18"    | Mes o meses que abarca los movimientos del comprobante |
| anio         | string / number | Año que abarca los movimientos del comprobante         |

### **Método createNodeRelacionados**

Agrega el nodo `cfdi:CfdiRelacionados` al comprobante, utilizado para relacionar el CFDI actual con uno o más CFDI anteriores, como notas de crédito, devoluciones o sustituciones.

```javascript
fac.createNodeRelacionados({
  tipoRelacion: "01",
  uuids: ["12345678-1234-1234-1234-123456789012", "23456789-2345-2345-2345-234567890123"],
});
```

Puede usarse múltiples veces por comprobante.

| Propiedad    | Tipo             | Descripción                              |
| ------------ | ---------------- | ---------------------------------------- |
| tipoRelacion | "01" al "07"     | Tipo de relación con otros CFDI.         |
| uuids        | array de strings | Lista de UUIDs de los CFDI relacionados. |

### **Método createNodeEmisor**

Agrega el nodo `cfdi:Emisor` al comprobante, con los datos fiscales del emisor del CFDI. Este nodo es obligatorio y solo debe declararse una vez por comprobante.

```javascript
fac.createNodeEmisor({
  rfc: "CAÑF770131PA3",
  nombre: "FERNANDO CASTILLO ÑABARRO",
  regimenFiscal: 612,
  FacAtrAdquirente: 12345,
});
```

Debe usarse una sola vez por comprobante.

| Propiedad        | Tipo            | Descripción                                                                                                                                     |
| ---------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| rfc              | string          | RFC del emisor del comprobante.                                                                                                                 |
| nombre           | string          | Nombre, denominación o razón social inscrito del emisor del comprobante.                                                                        |
| regimenFiscal    | string / number | Clave vigente del regimen fiscal del emisor.                                                                                                    |
| FacAtrAdquirente | string / number | (opcional) Número de operación proporcionado por el SAT cuando se trate de un comprobante a través del adquirente de los productos o servicios. |

### **Método createNodeReceptor**

Agrega el nodo `cfdi:Receptor` al comprobante, con los datos fiscales del receptor, como RFC, nombre, uso del CFDI, etc.

```javascript
fac.createNodeReceptor({
  rfc: "URE180429TM6",
  nombre: "UNIVERSIDAD ROBOTICA ESPAÑOLA",
  usoCfdi: "G01",
  regimenFiscal: 601,
  domicilioFiscal: 86991,
  residenciaFiscal: "USA",
  numRegIdTrib: 121585958,
});
```

Debe usarse una sola vez por comprobante.

| Propiedad        | Tipo            | Descripción                                                                                      |
| ---------------- | --------------- | ------------------------------------------------------------------------------------------------ |
| rfc              | string          | RFC del receptor del comprobante.                                                                |
| nombre           | string          | Nombre, denominación o razón social inscrito del receptor del comprobante.                       |
| usoCfdi          | string          | Se debe registrar la clave que corresponda al uso que le dará al comprobante fiscal el receptor. |
| regimenFiscal    | string / number | Clave vigente del regimen fiscal del receptor.                                                   |
| domicilioFiscal  | string / number | Código postal del domicilio fiscal del receptor del comprobante.                                 |
| residenciaFiscal | string          | (opcional) Clave del país de residencia del receptor en caso de ser extranjero.                  |
| numRegIdTrib     | string / number | (opcional) Número de registro de identidad fiscal del receptor en caso de ser extranjero.        |

### **Método createNodeConcepto**

Agrega un nodo `cfdi:Concepto` al comprobante que representa un producto o servicio incluido en la factura, con su cantidad, descripción, valor unitario, impuestos y demás atributos relacionados.

```javascript
fac.createNodeConcepto({
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

PUEDE SER USADO MULTIPLES VECES.

La propiedad `concepto` es un objeto que corresponde al producto o servicio:

| Propiedad        | Tipo            | Descripción                                                                                                          |
| ---------------- | --------------- | -------------------------------------------------------------------------------------------------------------------- |
| claveProdServ    | string / number | Clave que permita clasificar los conceptos del comprobante como productos o servicios.                               |
| cantidad         | string / number | Cantidad de bienes o servicios que correspondan al concepto.                                                         |
| claveUnidad      | string          | Clave unidad del producto o servicio.                                                                                |
| unidad           | string          | Nombre de la unidad de medida correspondiente a la claveUnidad.                                                      |
| descripcion      | string          | Descripción del producto o servicio a facturar.                                                                      |
| valorUnitario    | string / number | Valor o precio unitario del producto o servicio.                                                                     |
| importe          | string / number | Importe total de producto o servicio, resultado de la multiplicación de la cantidad por el valorUnitario             |
| objetoImp        | "01" al "08"    | Clave correspondiente para indicar si la operación es objeto o no de impuesto.                                       |
| noIdentificacion | string          | (opcional) Identificador del producto o servicio, puede ser el código de barras, SKU o cualquier otro identificador. |
| descuento        | string / number | (opcional) Valor a aplicar al importe. debe contener la misma cantidad de decimales que el importe.                  |

La propiedad `impuestos` es un objeto que corresponde a los impuestos del producto o servicio.
Esta propiedad debe existir siempre y cuando el producto o servicio es objeto de impuesto, de lo contrario puede omitirlo.

#### Propiedad `traslados` en impuestos

```javascript
fac.createNodeConcepto({
  // concepto: {...},
  impuestos: {
    traslados: [
      {
        base: 1,
        impuesto: "002",
        tipoFactor: "Tasa",
        tasaOCuota: 0.16,
        importe: 0.16,
      },
    ],
  },
});
```

Puedes tener varios objetos dentro del array.

| Propiedad  | Tipo                        | Descripción                                                                                                    |
| ---------- | --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| base       | string / number             | Valor para el cálculo del impuesto que se traslada.                                                            |
| impuesto   | "001" / "002" / "003"       | Clave del tipo de impuesto aplicable.                                                                          |
| tipoFactor | "Tasa" / "Cuota" / "Exento" | Tipo de factor que se aplica a la base del impuesto.                                                           |
| tasaOCuota | string / number             | Requerido si el tipoFactor es distinto a "Exento". Valor de la tasa o cuota del impuesto.                      |
| importe    | string / number             | Requerido si el tipoFactor es distinto a "Exento". Importe del impuesto trasladado que aplica a cada concepto. |

#### Propiedad `retenciones` en impuestos

Si el producto o servicio tiene retenciones puede hacer uso de la propiedad retenciones.

```javascript
fac.createNodeConcepto({
  // concepto: {...},
  impuestos: {
    retenciones: [
      {
        base: 1,
        impuesto: "002",
        tipoFactor: "Tasa",
        tasaOCuota: 0.16,
        importe: 0.16,
      },
    ],
  },
});
```

Puedes tener varios objetos dentro del array.

| Propiedad  | Tipo                  | Descripción                                               |
| ---------- | --------------------- | --------------------------------------------------------- |
| base       | string / number       | Valor para el cálculo del impuesto que se retiene.        |
| impuesto   | "001" / "002" / "003" | Clave del tipo de impuesto aplicable.                     |
| tipoFactor | "Tasa" / "Cuota"      | Tipo de factor que se aplica a la base del impuesto.      |
| tasaOCuota | string / number       | Valor de la tasa o cuota del impuesto.                    |
| importe    | string / number       | Importe del impuesto retenido que aplica a cada concepto. |

#### Propiedad `aCuentaTerceros`

En caso de usar informacion del contribuyente tercero, a cuenta del que se realiza la operación.

```javascript
fac.createNodeConcepto({
  // concepto: {...},
  aCuentaTerceros: {
    rfcACuentaTerceros: "FIMA420127R44",
    nombreACuentaTerceros: "MARTON ALEJANDRO SANZI FIERROR",
    regimenFiscalACuentaTerceros: 606,
    domicilioFiscalACuentaTerceros: 64000,
  },
});
```

Solo puede tener un objeto.

| Propiedad                      | Tipo            | Descripción                                                    |
| ------------------------------ | --------------- | -------------------------------------------------------------- |
| rfcACuentaTerceros             | string          | RFC del contribuyente Tercero.                                 |
| nombreACuentaTerceros          | string          | Nombre, denominación o razón social del contribuyente Tercero. |
| regimenFiscalACuentaTerceros   | string / number | Clave del régimen del contribuyente Tercero.                   |
| domicilioFiscalACuentaTerceros | string / number | Código postal del domicilio fiscal del Tercero.                |

#### Propiedad `informacionAduanera`

Cuando se trate de productos importados o movimientos de comercio exterior pued usar la propiedad `informacionAduanera`:

```javascript
fac.createNodeConcepto({
  // concepto: {...},
  informacionAduanera: [
    {
      numeroPedimento: "12345678",
    },
  ],
});
```

Puedes tener varios objetos dentro del array.

| Propiedad       | Tipo   | Descripción                                                  |
| --------------- | ------ | ------------------------------------------------------------ |
| numeroPedimento | string | Número del pedimento que ampara la importación del producto. |

#### Propiedad `cuentaPredial`

En caso de utlizar numeros de cuenta predial con el que fue registrado el inmueble, puede usar la propiedad `cuentaPredial`.

```javascript
fac.createNodeConcepto({
  // concepto: {...},
  cuentaPredial: [
    {
      numero: "12345678",
    },
  ],
});
```

Puedes tener varios objetos dentro del array.

| Propiedad | Tipo            | Descripción                               |
| --------- | --------------- | ----------------------------------------- |
| numero    | string / number | Número de la cuenta predial del inmueble. |

#### Propiedad `complementoConcepto`

Si require de nodos complementarios puede usar la propiedad `complementoConcepto`.

```javascript
fac.createNodeConcepto({
  // concepto: {...},
  complementoConcepto: [
    {
      node: "iedu:instEducativas",
      attributes: {
        "xmlns:iedu": "http://www.sat.gob.mx/iedu",
        rfcPago: "CACX7605101P8",
      },
    },
  ],
});
```

Puedes tener varios objetos dentro del array.

| Propiedad  | Tipo   | Descripción                                |
| ---------- | ------ | ------------------------------------------ |
| node       | string | Nombre del nodo base.                      |
| attributes | object | Clave-Valor que seran parte del nodo base. |

#### Propiedad `parte`

Cuando el concepto sea integrado por mas de 1 producto o servicio puede ser uso de la propiedad `parte` para describir los productos o servicios que conformen dicho concepto.

```javascript
fac.createNodeConcepto({
  // concepto: {...},
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
      informacionAduanera: [
        {
          numeroPedimento: "12345678",
        },
      ],
    },
  ],
});
```

Puedes tener varios objetos dentro del array.

| Propiedad           | Tipo   | Descripción                                                                                                 |
| ------------------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| concepto            | object | Objeto referente al producto o servicio parte del concepto base.                                            |
| informacionAduanera | array  | (opcional) Array de objetos en caso de tratarse de productos importados o movimientos de comercio exterior. |

### **Método createNodeAddenda**

En caso que se requiera de colocar información que sean de utilidad al contribuyente.

```javascript
fac.createNodeAddenda({
  nodeBase: "Addenda",
  attributes: {
    "xmlns:Addenda": "http://www.addenda.com/",
    schemaLocation: "http://www.addenda.xsd",
  },
  content: "contenido",
  nodes: [
    {
      nodeName: "Addenda:Grupo",
      content: "contenido",
      nodes: [{ nodeName: "Amazon:Nombre", content: "contenido" }],
    },
  ],
});
```

Debe usarse una sola vez por comprobante.

| Propiedad  | Tipo   | Descripción                                                                                 |
| ---------- | ------ | ------------------------------------------------------------------------------------------- |
| nodeBase   | string | Define el nombre del nodo base.                                                             |
| attributes | object | Define los atributos que acompañan al nodo base.                                            |
| content    | string | (opcional) Coloca el contenido relacionado y de relevancia en texto plano.                  |
| nodes      | array  | (opcional) Coloca nodos hijos dentro del nodo base. Puede colocar mas nodos dentro de este. |

NOTA: No puede usar `content` y `nodes` en el mismo nodo, por lo que si coloca ambos, ya sea por error o por descuido, el paquete omitira ambos.
