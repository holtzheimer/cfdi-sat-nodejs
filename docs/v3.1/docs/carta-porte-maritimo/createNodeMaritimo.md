# createNodeMaritimo

Genera el nodo `cartaporte31:TransporteMaritimo`, el cual contiene todos los atributos necesarios para describir el medio de transporte marítimo utilizado en el traslado de mercancías. Este nodo es obligatorio cuando el tipo de transporte es marítimo, y debe incluir información técnica y administrativa de la embarcación.

USO POR INSTANCIA: 1

```ts
cartaporte.createNodeMaritimo({
  permSct: "TPAF01",
  numPermisoSct: "NumPermisoSCT1",
  tipoEmbarcacion: "B01",
  matricula: "Matricula1",
  nacionalidadEmbarc: "AFG",
  permisoTempNavegacion: "Prmiso",
  nombreAgenteNaviero: "NombreAgenteNaviero1",
  numAutorizacionNaviero: "ANC005/2022",
  numeroOmi: "IMO1234567",
  tipoCarga: "CGS",
  unidadesDeArqBruto: "0.001",
  anioEmbarcacion: "2003",
  numConocEmbarc: "Numro 234",
  numViaje: "09876",
  lineaNaviera: "LineaNaviera1",
  nombreAseg: "Nombre aseg",
  numPolizaSeguro: "NumPolizaSeguro1",
  nombreEmbarc: "NombreEmbarc1",
  calado: "0.01",
  eslora: "0.01",
  manga: "0.01",
  puntal: "0.01",
});
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad              | Tipo               | Descripción                                                                                    |
| ---------------------- | ------------------ | ---------------------------------------------------------------------------------------------- |
| permSct                | `c_TipoPermiso`    | Clave del tipo de permiso proporcionado por la SICT correspondiente al autotransporte a usar.  |
| numPermisoSct          | string             | Número del permiso otorgado por la SICT del transporte marítimo.                               |
| tipoEmbarcacion        | `c_ConfigMaritima` | Tipo de embarcación utilizada.                                                                 |
| matricula              | string             | Matrícula de la embarcación.                                                                   |
| nacionalidadEmbarc     | `c_Pais`           | Nacionalidad de la embarcación.                                                                |
| permisoTempNavegacion  | string             | Requerido si la nacionalidad del embarque es distinto a "MEX". Permiso temporal de navegación. |
| nombreAgenteNaviero    | string             | Nombre del agente naviero responsable.                                                         |
| numAutorizacionNaviero | string             | Número de autorización del agente naviero.                                                     |
| numeroOmi              | string             | Número OMI de la embarcación.                                                                  |
| tipoCarga              | `c_ClaveTipoCarga` | Tipo de carga transportada.                                                                    |
| unidadesDeArqBruto     | string             | Unidades de arqueo bruto de la embarcación.                                                    |
| anioEmbarcacion        | string - number    | Año de fabricación de la embarcación.                                                          |
| numConocEmbarc         | string             | Número de conocimiento de embarque.                                                            |
| numViaje               | string             | Número del viaje marítimo.                                                                     |
| lineaNaviera           | string             | Nombre de la línea naviera.                                                                    |
| nombreAseg             | string             | Nombre de la aseguradora del transporte marítimo.                                              |
| numPolizaSeguro        | string             | Número de póliza de seguro del transporte marítimo.                                            |
| nombreEmbarc           | string             | Nombre de la embarcación.                                                                      |
| calado                 | string - number    | Calado de la embarcación.                                                                      |
| eslora                 | string - number    | Eslora de la embarcación.                                                                      |
| manga                  | string - number    | Manga de la embarcación.                                                                       |
| puntal                 | string - number    | Puntal de la embarcación.                                                                      |

<!-- ## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#maritimo">`Lista de errores:Maritimo`</a> para tener la lista de errores que se puede generar.
 -->
