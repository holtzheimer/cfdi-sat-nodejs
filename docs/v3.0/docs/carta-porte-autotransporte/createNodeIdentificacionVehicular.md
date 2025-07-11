# createNodeIdentificacionVehicular

Este método genera el nodo `cartaporte31:IdentificacionVehicular`, el cual describe las características técnicas del vehículo utilizado en el traslado de mercancías por autotransporte federal.

Es un nodo obligatorio dentro de `cartaporte31:Autotransporte`, ya que permite identificar de manera formal y técnica el medio de transporte, asegurando que cumpla con los requisitos establecidos por la SICT y el SAT.

USO POR INSTANCIA: 1

```ts
cartaporte.createNodeIdentificacionVehicular({
  placaVm: "plac892",
  anioModeloVm: 2025,
  configVehicular: "VL",
  pesoBrutoVehicular: "10",
});
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad          | Tipo                     | Descripción                                                            |
| ------------------ | ------------------------ | ---------------------------------------------------------------------- |
| placaVm            | string                   | Placa del vehículo motriz.                                             |
| anioModeloVm       | string - number          | Año modelo del vehículo.                                               |
| configVehicular    | `c_ConfigAutotransporte` | Clave que indica la configuración vehicular según el catálogo del SAT. |
| pesoBrutoVehicular | string - number          | Peso bruto del vehículo en toneladas o kilogramos.                     |

<!-- ## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#identificacion-vehicular">`Lista de errores:IdentificacionVehicular`</a> para tener la lista de errores que se puede generar.
 -->
