# createNodeDerechoDePaso

Genera el nodo `cartaporte31:DerechosDePaso`, que contiene la información relacionada con el derecho de paso ferroviario. Este nodo se utiliza para declarar el tipo de derecho y el kilometraje correspondiente que ha sido pagado por el uso de la vía férrea.

Este nodo es parte del bloque `TransporteFerroviario` dentro del complemento Carta Porte versión 3.1.

```ts
cartaporte.createNodeDerechoDePaso({
  kilometrajePagado: "100",
  tipoDerechoDePaso: "CDP114",
});
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad         | Tipo               | Descripción                                             |
| ----------------- | ------------------ | ------------------------------------------------------- |
| kilometrajePagado | string - number    | Distancia cubierta bajo el derecho de paso ferroviario. |
| tipoDerechoDePaso | `c_DerechosDePaso` | Clave que indica el tipo de derecho de paso utilizado.  |

<!-- ## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#derecho-de-paso">`Lista de errores:DerechoDePaso`</a> para tener la lista de errores que se puede generar.
 -->
