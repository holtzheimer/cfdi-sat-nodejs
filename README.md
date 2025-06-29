## ⚠️ Aviso Importante

Este paquete ha sido reescrito desde cero. Las versiones anteriores a la 3.0 no son compatibles con la nueva versión.
Si planeas actualizar, asegúrate de leer la documentación actual para adaptar tu código correctamente.

# PAQUETE CFDI SAT PARA NODEJS

### Herramienta para generar y manejar CFDI 4.0. Incluye utilidades para trabajar con certificados digitales, generar XML o JSON sellados y sin sellar, consultar catálogos del SAT eficientemente, convertir XML a JSON y más. Ideal para desarrolladores que necesitan generar facturas electrónicas válidas para el SAT.

### Tabla de contenido

- [Instalación](#Instalación)
- [Importación](#Importación)
- [ConfigCfdi](#ConfigCfdi)
  - [getCert](#getCert)
  - [getKeyPem](#getKeyPem)
- [Utils](#Utils)
  - [xmlToJson](#xmlToJson)
  - [jsonToXml](#jsonToXml)
  - [generateUuid](#generateUuid)
  - [sanitizeText](#sanitizeText)
  - [dateCurrent](#dateCurrent)
  - [generateIdCcp](#generateIdCcp)
- [FacturaCfdi](#FacturaCfdi)
  - [createNodeComprobante](#createNodeComprobante)
  - [createNodeInformacionGlobal](#createNodeInformacionGlobal)
  - [createNodeRelacionados](#createNodeRelacionados)
  - [createNodeEmisor](#createNodeEmisor)
  - [createNodeReceptor](#createNodeReceptor)
  - [createNodeConcepto](#createNodeConcepto)
  - [createNodeAddenda](#createNodeAddenda)
  - [createXml](#createXml)
  - [createXmlSellado](#createXmlSellado)
- [CatalogoSat](#CatalogoSat)
  - [search](#search)
- [CartaPorte](#CartaPorte)
  - [setAttributes](#setAttributes)
  - [createNodeRegimenesAduaneros](#createNodeRegimenesAduaneros)
  - [createNodeUbicacion](#createNodeUbicacion)
  - [createNodeMercancias](#createNodeMercancias)
  - [createNodeMercancia](#createNodeMercancia)
  - [createNodeTipoFigura](#createNodeTipoFigura)
  - [createXmlSellado](#createXmlSellado-1)
  - [createJsonSellado](#createJsonSellado-1)
- [CartaPorteAutotransporte](#CartaPorteAutotransporte)
  - [createNodeAutotransporte](#createNodeAutotransporte)
  - [createNodeIdentificacionVehicular](#createNodeIdentificacionVehicular)
  - [createNodeRemolques](#createNodeRemolques)

## **Instalación**

Puede instalar mediante NPM

```bash
npm install --save cfdi-sat-nodejs
```

## **Importación**

Para empezar a usar cfdi-sat-nodejs primero importa la clase ConfigCfdi

```javascript
const { ConfigCfdi } = require("cfdi-sat-nodejs"); // Si usas CommonJS
import { ConfigCfdi } from "cfdi-sat-nodejs"; // si usas ESM

const config = new ConfigCfdi();
```

## **ConfigCfdi**

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

### **getCert**

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

### **getKeyPem**

Obtiene y devuelve la clave privada en formato PEM.
El método lee el archivo .key, lo desencripta usando el password proporcionado y lo expone en formato PEM listo para su uso.

```javascript
const key = configCfdi.getKeyPem();
console.log(key);

// OUTPUT: "-----BEGIN ENCRYPTED PRIVATE KEY----- MIIF... -----END ENCRYPTED PRIVATE KEY-----";
```

## **Utils**

Esta clase contiene varios métodos que puede usar según sus necesidades.

### **xmlToJson**

Convierte un XML a JSON

```javascript
Utils.xmlToJson(xml, simplified);
```

| Argumento  | Tipo    | Descripción                                                                                                                                                          |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| xml        | string  | Contenido del cfdi/xml                                                                                                                                               |
| simplified | boolean | (opcional) Si se establece en `true`, genera un JSON más limpio sin prefijos (como `"cfdi:"`) ni atributos con `"@_"`. Por defecto, se mantiene el formato completo. |

### **jsonToXml**

Convierte un JSON a XML

```javascript
Utils.jsonToXml(json);
```

| Argumento | Tipo | Descripción                                                       |
| --------- | ---- | ----------------------------------------------------------------- |
| json      | JSON | Contenido del cfdi con prefijos (`cfdi:`, ) y atributos con `@_`. |

### **generateUuid**

Te permite generar un UUID valido.

```javascript
Utils.generateUuid();
```

### **sanitizeText**

Elimina cualquier tilde del texto y cualquier caracter no valido.

```javascript
Utils.sanitizeText(text);
```

### **dateCurrent**

Retorna la fecha actual en string con formato: AAAA-MM-DDTHH:mm:ss

```javascript
Utils.dateCurrent();
```

### **generateIdCcp**

Permite obtener un IdCCP valido para carta porte.

```javascript
Utils.generateIdCcp();
```

## **FacturaCfdi**

Genera los comprobantes fiscales en formato XML y JSON.
Permite crear CFDIs sellados o sin sellar de tipo ingreso, egreso y traslado.

Para crear un nuevo CFDI es necesario crear una instancia de `FacturaCfdi`, pasando como argumento una instancia previamente configurada de la clase `ConfigCfdi`.

```javascript
const { FacturaCfdi } = require("cfdi-sat-nodejs");

const configCfdi = new ConfigCfdi({...});

const fac = new FacturaCfdi(configCfdi);
```

### **createNodeComprobante**

Establece los datos generales del comprobante fiscal, como serie, folio, fecha, forma de pago, total, tipo de comprobante, entre otros.

Este nodo es obligatorio en la estructura del CFDI.

```javascript
fac.createNodeComprobante({
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

Debe usarse una sola vez por comprobante.

| Propiedad         | Tipo            | Descripción                                                                                                                           |
| ----------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| tipoDeComprobante | "I" / "E" / "T" | (opcional) Define el tipo de CFDI para el contribuyente emisor, por defecto su valor es "I".                                          |
| serie             | string          | Serie del comprobante para control interno del emisor.                                                                                |
| folio             | string          | Número del comprobante dentro de la serie. Es el número de folio de la factura.                                                       |
| fecha             | string          | Fecha y hora de emisión del CFDI bajo el formato: YYYY-MM-DDTHH:mm:ss                                                                 |
| total             | string / number | Importe total del comprobante. Incluye impuestos, descuentos, etc.                                                                    |
| subtotal          | string / number | Importe antes de aplicar impuestos o descuentos.                                                                                      |
| lugarExpedicion   | string / number | Código postal desde donde se emite el comprobante.                                                                                    |
| metodoPago        | string          | Requerido cuando el tipo de comprobante es distinto a "T". Clave que corresponda si se paga en una sola exhibición o en parcialidades |
| formaPago         | string / number | Requerido cuando el tipo de comprobante es distinto a "T". Clave que indica cómo se pagaron los bienes o servicios.                   |
| moneda            | string          | (opcional) Clave de la moneda usada, por defecto su valor es "MXN".                                                                   |
| tipoCambio        | string          | Obligatorio si la moneda es distinta de "MXN".                                                                                        |
| condicionesDePago | string          | (opcional) Condiciones comerciales aplicables para el pago del comprobante.                                                           |
| descuento         | string / number | (opcional) Importe total de los descuentos aplicables antes de impuestos.                                                             |
| exportacion       | string / number | (opcional) Clave con la que se identifica si el comprobante ampara una operación de exportación. su valor por defecto es "01".        |

### **createNodeInformacionGlobal**

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

### **createNodeRelacionados**

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

### **createNodeEmisor**

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

### **createNodeReceptor**

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

### **createNodeConcepto**

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

### **createNodeAddenda**

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

### **createXml**

Si quieres generar el XML sin sellar puedes usar este método

```javascript
fac.createXml();
```

### **createXmlSellado**

Este método genera el XML sellado.

```javascript
await fac.createXmlSellado();
```

## **CatalogoSat**

`CFDI-SAT-NODEJS` contiene los catalogos actualizados del SAT en formato JSON.

Debido a que algunos catálogos contienen miles de registros, esta clase implementa un sistema de lectura por flujo que permite procesar los datos de forma secuencial, sin necesidad de cargar el archivo completo en memoria. Esto garantiza búsquedas optimizadas y un mejor rendimiento.

```javascript
const { CatalogoSat } = require("cfdi-sat-nodejs");
const cat = new CatalogoSat("tipo_factor");
```

### **search**

Permite buscar un registro específico dentro del catálogo utilizando una combinación clave/valor. El método recorre el catálogo de forma eficiente hasta encontrar el primer resultado coincidente.

Si encuentra registros que cumpla con los criterios, lo devuelve como array. Si no encuentra coincidencias o si la clave proporcionada no existe en el catálogo, devuelve un error.

```javascript
const cat = new CatalogoSat("ClaveProdServ");
const result = await cat.search("clave", 10101500);

//output
/*
[
    {
        clave: 10101500,
        descripcion: 'Animales vivos de granja',
        incluir_iva_trasladado: 'Opcional',
        incluir_ieps_trasladado: 'Opcional',
        estimulo_franja_fronteriza: 1,
        palabras_similares: null
    }
]
*/
```

LISTA DE CATALOGOS DISPONIBLES

#### Aduana

```javascript
{
    "clave": 1,
    "descripcion": "ACAPULCO, ACAPULCO DE JUAREZ, GUERRERO."
}
```

#### ClaveProdServ

```javascript
{
    "clave": "01010101",
    "descripcion": "No existe en el catálogo",
    "incluir_iva_trasladado": "Opcional",
    "incluir_ieps_trasladado": "Opcional",
    "estimulo_franja_fronteriza": 0,
    "palabras_similares": "Público en general"
}
```

#### ClaveProdServCp

```javascript
{
    "clave": 10101500,
    "descripcion": "Animales vivos de granja",
    "palabras_similares": null,
    "material_peligroso": 0
}
```

#### ClaveTipoCarga

```javascript
{
    "clave": "CGS",
    "descripcion": "Carga General Suelta"
}
```

#### ClaveTransporte

```javascript
{
    "clave_transporte": "01",
    "descripcion": "Autotransporte"
}
```

#### ClaveUnidad

```javascript
{
    "clave": 18,
    "nombre": "Tambor de cincuenta y cinco galones (EUA)",
    "descripcion": null,
    "nota": "Las unidades marcadas como borradas en el catálogo internacional de UNECE, serán retenidas indefinidamente en las listas de códigos. En su caso, estas unidades podrán ser reinstalado a través del proceso de mantenimiento.",
    "simbolo": null
}
```

#### ClaveUnidadPeso

```javascript
{
    "clave": "Tu",
    "nombre": "Contenedor externo",
    "descripcion": "Tipo de caja de contención que sirve como contenedor de transporte externo, no especificado como equipo de transporte.",
    "nota": null,
    "simbolo": null,
    "bandera": "Embalaje"
}
```

#### CodigoPostalParteUno

Abarca del CP 20000 al 64279.

```javascript
{
    "codigo_postal": "20000",
    "estado": "AGU",
    "municipio": "001",
    "localidad": "01",
    "estimulo_franja_fronteriza": 0
}
```

#### CodigoPostalParteDos

Abarca del 65000 al 99999

```javascript
{
    "codigo_postal": "65000",
    "estado": "NLE",
    "municipio": "005",
    "localidad": null,
    "estimulo_franja_fronteriza": 1
}
```

#### CodigoTransporteAereo

```javascript
{
    "clave": "CA001",
    "nacionalidad": "Asiáticas",
    "nombre_aerolinea": "All Nippon Airways LTD",
    "designador_oaci": "ANA"
}
```

#### ColoniaParteUno, ColoniaParteDos, ColoniaParteTres

```javascript
{
    "clave": "0001",
    "codigo_postal": "01000",
    "nombre_asentamiento": "San Ángel"
}
```

#### CondicionesEspeciales

```javascript
{
    "clave": "01",
    "descripcion": "Congelados"
}
```

#### ConfigAutoTransporte

```javascript
{
    "clave_nomenclatura": "VL",
    "descripcion": "Vehículo ligero de carga (2 llantas en el eje delantero y 2 llantas en el eje trasero)",
    "numero_ejes": 2,
    "numero_llantas": 4,
    "remolque": "0, 1"
}
```

#### ConfigMaritima

```javascript
{
    "clave": "B01",
    "descripcion": "Abastecedor"
}
```

#### Contenedor

```javascript
{
    "clave": "TC01",
    "tipo_contenedor": "20'",
    "descripcion": "Contenedor de 6.1 Mts de longitud"
}
```

#### ContenedorMaritimo

```javascript
{
    "clave": "CM001",
    "descripcion": "Contenedores refrigerados de 20FT"
}
```

#### DerechosDePaso

```javascript
{
    "clave": "CDP001",
    "derecho_paso": "D-1",
    "entre": "Torreón (Km. DA-251+000) ",
    "hasta": "Villa Juárez (Km. DA-238+000)",
    "otorga_recibe": "Recibe",
    "concesionario": "Vía ferrea del Noroeste (Actualmente Kansas City Southern de México, S.A de C.V.)"
}
```

#### DocumentoAduanero

```javascript
{
    "clave": "01",
    "descripcion": "Pedimento"
}
```

#### Estaciones

```javascript
{
    "clave": "PM001",
    "descripcion": "Rosarito",
    "clave_transporte": "02",
    "nacionalidad": "México",
    "designador_iata": null,
    "linea_ferrea": null
}
```

#### Estado

```javascript
{
    "clave": "AGU",
    "pais": "MEX",
    "nombre_estado": "Aguascalientes"
}
```

#### Exportacion

```javascript
{
    "clave": "01",
    "descripcion": "No aplica"
}
```

#### FiguraTransporte

```javascript
{
    "clave": "01",
    "descripcion": "Operador"
}
```

#### FormaFarmaceutica

```javascript
{
    "clave": "01",
    "descripcion": "Tableta"
}
```

#### FormaPago

```javascript
{
    "clave": 1,
    "descripcion": "Efectivo",
    "bancarizado": "No"
}
```

#### Impuestos

```javascript
{
    "clave": 1,
    "descripcion": "ISR",
    "retencion": "Si",
    "traslado": "No"
}
```

#### Localidad

```javascript
{
    "localidad": "01",
    "estado": "AGU",
    "descripcion": "Aguascalientes"
}
```

#### MaterialPeligroso

```javascript
{
    "clave": "0004",
    "descripcion": "PICRATO AMÓNICO seco o humedecido con menos del 10%, en masa, de agua",
    "clase_div": "1.1D",
    "peligro_secundario": null,
    "nombre_tecnico": null
}
```

#### Meses

```javascript
{
    "clave": "01",
    "descripcion": "Enero"
}
```

#### MetodoPago

```javascript
{
    "clave": "PUE",
    "descripcion": "Pago en una sola exhibición"
}
```

#### Moneda

```javascript
{
    "clave": "AED",
    "descripcion": "Dirham de EAU",
    "decimales": 2,
    "porcentaje_variacion": "500%"
}
```

#### Municipio

```javascript
{
    "municipio": "001",
    "estado": "AGU",
    "descripcion": "Aguascalientes"
}
```

#### NumAutorizacionNaviero

```javascript
{
    "num_autorizacion": "SCT418/068/2018",
    "inicio_vigencia": "2018-12-26",
    "fin_vigencia": "2023-12-27"
}
```

#### NumPedimentoAduana

```javascript
{
    "clave": "01",
    "patente": "3173",
    "ejercicio": 2007,
    "cantidad": "999999"
}
```

#### ObjetoImp

```javascript
{
    "clave": "01",
    "descripcion": "No objeto de impuesto."
}
```

#### Pais

```javascript
{
    "clave": "MEX",
    "descripcion": "México"
}
```

#### ParteTransporte

```javascript
{
    "clave": "PT01",
    "descripcion": "Camión unitario"
}
```

#### PatenteAduanal

```javascript
{
    "patente": "0000"
}
```

#### Periodicidad

```javascript
{
    "clave": "01",
    "descripcion": "Diario"
}
```

#### RegimenAduanero

```javascript
{
    "clave": "IMD",
    "descripcion": "Definitivo de importación.",
    "importacion_exportacion": "Entrada"
}
```

#### RegimenFiscal

```javascript
{
    "clave": "601",
    "descripcion": "General de Ley Personas Morales",
    "fisica": "No",
    "moral": "Sí"
}
```

#### RegistroIstmo

```javascript
{
    "clave": "01",
    "descripcion": "Coatzacoalcos I"
}
```

#### SectorCofepris

```javascript
{
    "clave": "01",
    "descripcion": "Medicamento"
}
```

#### SubtipoRemolque

```javascript
{
    "clave_remolque": "CTR001",
    "remolque_semirremolque": "Caballete"
}
```

#### TasaOCuota

```javascript
{
    "tipo": "Fijo",
    "valor_minimo": null,
    "valor_maximo": 0,
    "impuesto": "IVA",
    "factor": "Tasa",
    "traslado": "Sí",
    "retencion": "No"
}
```

#### TipoCarro

```javascript
{
    "clave": "TC01",
    "tipo_carro": "Furgón",
    "contenedor": 0
}
```

#### TipoDeComprobante

```javascript
{
    "clave": "I",
    "descripcion": "Ingreso",
    "valor_maximo": "999999999999999999.999999"
}
```

#### TipoDeServicio

```javascript
{
    "clave": "TS01",
    "descripcion": "Carros Ferroviarios",
    "contenedor": 0
}
```

#### TipoEmbalaje

```javascript
{
    "clave": "1A1",
    "descripcion": "Bidones (Tambores) de Acero 1 de tapa no desmontable"
}
```

#### TipoEstacion

```javascript
{
    "clave_estacion": "01",
    "descripcion": "Origen Nacional",
    "clave_transporte": "02, 03 y 04"
}
```

#### TipoFactor

```javascript
{
    "descripcion": "Tasa"
}
```

#### TipoMateria

```javascript
{
    "clave": "01",
    "descripcion": "Materia prima"
}
```

#### TipoPermiso

```javascript
{
    "clave": "TPAF01",
    "descripcion": "Autotransporte Federal de carga general.",
    "clave_transporte": "01"
}
```

#### TipoRelacion

```javascript
{
    "clave": "01",
    "descripcion": "Nota de crédito de los documentos relacionados"
}
```

#### TipoTrafico

```javascript
{
    "clave": "TT01",
    "descripcion": "Tráfico local"
}
```

#### UsoCfdi

```javascript
{
    "clave": "G01",
    "descripcion": "Adquisición de mercancías.",
    "fisica": "Sí",
    "moral": "Sí",
    "regimen_receptor": "601, 603, 606, 612, 620, 621, 622, 623, 624, 625,626"
}
```

## **CartaPorte**

Para generar complemento carta porte puede usar las distintas clases especificas para cada medio de transporte.

[Para autotransportes](#CartaPorteAutotransporte)

En esta sección se documenta los métodos usados por todos los medios de transporte.

### **setAttributes**

Este método asigna los atributos principales del nodo `cartaporte31:CartaPorte`, como el identificador idCCP, si el transporte es internacional y demas información.

```javascript
cartaporte.setAttributes({
  idCcp: "CCCBCD94-870A-4332-A52A-A52AA52AA52A",
  transpInternac: "Sí",
  entradaSalidaMerc: "Entrada",
  paisOrigenDestino: "USA",
  registroISTMO: "Sí",
  ubicacionPoloDestino: "01",
  ubicacionPoloOrigen: "01",
  totalDistRec: 10,
  viaEntradaSalida: "01",
});
```

USO POR INSTANCIA: 1

| Propiedades          | Tipo                 | Descripción                                                                     |
| -------------------- | -------------------- | ------------------------------------------------------------------------------- |
| idCcp                | string               | Identificador único del complemento Carta Porte.                                |
| transpInternac       | "Sí" / "No"          | Indica si el transporte es internacional.                                       |
| entradaSalidaMerc    | "Entrada" / "Salida" | (opcional) Define si la mercancía entra o sale del país.                        |
| paisOrigenDestino    | string               | (opcional) Clave del país de origen o destino.                                  |
| registroISTMO        | "Sí" / "No"          | (opcional) Señala si el traslado cruza por el Corredor Interoceánico del ISTMO. |
| ubicacionPoloDestino | string               | Requerido si el registroISTMO es "Sí". Clave del polo de origen.                |
| ubicacionPoloOrigen  | string               | Requerido si el registroISTMO es "Sí". Clave del polo de destino.               |
| totalDistRec         | string / number      | (opcional) Distancia total recorrida en kilómetros.                             |
| viaEntradaSalida     | string               | (opcional) Clave de la vía de entrada o salida.                                 |

### **createNodeRegimenesAduaneros**

El método genera el nodo `cartaporte31:RegimenesAduaneros`, a partir de una lista de claves de regímenes aduaneros. Cada clave representa un régimen aplicable al traslado de mercancías.

```javascript
cartaporte.createNodeRegimenesAduaneros(["IMD", "ITR"]);
```

USO POR INSTANCIA: 1

| Argumento | Tipo             | Descripción                                  |
| --------- | ---------------- | -------------------------------------------- |
| data      | array de strings | Define las claves aplicables al complemento. |

### **createNodeUbicacion**

Permite establecer la información de ubicación, ya sea de origen o destino, incluyendo datos del punto logístico y su respectivo domicilio. Esta información es esencial para definir los movimientos de la mercancía dentro del complemento Carta Porte.

```javascript
cartaporte.createNodeUbicacion({
  ubicacion: {
    fechaHoraSalidaLlegada: "2023-08-01T00:00:01",
    tipoUbicacion: "Origen",
    rfcRemitenteDestinatario: "XEXX010101000",
    idUbicacion: "29838",
    distanciaRecorrida: 1,
    nombreRemitenteDestinatario: "NombreRem",
    numEstacion: 123,
    navegacionTrafico: "Altura",
    nombreEstacion: "Nombre de la estacion",
    tipoEstacion: "01",
    numRegIdTrib: 123456,
    residenciaFiscal: "USA",
  },
  /* --------->  propiedad opcional <------------ */
  domicilio: {
    codigoPostal: 50485,
    estado: "MEX",
    pais: "MEX",
    calle: "Calle ejemplo",
    colonia: "Colonia",
    localidad: "Localidad",
    municipio: "Municipio",
    numeroExterior: 0,
    numeroInterior: 12,
    referencia: "Referencia",
  },
});
```

USO POR INSTANCIA: minimo 2 (una de "Origen" y otra de "Destino") a más.

| Argumento                   | Tipo                  | Descripción                                                                                           |
| --------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------- |
| fechaHoraSalidaLlegada      | string                | Fecha y hora de salida o llegada de la mercancía.                                                     |
| tipoUbicacion               | "Origen" / "Destino"  | Indica si es origen o destino del traslado.                                                           |
| rfcRemitenteDestinatario    | string                | RFC del remitente o destinatario segun tipo de ubicación.                                             |
| idUbicacion                 | string                | (opcional) Identificador único de la ubicación.                                                       |
| distanciaRecorrida          | string / number       | Requerido si l tipo de ubicacion es "Destino". Distancia recorrida desde la ubicación anterior.       |
| nombreRemitenteDestinatario | string                | (opcional) Nombre del remitente o destinatario.                                                       |
| numEstacion                 | string                | (opcional) Clave de la estación de origen o destino para el traslado.                                 |
| navegacionTrafico           | "Altura" / "Cabotaje" | (opcional) Tipo de puerto de origen o destino en el cual se documentan los bienes                     |
| nombreEstacion              | string                | (opcional) Nombre de la estación de origen o destino por la que se pasa para efectuar el traslado.    |
| tipoEstacion                | string                | (opcional) Clave del tipo de estación por el que pasan los bienes y/o mercancías durante su traslado. |
| numRegIdTrib                | string                | (opcional) Número de registro fiscal del extranjero.                                                  |
| residenciaFiscal            | string                | (opcional) País de residencia fiscal del remitente/destinatario.                                      |
| codigoPostal                | string / number       | Código postal del domicilio.                                                                          |
| estado                      | string                | Clave del estado según el catálogo del SAT.                                                           |
| pais                        | string                | Clave del país (por ejemplo, "MEX" para México).                                                      |
| calle                       | string                | (opcional) Nombre de la calle del domicilio.                                                          |
| colonia                     | string                | (opcional) Colonia o barrio.                                                                          |
| localidad                   | string                | (opcional) Localidad o ciudad.                                                                        |
| municipio                   | string                | (opcional) Municipio o delegación.                                                                    |
| numeroExterior              | string / number       | (opcional) Número exterior del domicilio.                                                             |
| numeroInterior              | string / number       | (opcional) Número interior del domicilio.                                                             |
| referencia                  | string                | (opcional) Información adicional para localizar el domicilio.                                         |

### **createNodeMercancias**

Define los atributos generales del nodo `cartaporte31:Mercancias`, incluyendo datos como la cantidad total de mercancías, pesos, unidad de medida, cargos por tasación y si el traslado contempla logística inversa, recolección o devolución.

```javascript
cartaporte.createNodeMercancias({
  numTotalMercancias: 1,
  pesoBrutoTotal: 15,
  unidadPeso: "KG",
  pesoNetoTotal: 18,
  cargoPorTasacion: "16",
  logisticaInversaRecoleccionDevolucion: "Sí",
});
```

USO POR INSTANCIA: 1

| Propiedad                             | Tipo            | Descripción                                                           |
| ------------------------------------- | --------------- | --------------------------------------------------------------------- |
| numTotalMercancias                    | string / number | Número total de mercancías incluidas en el traslado.                  |
| pesoBrutoTotal                        | string / number | Peso bruto total de las mercancías, incluyendo embalaje.              |
| unidadPeso                            | string          | Unidad de medida utilizada para los pesos.                            |
| pesoNetoTotal                         | string / number | (opcional) Peso neto total de las mercancías, sin incluir embalaje.   |
| cargoPorTasacion                      | string          | (opcional) Monto correspondiente a cargos por tasación.               |
| logisticaInversaRecoleccionDevolucion | "Sí" / "No"     | (opcional) Indica si hay logística inversa, recolección o devolución. |

### **createNodeMercancia**

Crea una nueva entrada de mercancía dentro del nodo `cartaporte31:Mercancias`. Este método permite detallar ampliamente las características del bien transportado, incluyendo información comercial, aduanera, sanitaria, de embalaje, identificación, cantidades transportadas y detalles físicos.

```javascript
cartaporte.createNodeMercancia({
  mercancia: {
    bienesTransp: "11121900",
    cantidad: 1,
    claveUnidad: "KGM",
    descripcion: "mercancia",
    pesoEnKg: 15.048,
    valorMercancia: 109.08,
    moneda: "MXN",
    dimensiones: "30/40/30cm",
    unidad: "KG",
    fraccionArancelaria: "0101290300",
    uuidComercioExt: "a3f01bc9-27e0-4123-8c6b-efb2138f61fd",
    tipoMateria: "03",
    descripcionMateria: "Materia terminada (producto terminado)",
    materialPeligroso: "Sí",
    cveMaterialPeligroso: "123",
    embalaje: "4D",
    descripEmbalaje: "Cajas de Madera contrachapada",
    sectorCofepris: "01",
    nombreIngredienteActivo: "Nombre",
    nomQuimico: "Nombre quimico",
    denominacionGenericaProd: "Denominacion generica",
    denominacionDistintivaProd: "Denominacion distintiva",
    fabricante: "Nombre fabricante",
    fechaCaducidad: "2025-06-19",
    loteMedicamento: "L-2304",
    formaFarmaceutica: "01",
    condicionesEspTransp: "02",
    registroSanitarioFolioAutorizacion: "123456789",
    permisoImportacion: "0987",
    folioImpoVucem: "67378387",
    numCas: "567",
    razonSocialEmpImp: "Nombre o razon social",
    numRegSanPlagCofepris: "33332",
    datosFabricante: "Datos",
    datosFormulador: "Datos",
    datosMaquilador: "Maquilador",
    usoAutorizado: "Au67890",
  },
  documentacionAduanera: [
    {
      tipoDocumento: "01",
      numPedimento: "23  43  0472  8000448",
      rfcImpo: "EKU9003173C9",
      identDocAduanero: "1234567890",
    },
  ],
  cantidadTransporta: [
    {
      cantidad: 1,
      idOrigen: "80100",
      idDestino: "56789",
      cvesTransporte: "01",
    },
  ],
  guiasIdentificacion: [
    {
      numeroGuiaIdentificacion: "1234567890",
      descripGuiaIdentificacion: "328",
      pesoGuiaIdentificacion: 555.001,
    },
  ],
  detalleMercancia: {
    pesoBruto: 5,
    pesoNeto: 3,
    pesoTara: 2,
    unidadPesoMerc: "KGM",
    numPiezas: 1,
  },
});
```

USO POR INSTANCIA: Las necesarias conforme a los conceptos agregados.

#### Mercancia

Objecto referente al concepto en el CFDI

| Propiedades                        | Tipo            | Descripción                                                                                                     |
| ---------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------- |
| bienesTransp                       | string          | Clave del bien transportado según el catálogo del SAT.                                                          |
| cantidad                           | string / number | Cantidad de unidades de la mercancía.                                                                           |
| claveUnidad                        | string          | Clave de unidad de medida del bien.                                                                             |
| descripcion                        | string          | Descripción general de la mercancía.                                                                            |
| pesoEnKg                           | string / number | Peso de la mercancía en kilogramos.                                                                             |
| valorMercancia                     | string / number | (opcional) Valor monetario total de la mercancía.                                                               |
| moneda                             | string          | (opcional) Moneda en la que se expresa el valor.                                                                |
| dimensiones                        | string          | (opcional) Dimensiones físicas del bien con formato 00/00/00(cm-plg)                                            |
| unidad                             | string          | (opcional) Unidad específica de la mercancía.                                                                   |
| fraccionArancelaria                | string          | (opcional) Fracción arancelaria para comercio exterior.                                                         |
| uuidComercioExt                    | string(uuid)    | Requerido si existe fraccion arancelaria. UUID del pedimento de comercio exterior.                              |
| tipoMateria                        | string          | (opcional) Clave del tipo de materia                                                                            |
| descripcionMateria                 | string          | Requerido si existe tipo de materia. Descripción del tipo de materia.                                           |
| materialPeligroso                  | "Sí" / "No"     | (opcional) Indica si la mercancía es material peligroso.                                                        |
| cveMaterialPeligroso               | string          | Requerido si la clave del bienTransp es material peligroso. Clave que identifica el tipo de material peligroso. |
| embalaje                           | string          | Requerido si la clave del bienTransp es material peligroso. Clave del tipo de embalaje utilizado.               |
| descripEmbalaje                    | string          | Requerido si la clave del bienTransp es material peligroso. Descripción del tipo de embalaje.                   |
| sectorCofepris                     | string          | (opcional) Sector regulado por COFEPRIS.                                                                        |
| nombreIngredienteActivo            | string          | Requerido si existe sectorCofepris. Nombre del ingrediente activo.                                              |
| nomQuimico                         | string          | Requerido si existe sectorCofepris. Nombre químico del producto.                                                |
| denominacionGenericaProd           | string          | Requerido si existe sectorCofepris. Denominación genérica del producto.                                         |
| denominacionDistintivaProd         | string          | Requerido si existe sectorCofepris. Denominación distintiva o comercial del producto.                           |
| fabricante                         | string          | Requerido si existe sectorCofepris. Nombre del fabricante del producto.                                         |
| fechaCaducidad                     | string          | Requerido si existe sectorCofepris. Fecha de caducidad del producto.                                            |
| loteMedicamento                    | string          | Requerido si el valor sectorCofepris es "01". Lote del medicamento.                                             |
| formaFarmaceutica                  | string          | Requerido si el valor sectorCofepris es "01". Clave de la forma farmacéutica.                                   |
| condicionesEspTransp               | string          | Requerido si el valor sectorCofepris es "01"/"02"/"03". Clave de condiciones especiales de transporte.          |
| registroSanitarioFolioAutorizacion | string          | Requerido si el valor sectorCofepris es "01"/"03". Folio o número de autorización sanitaria.                    |
| permisoImportacion                 | string          | Requerido si el valor sectorCofepris es "01"/"02"/"03". Clave del permiso de importación.                       |
| folioImpoVucem                     | string          | Requerido si el valor sectorCofepris es distinto a "03".Folio del permiso en VUCEM.                             |
| numCas                             | string          | Requerido si el valor sectorCofepris es "04". Número CAS del componente químico.                                |
| razonSocialEmpImp                  | string          | Requerido si el valor sectorCofepris es "04". Nombre o razón social del importador.                             |
| numRegSanPlagCofepris              | string          | Requerido si el valor sectorCofepris es "04"/"05". Número de registro sanitario o plaguicida.                   |
| datosFabricante                    | string          | Requerido si el valor sectorCofepris es "05". Información adicional sobre el fabricante.                        |
| datosFormulador                    | string          | Requerido si el valor sectorCofepris es "05". Información del formulador.                                       |
| datosMaquilador                    | string          | Requerido si el valor sectorCofepris es "05". Información del maquilador.                                       |
| usoAutorizado                      | string          | Requerido si el valor sectorCofepris es "05". Clave o descripción del uso autorizado del producto.              |

#### documentacionAduanera

Array opcional con soporte para varios objetos

| Propiedades      | Tipo   | Descripción                                     |
| ---------------- | ------ | ----------------------------------------------- |
| tipoDocumento    | string | Clave que indica el tipo de documento aduanero. |
| numPedimento     | string | (opcional) Número de pedimento aduanal.         |
| rfcImpo          | string | (opcional) RFC del importador.                  |
| identDocAduanero | string | (opcional) Identificador del documento aduanero |

#### cantidadTransporta

Array opcional con soporte para varios objetos

| Propiedades    | Tipo            | Descripción                                                |
| -------------- | --------------- | ---------------------------------------------------------- |
| cantidad       | string / number | Cantidad de mercancía transportada entre origen y destino. |
| idOrigen       | string          | Identificador de la ubicación de origen.                   |
| idDestino      | string          | Identificador de la ubicación de destino.                  |
| cvesTransporte | string          | Clave del tipo de transporte utilizado.                    |

#### guiasIdentificacion

Array opcional con soporte para varios objetos

| Propiedades               | Tipo            | Descripción                                                  |
| ------------------------- | --------------- | ------------------------------------------------------------ |
| numeroGuiaIdentificacion  | string          | Número o folio de la guía de identificación de la mercancía. |
| descripGuiaIdentificacion | string          | Descripción de la guía o del contenido que identifica.       |
| pesoGuiaIdentificacion    | string / number | Peso asociado a la guía de identificación, en kilogramos.    |

#### detalleMercancia

Objecto opcional.

| Propiedades    | Tipo            | Descripción                                                |
| -------------- | --------------- | ---------------------------------------------------------- |
| pesoBruto      | string / number | Peso bruto de la mercancía, incluyendo empaque.            |
| pesoNeto       | string / number | Peso neto de la mercancía, sin empaque.                    |
| pesoTara       | string / number | Diferncia entre el peso bruto menos el peso neto.          |
| unidadPesoMerc | string          | Unidad de medida del peso.                                 |
| numPiezas      | string / number | (opcional) Número total de piezas físicas de la mercancía. |

### **createNodeTipoFigura**

Construye el nodo `cartaporte31:TiposFigura`, donde se especifica la información de la persona o entidad que participa en el traslado de mercancías, como el operador, intermediario, agente de transporte, entre otros. Este nodo es esencial para definir la responsabilidad y participación de personas en el proceso logístico.

```javascript
cartaporte.createNodeTipoFigura({
  tipoFigura: {
    nombreFigura: "NombreFigura",
    tipoFigura: "01",
    rfcFigura: "EKU9003173C9",
    numLicencia: "324567890",
    numRegIdTribFigura: "65432323",
    residenciaFiscalFigura: "USA",
  },
  domicilio: {
    codigoPostal: 50485,
    estado: "MEX",
    pais: "MEX",
    calle: "Calle ejemplo",
    colonia: "Colonia",
    localidad: "Localidad",
    municipio: "Municipio",
    numeroExterior: 0,
    numeroInterior: 12,
    referencia: "Referencia",
  },
  partesTransporte: [{ parteTransporte: "1234567890" }],
});
```

USO POR INSTANCIA: 1 a más

#### tipofigura

Objeto obligatorio para establecer datos del operador, agente u otro.

| Propiedades            | Tipo   | Descripción                                                                                      |
| ---------------------- | ------ | ------------------------------------------------------------------------------------------------ |
| nombreFigura           | string | Nombre completo de la persona o entidad que participa en el traslado.                            |
| tipoFigura             | string | Clave que indica el tipo de figura.                                                              |
| rfcFigura              | string | (opcional) RFC de la figura que realiza el traslado o participa en él.                           |
| numLicencia            | string | (opcional) Número de licencia del operador.                                                      |
| numRegIdTribFigura     | string | (opcional) Número de registro de identificación tributaria del operador u otro si es extranjero. |
| residenciaFiscalFigura | string | Requerido si el operador u otro es extranjero. Clave del país de residencia fiscal de la figura. |

#### domicilio

Objeto opcional para establecer el domicilio del tipo figura.

| Propiedades    | Tipo            | Descripción                                                   |
| -------------- | --------------- | ------------------------------------------------------------- |
| codigoPostal   | string / number | Código postal del domicilio.                                  |
| estado         | string          | Clave del estado según el catálogo del SAT.                   |
| pais           | string          | Clave del país (por ejemplo, "MEX" para México).              |
| calle          | string          | (opcional) Nombre de la calle del domicilio.                  |
| colonia        | string          | (opcional) Colonia o barrio.                                  |
| localidad      | string          | (opcional) Localidad o ciudad.                                |
| municipio      | string          | (opcional) Municipio o delegación.                            |
| numeroExterior | string / number | (opcional) Número exterior del domicilio.                     |
| numeroInterior | string / number | (opcional) Número interior del domicilio.                     |
| referencia     | string          | (opcional) Información adicional para localizar el domicilio. |

#### partesTransporte

Array opcional de objetos.

| Propiedades     | Tipo   | Descripción                                                                              |
| --------------- | ------ | ---------------------------------------------------------------------------------------- |
| parteTransporte | string | Clave que representa una parte específica del transporte en la que interviene la figura. |

### **createXmlSellado**

Para generar el XML con complemento carta porte sellado use este método.

```javascript
await cartaporte.createXmlSellado();
```

### **createJsonSellado**

Si requiere el CFDI con complemento carta porte en un objeto JSON use este método.

```javascript
await cartaporte.createJsonSellado(simplified);
```

| Argumento  | Tipo    | Descripción                                                                                                                                                          |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| simplified | boolean | (opcional) Si se establece en `true`, genera un JSON más limpio sin prefijos (como `"cfdi:"`) ni atributos con `"@_"`. Por defecto, se mantiene el formato completo. |

## **CartaPorteAutotransporte**

Con esta clase puede generar el complemento carta porte para autotransporte.

```javascript
const cartaporte = new CartaPorteAutotransporte(xml, configCfdi);
```

| Argumento  | Tipo          | Descripción                                                                         |
| ---------- | ------------- | ----------------------------------------------------------------------------------- |
| xml        | string / json | Contenido del CFDI de tipo ingreso previamente generado como string o como un json. |
| configCfdi | ConfigCfdi    | Instancia de ConfigCfdi previamente hecha.                                          |

### **createNodeAutotransporte**

Te permite establecer información relevante para el nodo `cartaporte31:Autotransporte`

```javascript
cartaporte.createNodeAutotransporte({
  permSct: "TPAF01",
  numPermisoSct: "NumPermisoSCT1",
});
```

USO POR INSTANCIA: 1

| Propiedades   | Tipo   | Descripción                                                                                   |
| ------------- | ------ | --------------------------------------------------------------------------------------------- |
| permSct       | string | Clave del tipo de permiso proporcionado por la SICT correspondiente al autotransporte a usar. |
| numPermisoSct | string | Número del permiso otorgado por la SICT del autotransporte.                                   |

### **createNodeIdentificacionVehicular**

Define los atributos del nodo `cartaporte31:IdentificacionVehicular`, especificando las características principales del vehículo utilizado para el transporte, como el año modelo, configuración vehicular, peso bruto y placa. Este nodo es esencial para identificar formalmente el medio de transporte terrestre.

```javascript
cartaporte.createNodeIdentificacionVehicular({
  placaVm: "plac892",
  anioModeloVm: 2025,
  configVehicular: "VL",
  pesoBrutoVehicular: "10",
});
```

USO POR INSTANCIA: 1

| Propiedades        | Tipo            | Descripción                                                            |
| ------------------ | --------------- | ---------------------------------------------------------------------- |
| placaVm            | string          | Placa del vehículo motriz.                                             |
| anioModeloVm       | string / number | Año modelo del vehículo.                                               |
| configVehicular    | string          | Clave que indica la configuración vehicular según el catálogo del SAT. |
| pesoBrutoVehicular | string / numbre | Peso bruto del vehículo en toneladas o kilogramos.                     |

### **createNodeSeguros**

Genera el nodo `cartaporte31:Seguros`, donde se especifica la información relacionada con el seguro de responsabilidad civil del vehículo que transporta la mercancía, incluyendo la aseguradora y el número de póliza correspondiente.

```javascript
cartaporte.createNodeSeguros({
  aseguraRespCivil: "AseguraRespCivil",
  polizaRespCivil: "123456789",
  aseguraCarga: "Aseguradora",
  polizaCarga: "123456789",
  aseguraMedAmbiente: "Aseguradora en Medio ambiente",
  polizaMedAmbiente: "65432",
  primaSeguro: 43893.48,
});
```

USO POR INSTANCIA: 1

| Propiedades        | Tipo            | Descripción                                                                                                  |
| ------------------ | --------------- | ------------------------------------------------------------------------------------------------------------ |
| aseguraRespCivil   | string          | Nombre de la aseguradora que cubre la responsabilidad civil del vehículo utilizado en el traslado.           |
| polizaRespCivil    | string          | Número de póliza del seguro de responsabilidad civil.                                                        |
| aseguraCarga       | string          | (opcional) Nombre de la aseguradora que cubre los riesgos relacionados con la carga transportada.            |
| polizaCarga        | string          | Requerido si existe una aseguradora para la carga. Número de póliza del seguro de carga.                     |
| aseguraMedAmbiente | string          | (opcional) Nombre de la aseguradora que cubre daños al medio ambiente derivados del traslado.                |
| polizaMedAmbiente  | string          | Requerido si existe una aseguradora que cubre daños al med. ambiente. Número de póliza del seguro ambiental. |
| primaSeguro        | string / number | (opcional) Monto de la prima total pagada por los seguros relacionados con el transporte.                    |

### **createNodeRemolques**

Genera el nodo `cartaporte31:Remolque`, donde se especifica la información del remolque o semirremolque utilizado en el traslado, incluyendo su placa y subtipo conforme al catálogo del SAT. Este nodo se utiliza cuando el vehículo cuenta con uno o dos remolques.

```javascript
cartaporte.createNodeRemolques({
  placa: "placa12",
  subTipoRem: "CTR007",
});
```

USO POR INSTANCIA: 0 a 2

| Propiedades | Tipo   | Descripción                                               |
| ----------- | ------ | --------------------------------------------------------- |
| placa       | string | Placa del remolque o semirremolque.                       |
| subTipoRem  | string | Clave del subtipo de remolque, según el catálogo del SAT. |
