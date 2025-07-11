# createNodeAutotransporte

Este método genera el nodo `cartaporte31:Autotransporte`, el cual es obligatorio cuando se utiliza el complemento Carta Porte para el medio de transporte terrestre federal.

Permite establecer la información principal del permiso de autotransporte, como el tipo de permiso otorgado por la Secretaría de Infraestructura, Comunicaciones y Transportes (SICT) y el número de dicho permiso.

USO POR INSTANCIA: 1

```ts
cartaporte.createNodeAutotransporte({
  permSct: "TPAF01",
  numPermisoSct: "NumPermisoSCT1",
});
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad     | Tipo            | Descripción                                                                                   |
| ------------- | --------------- | --------------------------------------------------------------------------------------------- |
| permSct       | `c_TipoPermiso` | Clave del tipo de permiso proporcionado por la SICT correspondiente al autotransporte a usar. |
| numPermisoSct | string          | Número del permiso otorgado por la SICT del autotransporte.                                   |

## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#autotransporte">`Lista de errores:Autotransporte`</a> para tener la lista de errores que se puede generar.
