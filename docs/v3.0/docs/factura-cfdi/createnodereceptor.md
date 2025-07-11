# createNodeReceptor

Este método agrega el nodo **`cfdi:Receptor`** al comprobante, que contiene los **datos fiscales del destinatario del CFDI**, ya sea una persona física o moral.

Es un nodo **obligatorio** para todos los tipos de comprobantes y debe definirse una sola vez.

USO POR INSTANCIA: 1

> 💡 Si llamas `createNodeReceptor()` más de una vez, se sobrescribirá el nodo anterior.

---

## Ejemplo de uso

```ts
factura.createNodeReceptor({
  rfc: "URE180429TM6",
  nombre: "UNIVERSIDAD ROBOTICA ESPAÑOLA",
  usoCfdi: "G01",
  regimenFiscal: 601,
  domicilioFiscal: 86991,
  residenciaFiscal: "USA",
  numRegIdTrib: 121585958,
});
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad        | Tipo              | Descripción                                                                                      |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| rfc              | string            | RFC del receptor del comprobante.                                                                |
| nombre           | string            | Nombre, denominación o razón social inscrito del receptor del comprobante.                       |
| usoCfdi          | `c_UsoCfdi`       | Se debe registrar la clave que corresponda al uso que le dará al comprobante fiscal el receptor. |
| regimenFiscal    | `c_RegimenFiscal` | Clave vigente del regimen fiscal del receptor.                                                   |
| domicilioFiscal  | string - number   | Código postal del domicilio fiscal del receptor del comprobante.                                 |
| residenciaFiscal | `c_Pais`          | (opcional) Clave del país de residencia del receptor en caso de ser extranjero.                  |
| numRegIdTrib     | string            | (opcional) Número de registro de identidad fiscal del receptor en caso de ser extranjero.        |

::: tip Nacional vs Extranjero

Si el receptor es mexicano, es obligatorio definir: rfc, regimenFiscal, usoCfdi y domicilioFiscal.

Si el receptor es extranjero, deben usarse residenciaFiscal y numRegIdTrib, y el RFC puede ser genérico (ej. XEXX010101000).

:::

<!-- ## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#receptor">`Lista de errores:Receptor`</a> para tener la lista de errores que se puede generar. -->
