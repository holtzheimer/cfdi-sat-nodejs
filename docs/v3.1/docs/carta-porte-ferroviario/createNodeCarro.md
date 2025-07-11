# createNodeCarro

Genera el nodo `cartaporte31:Carro`, correspondiente al transporte ferroviario dentro del complemento Carta Porte. Este nodo permite especificar la información del carro ferroviario y los contenedores que transporta.

Este nodo se incluye dentro del bloque `TransporteFerroviario`.

USO POR INSTANCIA: 1 a ilimitados.

```ts
cartaporte.createNodeCarro({
  carro: {...},
  contenedores: [...],
});
```

## Subpropiedad: carro

Este objeto describe el carro ferroviario que transporta los contenedores con mercancía. Es obligatorio y representa un vehículo ferroviario específico dentro de la composición del tren.

```ts
cartaporte.createNodeCarro({
  carro: { // [!code focus]
    guiaCarro: "1236", // [!code focus]
    matriculaCarro: "RTYUI8", // [!code focus]
    tipoCarro: "TC08", // [!code focus]
    toneladasNetasCarro: 10, // [!code focus]
  }, // [!code focus]
  contenedores: [...],
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad           | Tipo            | Descripción                                        |
| ------------------- | --------------- | -------------------------------------------------- |
| guiaCarro           | string          | Número de guía asociado al carro ferroviario.      |
| matriculaCarro      | string          | Matrícula o número identificador del carro.        |
| tipoCarro           | `c_TipoCarro`   | Clave del tipo de carro ferroviario utilizado.     |
| toneladasNetasCarro | string - number | Toneladas netas de carga transportada en el carro. |

## Subpropiedad: contenedores

Cada objeto en este arreglo representa un contenedor específico cargado dentro del carro ferroviario. El nodo Contenedor se repite por cada entrada en este arreglo.

```ts
cartaporte.createNodeCarro({
  carro: {...},
  contenedores: [ // [!code focus]
    { // [!code focus]
      pesoContenedorVacio: 5, // [!code focus]
      pesoNetoMercancia: 8, // [!code focus]
      tipoContenedor: "TC01", // [!code focus]
    }, // [!code focus]
  ], // [!code focus]
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad           | Tipo               | Descripción                               |
| ------------------- | ------------------ | ----------------------------------------- |
| pesoContenedorVacio | string - number    | Peso del contenedor cuando está vacío.    |
| pesoNetoMercancia   | string - number    | Peso neto de la mercancía contenida.      |
| tipoContenedor      | `c_TipoContenedor` | Clave del tipo de contenedor ferroviario. |

<!-- ## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#carro">`Lista de errores:Carro`</a> para tener la lista de errores que se puede generar. -->
