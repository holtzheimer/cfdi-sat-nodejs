# createNodeRegimenesAduaneros

Este método genera el nodo `cartaporte31:RegimenesAduaneros`, que se utiliza para indicar los regímenes aduaneros aplicables al traslado de mercancías.

Cada régimen se representa mediante una clave conforme al catálogo del SAT, como "IMD" (Importación definitiva) o "ITR" (Internación temporal).

USO POR INSTANCIA: 1

```ts
cartaporte.createNodeRegimenesAduaneros(["IMD", "ITR"]);
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad | Tipo     | Descripción                                    |
| --------- | -------- | ---------------------------------------------- |
| data      | string[] | Arreglo de claves de régimen aduanero válidas. |

Cada clave del arreglo generará un subnodo `cartaporte31:RegimenAduanero` dentro del nodo padre `cartaporte31:RegimenesAduaneros`.

## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#regimenes-aduaneros">`Lista de errores:RegimenesAduaneros`</a> para tener la lista de errores que se puede generar.
