# setAttributes

Este método asigna los atributos principales del nodo `cartaporte31:CartaPorte`.
Entre estos atributos se incluyen identificadores únicos, información sobre si el transporte es internacional, la entrada o salida de mercancías, y otros datos relevantes para la correcta generación del complemento Carta Porte.

USO POR INSTANCIA: 1

```ts
cartaporte.setAttributes({
  idCcp: "CCCBCD94-870A-4332-A52A-A52AA52AA52A",
  transpInternac: "Sí",
  entradaSalidaMerc: "Entrada",
  paisOrigenDestino: "USA",
  registroISTMO: "Sí",
  ubicacionPoloOrigen: "01",
  ubicacionPoloDestino: "01",
  totalDistRec: 10,
  viaEntradaSalida: "01",
});
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad            | Tipo                 | Descripción                                                                          |
| -------------------- | -------------------- | ------------------------------------------------------------------------------------ |
| idCcp                | string               | Identificador único del complemento Carta Porte.                                     |
| transpInternac       | `Sí` - `No`          | Indica si el transporte es internacional o no.                                       |
| entradaSalidaMerc    | `Entrada` - `Salida` | (opcional) Define si la mercancía entra o sale del país.                             |
| paisOrigenDestino    | `c_Pais`             | (opcional) Clave del país de origen o destino.                                       |
| registroISTMO        | `Sí` - `No`          | (opcional) Señala si el traslado cruza por el Corredor Interoceánico del ISTMO.      |
| ubicacionPoloOrigen  | `c_RegistroISTMO`    | Requerido si el registroISTMO es "Sí". Clave del polo de destino.                    |
| ubicacionPoloDestino | `c_RegistroISTMO`    | Requerido si el registroISTMO es "Sí". Clave del polo de origen.                     |
| totalDistRec         | string - number      | Requerido si entradaSalidaMerc es "Salida". Distancia total recorrida en kilómetros. |
| viaEntradaSalida     | `c_CveTransporte`    | Clave de del medio de tranporte de entrada o salida.                                 |

## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#carta-porte">`Lista de errores:CartaPorte`</a> para tener la lista de errores que se puede generar.
