# createNodeAereo

Genera el nodo `cartaporte31:TransporteAereo`, el cual describe las características específicas del medio de transporte aéreo utilizado en el traslado de mercancías. Este nodo es obligatorio cuando el tipo de traslado es por vía aérea, y contiene información sobre el permiso de operación, la aeronave, el transportista y el embarcador.

USO POR INSTANCIA: 1

```ts
cartaporte.createNodeAereo({
  permSct: "TPAF01",
  numPermisoSct: "23456789",
  codigoTransportista: "CA143",
  numeroGuia: "acUbYlBVTmlzx",
  matriculaAeronave: "61E5-WZ",
  nombreAseg: "NombreAseg",
  numPolizaSeguro: "P345678",
  lugarContrato: "LugarContrato",
  rfcEmbarcador: "EKU9003173C9",
  nombreEmbarcador: "Embarcador",
  numRegIdTribEmbarc: "H78J238032",
  residenciaFiscalEmbarc: "USA",
});
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad              | Tipo                      | Descripción                                                           |
| ---------------------- | ------------------------- | --------------------------------------------------------------------- |
| permSct                | `c_TipoPermiso`           | Clave del permiso SICT del transportista aéreo.                       |
| numPermisoSct          | string                    | Número del permiso SICT.                                              |
| codigoTransportista    | `c_CodigoTransporteAereo` | Código identificador del transportista aéreo.                         |
| numeroGuia             | string                    | Número de guía aérea.                                                 |
| matriculaAeronave      | string                    | (opcional) Matrícula de la aeronave que realiza el traslado.          |
| nombreAseg             | string                    | (opcional) Nombre de la aseguradora del transporte aéreo.             |
| numPolizaSeguro        | string                    | (opcional) Número de póliza de seguro correspondiente.                |
| lugarContrato          | string                    | (opcional) Lugar donde se celebró el contrato de transporte.          |
| rfcEmbarcador          | string                    | (opcional) RFC del embarcador o remitente de la mercancía.            |
| nombreEmbarcador       | string                    | (opcional) Nombre del embarcador o remitente.                         |
| numRegIdTribEmbarc     | string                    | (opcional) Número de registro fiscal en el extranjero del embarcador. |
| residenciaFiscalEmbarc | string                    | (opcional) Clave del país de residencia fiscal del embarcador.        |

## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#transporte-aereo">`Lista de errores:TransporteAereo`</a> para tener la lista de errores que se puede generar.
