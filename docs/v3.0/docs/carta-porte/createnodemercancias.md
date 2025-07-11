# createNodeMercancias

Este método genera el nodo `cartaporte31:Mercancias`, el cual contiene los atributos generales del traslado de mercancías.
Incluye información como la cantidad total de partidas, el peso neto y bruto, la unidad de medida, posibles cargos por tasación y si el traslado involucra procesos como logística inversa, recolección o devolución.

USO POR INSTANCIA: 1

```ts
cartaporte.createNodeMercancias({
  numTotalMercancias: 1,
  pesoBrutoTotal: 15,
  unidadPeso: "KGM",
  pesoNetoTotal: 18,
  cargoPorTasacion: "16",
  logisticaInversaRecoleccionDevolucion: "Sí",
});
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad                             | Tipo                | Descripción                                                           |
| ------------------------------------- | ------------------- | --------------------------------------------------------------------- |
| numTotalMercancias                    | string - number     | Número total de mercancías incluidas en el traslado.                  |
| pesoBrutoTotal                        | string - number     | Peso bruto total de las mercancías, incluyendo embalaje.              |
| unidadPeso                            | `c_ClaveUnidadPeso` | Clave de la unidad de medida utilizada para los pesos.                |
| pesoNetoTotal                         | string - number     | (opcional) Peso neto total de las mercancías, sin incluir embalaje.   |
| cargoPorTasacion                      | string              | (opcional) Monto correspondiente a cargos por tasación.               |
| logisticaInversaRecoleccionDevolucion | `Sí` - `No`         | (opcional) Indica si hay logística inversa, recolección o devolución. |

<!-- ## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#mercancias">`Lista de errores:Mercancias`</a> para tener la lista de errores que se puede generar. -->
