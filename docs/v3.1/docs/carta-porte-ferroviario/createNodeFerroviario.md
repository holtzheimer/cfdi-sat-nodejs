# createNodeFerroviario

Genera el nodo `cartaporte31:TransporteFerroviario`, que contiene los datos generales del traslado de mercancías por ferrocarril. Este nodo incluye el tipo de servicio, tipo de tráfico y la información del seguro que respalda el traslado.

Este nodo forma parte del complemento Carta Porte cuando el medio de transporte es ferroviario.

USO POR INSTANCIA: 1

```ts
cartaporte.createNodeFerroviario({
  tipoDeServicio: "TS01",
  tipoDeTrafico: "TT01",
  nombreAseg: "NombreAsg",
  numPolizaSeguro: "3456789",
});
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad       | Tipo               | Descripción                                                     |
| --------------- | ------------------ | --------------------------------------------------------------- |
| tipoDeServicio  | `c_TipoDeServicio` | Clave que indica el tipo de servicio ferroviario.               |
| tipoDeTrafico   | `c_TipoDeTrafico`  | Clave que indica el tipo de tráfico.                            |
| nombreAseg      | string             | (opcional) Nombre de la aseguradora del transporte ferroviario. |
| numPolizaSeguro | string             | (opcional) Número de póliza de seguro correspondiente.          |

## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#transporte-ferroviario">`Lista de errores:TransporteFerroviario`</a> para tener la lista de errores que se puede generar.
