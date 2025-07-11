# createNodeTipoFigura

Este método construye el nodo cartaporte31:TiposFigura, el cual representa a las personas físicas o morales que participan directamente en el traslado de las mercancías, tales como:

- Operador del transporte (chofer)

- Intermediarios o agentes logísticos

- Agentes de transporte internacional

- Propietarios de las unidades, entre otros

Este nodo es esencial para identificar la responsabilidad y rol que cada figura tiene dentro del proceso logístico. También se puede asociar un domicilio y las partes del transporte utilizadas.

USO POR INSTANCIA: 1 a ilimitado.

```ts
cartaporte.createNodeTipoFigura({
  tipoFigura: {...},
  domicilio: {...},
  partesTransporte: [...],
});
```

## Subpropiedad: tipoFigura

Define la información fiscal y general de la persona o entidad que participa en el traslado.

```ts
cartaporte.createNodeTipoFigura({
  tipoFigura: {   // [!code focus]
    nombreFigura: "NombreFigura",   // [!code focus]
    tipoFigura: "01",   // [!code focus]
    rfcFigura: "EKU9003173C9",   // [!code focus]
    numLicencia: "324567890",   // [!code focus]
    numRegIdTribFigura: "65432323",   // [!code focus]
    residenciaFiscalFigura: "USA",   // [!code focus]
  },   // [!code focus]
  domicilio: {...},
  partesTransporte: [...],
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad              | Tipo                 | Descripción                                                                                      |
| ---------------------- | -------------------- | ------------------------------------------------------------------------------------------------ |
| nombreFigura           | string               | Nombre completo de la persona o entidad que participa en el traslado.                            |
| tipoFigura             | `c_FiguraTransporte` | Clave que indica el tipo de figura.                                                              |
| rfcFigura              | string               | (opcional) RFC de la figura que realiza el traslado o participa en él.                           |
| numLicencia            | string               | (opcional) Número de licencia del operador.                                                      |
| numRegIdTribFigura     | string               | (opcional) Número de registro de identificación tributaria del operador u otro si es extranjero. |
| residenciaFiscalFigura | `c_Pais`             | Requerido si el operador u otro es extranjero. Clave del país de residencia fiscal de la figura. |

## Subpropiedad: domicilio

Define el domicilio asociado a la figura, siguiendo el mismo formato que el nodo `Ubicacion`.

```ts
cartaporte.createNodeTipoFigura({
  tipoFigura: {...},
  domicilio: {// [!code focus]
    codigoPostal: 50485,// [!code focus]
    estado: "MEX",// [!code focus]
    pais: "MEX",// [!code focus]
    calle: "Calle ejemplo",// [!code focus]
    colonia: "Colonia",// [!code focus]
    localidad: "Localidad",// [!code focus]
    municipio: "Municipio",// [!code focus]
    numeroExterior: 0,// [!code focus]
    numeroInterior: 12,// [!code focus]
    referencia: "Referencia",// [!code focus]
  },// [!code focus]
  partesTransporte: [...],
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad      | Tipo            | Descripción                                                   |
| -------------- | --------------- | ------------------------------------------------------------- |
| codigoPostal   | string - number | Código postal del domicilio.                                  |
| estado         | `c_Estado`      | Clave del estado del domicilio.                               |
| pais           | `c_Pais`        | Clave del país del domicilio.                                 |
| calle          | string          | (opcional) Nombre de la calle del domicilio.                  |
| colonia        | `c_Colonia`     | (opcional) Clave de la colonia o barrio.                      |
| localidad      | `c_Localidad`   | (opcional) Localidad o ciudad.                                |
| municipio      | `c_Municipio`   | (opcional) Municipio o delegación.                            |
| numeroExterior | string - number | (opcional) Número exterior del domicilio.                     |
| numeroInterior | string - number | (opcional) Número interior del domicilio.                     |
| referencia     | string          | (opcional) Información adicional para localizar el domicilio. |

## Subpropiedad: partesTransporte

Permite asociar las partes o unidades específicas del transporte (ej. tractocamiones, contenedores, embarcaciones, etc.) que la figura está utilizando o en las que participa.

> 💡 Este campo suele ser obligatorio cuando se trata de figuras como operadores, y cuando se hayan definido previamente nodos como Remolques, Carro, Contenedor, etc.

```ts
cartaporte.createNodeTipoFigura({
  tipoFigura: {...},
  domicilio: {...},
  partesTransporte: [ // [!code focus]
    { parteTransporte: "PT01" } // [!code focus]
  ], // [!code focus]
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad       | Tipo                | Descripción                                                                              |
| --------------- | ------------------- | ---------------------------------------------------------------------------------------- |
| parteTransporte | `c_ParteTransporte` | Clave que representa una parte específica del transporte en la que interviene la figura. |

<!-- ## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#tipo-figura">`Lista de errores:TipoFigura`</a> para tener la lista de errores que se puede generar.
 -->
