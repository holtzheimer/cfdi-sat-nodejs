# createNodeContenedor

Genera el nodo `cartaporte31:Contenedor`, utilizado en el transporte marítimo dentro del complemento Carta Porte. Este nodo describe el contenedor marítimo utilizado para transportar mercancías, así como los remolques relacionados que lo movilizan dentro del territorio nacional.

Este nodo se integra dentro del nodo `TransporteMaritimo`.

USO POR INSTANCIA: 0 a ilimitados.

```ts
cartaporte.createNodeContenedor({
  contenedor: {...},
  remolques: [...],
});
```

## Subpropiedad: contenedor

Este objeto define los atributos específicos del contenedor marítimo utilizado en el traslado de mercancías. Es requerido dentro del método `createNodeContenedor`.

```ts
cartaporte.createNodeContenedor({
  contenedor: { // [!code focus]
    tipoContenedor: "CM011", // [!code focus]
    fechaCertificacionCcp: "2024-06-20T11:11:00", // [!code focus]
    placaVmCcp: "JNG7683", // [!code focus]
    idCcpRelacionado: idccp, // [!code focus]
    matriculaContenedor: "Matricula", // [!code focus]
    numPrecinto: "123456789", // [!code focus]
  }, // [!code focus]
  remolques: [...],
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad             | Tipo                   | Descripción                                                            |
| --------------------- | ---------------------- | ---------------------------------------------------------------------- |
| tipoContenedor        | `c_ContenedorMaritimo` | Clave del tipo de contenedor utilizado.                                |
| fechaCertificacionCcp | string                 | Fecha en que se certificó el contenedor en formato AAAA-MM-DDTHH:MM:ss |
| placaVmCcp            | string                 | Placa del vehículo marítimo que transporta el contenedor.              |
| idCcpRelacionado      | string                 | ID de CCP relacionado con el contenedor.                               |
| matriculaContenedor   | string                 | Matrícula del contenedor.                                              |
| numPrecinto           | string                 | Número de precinto o sello de seguridad del contenedor.                |

## Subpropiedad: remolques

El arreglo `remolques` representa uno o más remolques utilizados para transportar el contenedor dentro del territorio nacional. Cada objeto dentro del arreglo describe un remolque individual.

```ts
cartaporte.createNodeContenedor({
  contenedor: {...},
  remolques: [ // [!code focus]
    { // [!code focus]
      placaCcp: "456789v", // [!code focus]
      subTipoRemCcp: "CTR001", // [!code focus]
    }, // [!code focus]
  ], // [!code focus]
});
```

### Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad     | Tipo           | Descripción                              |
| ------------- | -------------- | ---------------------------------------- |
| placaCcp      | string         | Placa del remolque o unidad de arrastre. |
| subTipoRemCcp | `c_SubTipoRem` | Clave del subtipo de remolque.           |

## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#contenedor">`Lista de errores:Contenedor`</a> para tener la lista de errores que se puede generar.
