# createNodeRemolques

Genera el nodo `cartaporte31:Remolque`, que contiene la información del remolque o semirremolque utilizado en el traslado de mercancías. Este nodo se utiliza cuando el vehículo cuenta con uno o dos remolques y permite especificar detalles como la placa y el subtipo del remolque conforme al catálogo del SAT.

::: tip Importante
Este método debe usarse únicamente si el vehículo cuenta con remolques.
:::

USO POR INSTANCIA: 0 a 2

```ts
cartaporte.createNodeRemolques({
  placa: "placa12",
  subTipoRem: "CTR007",
});
```

Salida:

```xml
<cartaporte31:Remolques>
  <cartaporte31:Remolque Placa="placa12" SubTipoRem="CTR007" />
</cartaporte31:Remolques>
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad  | Tipo           | Descripción                                               |
| ---------- | -------------- | --------------------------------------------------------- |
| placa      | string         | Placa del remolque o semirremolque.                       |
| subTipoRem | `c_SubTipoRem` | Clave del subtipo de remolque, según el catálogo del SAT. |

## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#remolques">`Lista de errores:Remolques`</a> para tener la lista de errores que se puede generar.
