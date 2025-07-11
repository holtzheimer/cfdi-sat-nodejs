# createNodeMercancia

Este método permite agregar una nueva entrada al nodo cartaporte31:Mercancias.
Cada entrada representa una mercancía individual transportada, incluyendo detalles como:

- Clasificación arancelaria

- Datos físicos (peso, dimensiones)

- Identificación sanitaria y aduanera

- Embalaje y condiciones especiales

- Cantidades transportadas por tramo

- Documentación asociada y más

Este nivel de detalle es crucial para cumplir con los requerimientos del complemento Carta Porte 3.1, especialmente en operaciones complejas como comercio exterior, sector salud o traslado de mercancía peligrosa.

```ts
cartaporte.createNodeMercancia({
  mercancia: {...},
  documentacionAduanera: [...],
  cantidadTransporta: [...],
  guiasIdentificacion: [...],
  detalleMercancia: {...},
});
```

## Subpropiedad: mercancia

Contiene los datos comerciales, físicos y regulatorios del producto transportado.
Incluye campos obligatorios como clave del bien (bienesTransp), cantidad, peso, descripción, así como opcionales relacionados con sanidad, comercio exterior o seguridad.

```ts
cartaporte.createNodeMercancia({
  mercancia: { // [!code focus]
    bienesTransp: "11121900", // [!code focus]
    cantidad: 1, // [!code focus]
    claveUnidad: "KGM", // [!code focus]
    descripcion: "mercancia", // [!code focus]
    pesoEnKg: 15.048, // [!code focus]
    valorMercancia: 109.08, // [!code focus]
    moneda: "MXN", // [!code focus]
    dimensiones: "30/40/30cm", // [!code focus]
    unidad: "KGM", // [!code focus]
    fraccionArancelaria: "0101290300", // [!code focus]
    uuidComercioExt: "a3f01bc9-27e0-4123-8c6b-efb2138f61fd", // [!code focus]
    tipoMateria: "03", // [!code focus]
    descripcionMateria: "Materia terminada (producto terminado)", // [!code focus]
    materialPeligroso: "Sí", // [!code focus]
    cveMaterialPeligroso: "123", // [!code focus]
    embalaje: "4D", // [!code focus]
    descripEmbalaje: "Cajas de Madera contrachapada", // [!code focus]
    sectorCofepris: "01", // [!code focus]
    nombreIngredienteActivo: "Nombre", // [!code focus]
    nomQuimico: "Nombre quimico", // [!code focus]
    denominacionGenericaProd: "Denominacion generica", // [!code focus]
    denominacionDistintivaProd: "Denominacion distintiva", // [!code focus]
    fabricante: "Nombre fabricante", // [!code focus]
    fechaCaducidad: "2025-06-19", // [!code focus]
    loteMedicamento: "L-2304", // [!code focus]
    formaFarmaceutica: "01", // [!code focus]
    condicionesEspTransp: "02", // [!code focus]
    registroSanitarioFolioAutorizacion: "123456789", // [!code focus]
    permisoImportacion: "0987", // [!code focus]
    folioImpoVucem: "67378387", // [!code focus]
    numCas: "567", // [!code focus]
    razonSocialEmpImp: "Nombre o razon social", // [!code focus]
    numRegSanPlagCofepris: "33332", // [!code focus]
    datosFabricante: "Datos", // [!code focus]
    datosFormulador: "Datos", // [!code focus]
    datosMaquilador: "Maquilador", // [!code focus]
    usoAutorizado: "Au67890", // [!code focus]
  }, // [!code focus]
  documentacionAduanera: [...],
  cantidadTransporta: [...],
  guiasIdentificacion: [...],
  detalleMercancia: {...},
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad                          | Tipo                      | Descripción                                                                                                     |
| ---------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| bienesTransp                       | `c_ClaveProdServ`         | Clave del bien transportado según el catálogo del SAT.                                                          |
| cantidad                           | string - number           | Cantidad de unidades de la mercancía.                                                                           |
| claveUnidad                        | `c_ClaveUnidad`           | Clave de unidad de medida del bien.                                                                             |
| descripcion                        | string                    | Descripción general de la mercancía.                                                                            |
| pesoEnKg                           | string - number           | Peso de la mercancía en kilogramos.                                                                             |
| valorMercancia                     | string - number           | (opcional) Valor monetario total de la mercancía.                                                               |
| moneda                             | `c_Moneda`                | (opcional) Moneda en la que se expresa el valor.                                                                |
| dimensiones                        | string                    | (opcional) Dimensiones físicas del bien con formato 00/00/00(cm-plg)                                            |
| unidad                             | string                    | (opcional) Unidad específica de la mercancía.                                                                   |
| fraccionArancelaria                | string                    | (opcional) Fracción arancelaria para comercio exterior.                                                         |
| uuidComercioExt                    | string                    | Requerido si existe fraccion arancelaria. UUID del pedimento de comercio exterior.                              |
| tipoMateria                        | `c_TipoMateria`           | (opcional) Clave del tipo de materia.                                                                           |
| descripcionMateria                 | string                    | Requerido si existe tipo de materia. Descripción del tipo de materia.                                           |
| materialPeligroso                  | `Sí` - `No`               | (opcional) Indica si la mercancía es material peligroso.                                                        |
| cveMaterialPeligroso               | `c_MaterialPeligroso`     | Requerido si la clave del bienTransp es material peligroso. Clave que identifica el tipo de material peligroso. |
| embalaje                           | string                    | Requerido si la clave del bienTransp es material peligroso. Clave del tipo de embalaje utilizado.               |
| descripEmbalaje                    | string                    | Requerido si la clave del bienTransp es material peligroso. Descripción del tipo de embalaje.                   |
| sectorCofepris                     | `c_SectorCOFEPRIS`        | (opcional) Sector regulado por COFEPRIS.                                                                        |
| nombreIngredienteActivo            | string                    | Requerido si existe sectorCofepris. Nombre del ingrediente activo.                                              |
| nomQuimico                         | string                    | Requerido si existe sectorCofepris. Nombre químico del producto.                                                |
| denominacionGenericaProd           | string                    | Requerido si existe sectorCofepris. Denominación genérica del producto.                                         |
| denominacionDistintivaProd         | string                    | Requerido si existe sectorCofepris. Denominación distintiva o comercial del producto.                           |
| fabricante                         | string                    | Requerido si existe sectorCofepris. Nombre del fabricante del producto.                                         |
| fechaCaducidad                     | string                    | Requerido si existe sectorCofepris. Fecha de caducidad del producto en formato AAAA-MM-DD                       |
| formaFarmaceutica                  | `c_FormaFarmaceutica`     | Requerido si el valor sectorCofepris es "01". Clave de la forma farmacéutica.                                   |
| condicionesEspTransp               | `c_CondicionesEspeciales` | Requerido si el valor sectorCofepris es "01"/"02"/"03". Clave de condiciones especiales de transporte.          |
| registroSanitarioFolioAutorizacion | string                    | Requerido si el valor sectorCofepris es "01"/"03". Folio o número de autorización sanitaria.                    |
| permisoImportacion                 | string                    | Requerido si el valor sectorCofepris es "01"/"02"/"03". Clave del permiso de importación.                       |
| folioImpoVucem                     | string                    | Requerido si el valor sectorCofepris es distinto a "03".Folio del permiso en VUCEM.                             |
| numCas                             | string                    | Requerido si el valor sectorCofepris es "04". Número CAS del componente químico.                                |
| razonSocialEmpImp                  | string                    | Requerido si el valor sectorCofepris es "04". Nombre o razón social del importador.                             |
| numRegSanPlagCofepris              | string                    | Requerido si el valor sectorCofepris es "04"/"05". Número de registro sanitario o plaguicida.                   |
| datosFabricante                    | string                    | Requerido si el valor sectorCofepris es "05". Información adicional sobre el fabricante.                        |
| datosFormulador                    | string                    | Requerido si el valor sectorCofepris es "05". Información del formulador.                                       |
| datosMaquilador                    | string                    | Requerido si el valor sectorCofepris es "05". Información del maquilador.                                       |
| usoAutorizado                      | string                    | Requerido si el valor sectorCofepris es "05". Clave o descripción del uso autorizado del producto.              |

## Subpropiedad: documentacionAduanera

Arreglo que representa los documentos aduaneros asociados (como pedimentos).
Se usa especialmente en operaciones de importación/exportación.

Esta propiedad es opcional

```ts
cartaporte.createNodeMercancia({
  mercancia: {...},
   documentacionAduanera: [ // [!code focus]
    { // [!code focus]
      tipoDocumento: "01", // [!code focus]
      numPedimento: "23  43  0472  8000448", // [!code focus]
      rfcImpo: "EKU9003173C9", // [!code focus]
      identDocAduanero: "1234567890", // [!code focus]
    }, // [!code focus]
  ], // [!code focus]
  cantidadTransporta: [...],
  guiasIdentificacion: [...],
  detalleMercancia: {...},
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad        | Tipo                  | Descripción                                      |
| ---------------- | --------------------- | ------------------------------------------------ |
| tipoDocumento    | `c_DocumentoAduanero` | Clave que indica el tipo de documento aduanero.  |
| numPedimento     | string                | (opcional) Número de pedimento aduanal.          |
| rfcImpo          | string                | (opcional) RFC del importador.                   |
| identDocAduanero | string                | (opcional) Identificador del documento aduanero. |

## Subpropiedad: cantidadTransporta

Lista que permite detallar cuántas unidades se trasladan por cada tramo (origen/destino).
Especialmente útil para identificar el flujo logístico de cada mercancía.

Esta propiedad es opcional

```ts
cartaporte.createNodeMercancia({
  mercancia: {...},
  documentacionAduanera: [...],
  cantidadTransporta: [ // [!code focus]
    { // [!code focus]
      cantidad: 1, // [!code focus]
      idOrigen: "80100", // [!code focus]
      idDestino: "56789", // [!code focus]
      cvesTransporte: "01", // [!code focus]
    }, // [!code focus]
  ], // [!code focus]
  guiasIdentificacion: [...],
  detalleMercancia: {...},
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad      | Tipo              | Descripción                                                |
| -------------- | ----------------- | ---------------------------------------------------------- |
| cantidad       | string - number   | Cantidad de mercancía transportada entre origen y destino. |
| idOrigen       | string            | Identificador de la ubicación de origen.                   |
| idDestino      | string            | Identificador de la ubicación de destino.                  |
| cvesTransporte | `c_CveTransporte` | Clave del tipo de transporte utilizado.                    |

## Subpropiedad: guiasIdentificacion

Permite registrar números de guía o documentos que identifican la mercancía individualmente.

Esta propiedad es opcional

```ts
cartaporte.createNodeMercancia({
  mercancia: {...},
  documentacionAduanera: [...],
  cantidadTransporta: [...],
  guiasIdentificacion: [ // [!code focus]
    {// [!code focus]
      numeroGuiaIdentificacion: "1234567890",// [!code focus]
      descripGuiaIdentificacion: "328",// [!code focus]
      pesoGuiaIdentificacion: 555.001,// [!code focus]
    },// [!code focus]
  ],// [!code focus]
  detalleMercancia: {...},
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad                 | Tipo            | Descripción                                                  |
| ------------------------- | --------------- | ------------------------------------------------------------ |
| numeroGuiaIdentificacion  | string          | Número o folio de la guía de identificación de la mercancía. |
| descripGuiaIdentificacion | string          | Descripción de la guía o del contenido que identifica.       |
| pesoGuiaIdentificacion    | string - number | Peso asociado a la guía de identificación, en kilogramos.    |

## Subpropiedad: detalleMercancia

Contiene detalles físicos adicionales sobre la mercancía, como pesos netos y brutos, tara y número de piezas.

Esta propiedad es opcional

```ts
cartaporte.createNodeMercancia({
  mercancia: {...},
  documentacionAduanera: [...],
  cantidadTransporta: [...],
  guiasIdentificacion: [...],
  detalleMercancia: {// [!code focus]
    pesoBruto: 5,// [!code focus]
    pesoNeto: 3,// [!code focus]
    pesoTara: 2,// [!code focus]
    unidadPesoMerc: "KGM",// [!code focus]
    numPiezas: 1,// [!code focus]
  },// [!code focus]
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad      | Tipo                | Descripción                                                |
| -------------- | ------------------- | ---------------------------------------------------------- |
| pesoBruto      | string - number     | Peso bruto de la mercancía, incluyendo empaque.            |
| pesoNeto       | string - number     | Peso neto de la mercancía, sin empaque.                    |
| pesoTara       | string - number     | Diferencia entre el peso bruto menos el peso neto.         |
| unidadPesoMerc | `c_ClaveUnidadPeso` | Unidad de medida del peso.                                 |
| numPiezas      | string - number     | (opcional) Número total de piezas físicas de la mercancía. |

## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#mercancia">`Lista de errores:Mercancia`</a> para tener la lista de errores que se puede generar.
