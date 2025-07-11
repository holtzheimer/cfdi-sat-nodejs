# createNodeUbicacion

Este método permite agregar un nodo `cartaporte31:Ubicacion` al complemento Carta Porte.
Define la información relacionada con un punto logístico del traslado, ya sea de origen o destino, incluyendo datos del remitente o destinatario, así como su domicilio, si aplica.

USO POR INSTANCIA: 2 (una de "Origen" y otra de "Destino") a ilimitado.

```ts
cartaporte.createNodeUbicacion({
  ubicacion: {...},
  domicilio: {...},
});
```

::: warning CONSIDERACION
Es importante que los datos coincidan con el tipo de transporte y el país involucrado.
:::

## Subpropiedad: ubicacion

La subpropiedad **ubicacion** representa el **punto logístico** involucrado en el traslado de la mercancía.
Este punto **puede ser de origen** (donde inicia el transporte) **o de destino** (donde concluye), y su información es fundamental para el complemento Carta Porte.

Dentro de esta subpropiedad se incluyen datos clave como la fecha y hora de salida o llegada, el tipo de ubicación, el RFC del remitente o destinatario, identificadores, distancias y, en su caso, información adicional requerida por ciertos medios de transporte, como estaciones, navegación o residencia fiscal.

Esta estructura permite que el SAT pueda identificar claramente de dónde parte y a dónde llega la mercancía, cumpliendo con los requisitos logísticos y fiscales del traslado.

```ts
cartaporte.createNodeUbicacion({
  ubicacion: {  // [!code focus]
    fechaHoraSalidaLlegada: "2023-08-01T00:00:01",  // [!code focus]
    tipoUbicacion: "Origen",  // [!code focus]
    rfcRemitenteDestinatario: "XEXX010101000",  // [!code focus]
    idUbicacion: "29838",  // [!code focus]
    distanciaRecorrida: 1,  // [!code focus]
    nombreRemitenteDestinatario: "NombreRem",  // [!code focus]
    numEstacion: "PM001",  // [!code focus]
    navegacionTrafico: "Altura",  // [!code focus]
    nombreEstacion: "Nombre de la estacion",  // [!code focus]
    tipoEstacion: "01",  // [!code focus]
    numRegIdTrib: 123456,  // [!code focus]
    residenciaFiscal: "USA",  // [!code focus]
  },
  domicilio: {...},
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad                   | Tipo                  | Descripción                                                                                           |
| --------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------- |
| fechaHoraSalidaLlegada      | string                | Fecha y hora de salida o llegada de la mercancía.                                                     |
| tipoUbicacion               | `Origen` - `Destino`  | Indica si es origen o destino del traslado.                                                           |
| rfcRemitenteDestinatario    | string                | RFC del remitente o destinatario segun tipo de ubicación.                                             |
| idUbicacion                 | string                | (opcional) Identificador único de la ubicación.                                                       |
| distanciaRecorrida          | string - number       | Requerido si el tipo de ubicacion es "Destino". Distancia recorrida desde la ubicación anterior.      |
| nombreRemitenteDestinatario | string                | (opcional) Nombre del remitente o destinatario.                                                       |
| numEstacion                 | `c_Estaciones`        | (opcional) Clave de la estación de origen o destino para el traslado.                                 |
| navegacionTrafico           | `Altura` - `Cabotaje` | (opcional) Tipo de puerto de origen o destino en el cual se documentan los bienes.                    |
| nombreEstacion              | string                | (opcional) Nombre de la estación de origen o destino por la que se pasa para efectuar el traslado.    |
| tipoEstacion                | `c_TipoEstacion`      | (opcional) Clave del tipo de estación por el que pasan los bienes y/o mercancías durante su traslado. |
| numRegIdTrib                | string                | (opcional) Número de registro fiscal del extranjero.                                                  |
| residenciaFiscal            | `c_Pais`              | (opcional) País de residencia fiscal del remitente/destinatario.                                      |

## Subpropiedad: domicilio

La subpropiedad domicilio complementa la **información de la ubicación logística** especificada en la subpropiedad ubicacion, proporcionando los datos físicos del lugar de salida o destino de la mercancía.

Esta estructura contiene elementos como el código postal, estado, país, calle, colonia, localidad, entre otros campos que permiten identificar de manera detallada la dirección del punto logístico.

Aunque es una sección opcional, es altamente recomendable incluirla siempre que se disponga de los datos, ya que en muchos casos es obligatoria dependiendo del tipo de mercancía o del medio de transporte utilizado.

Proporcionar un domicilio completo no solo asegura el cumplimiento con los requisitos del SAT, sino que también facilita auditorías, validaciones automáticas y la trazabilidad del traslado.

```ts
cartaporte.createNodeUbicacion({
  ubicacion: {...},
  domicilio: { // [!code focus]
    codigoPostal: 50485, // [!code focus]
    estado: "MEX", // [!code focus]
    pais: "MEX", // [!code focus]
    calle: "Calle ejemplo", // [!code focus]
    colonia: "0001", // [!code focus]
    localidad: "01", // [!code focus]
    municipio: "001", // [!code focus]
    numeroExterior: 0, // [!code focus]
    numeroInterior: 12, // [!code focus]
    referencia: "Referencia", // [!code focus]
  }, // [!code focus]
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad      | Tipo            | Descripción                                                   |
| -------------- | --------------- | ------------------------------------------------------------- |
| codigoPostal   | string - number | Código postal de la ubicación.                                |
| estado         | `c_Estado`      | Clave del estado de la ubicación.                             |
| pais           | `c_Pais`        | Clave del país de la ubicación.                               |
| calle          | string          | (opcional) Nombre de la calle de la ubicación.                |
| colonia        | `c_Colonia`     | (opcional) Clave de la colonia o barrio.                      |
| localidad      | `c_Localidad`   | (opcional) Localidad o ciudad.                                |
| municipio      | `c_Municipio`   | (opcional) Municipio o delegación.                            |
| numeroExterior | string - number | (opcional) Número exterior de la ubicación.                   |
| numeroInterior | string - number | (opcional) Número interior de la ubicación.                   |
| referencia     | string          | (opcional) Información adicional para localizar la ubicación. |

<!-- ## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#ubicacion">`Lista de errores:Ubicacion`</a> para tener la lista de errores que se puede generar.
 -->
