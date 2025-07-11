# createJsonSellado

Este método permite obtener la representación del CFDI en formato JSON junto su complemento carta porte, útil para integraciones, visualización estructurada o procesamiento desde aplicaciones que no requieren el XML directamente.

Puedes elegir entre un formato completo (idéntico al XML) o una versión simplificada más legible.

Genera el CFDI en formato JSON con sello digital incluido. Es equivalente a createXmlSellado() pero en versión JSON.

```ts
const cartaPorteJsonSellado = await cartaporte.createJsonSellado(); // JSON completo sellado
const cartaPorteJsonSelladoSimplificado = await cartaporte.createJsonSellado(true); // JSON simplificado sellado
```

| Argumento  | Tipo    | Descripción                                                                         |
| ---------- | ------- | ----------------------------------------------------------------------------------- |
| simplified | boolean | (Opcional) Por defecto false, genera un JSON más limpio: sin prefijos ni atributos. |

::: tip ❔ ¿Cuándo usar el formato simplificado?

El formato simplificado es útil para:

- Mostrar datos al usuario final

- Serializar de forma más limpia

- Integrar con sistemas que no requieren el formato XML exacto

El formato completo es ideal si necesitas volver a convertir el JSON a XML sin perder la estructura original.

:::

## ¿Qué es un JSON completo y un JSON simplificado?

La biblioteca permite generar el CFDI en formato JSON utilizando dos enfoques:

**JSON completo**: mantiene la estructura idéntica al XML original, incluyendo los prefijos de espacio de nombres como `cfdi:` y los atributos marcados con `@_`. Este formato es útil si necesitas transformar de nuevo el JSON a XML o si estás haciendo validaciones profundas.

```json
{
  "cfdi:Comprobante": {
    "@_Version": "4.0",
    "@_Fecha": "2025-06-21T03:18:54",
    "@_Moneda": "MXN",
    "cfdi:Emisor": {
      "@_Rfc": "AAA010101AAA",
      "@_Nombre": "EMPRESA EJEMPLO SA DE CV"
    },
    "cfdi:Receptor": {
      "@_Rfc": "XAXX010101000",
      "@_Nombre": "PÚBLICO EN GENERAL"
    }
  }
}
```

**JSON simplificado**: presenta los mismos datos pero de manera más limpia y legible, omitiendo los prefijos `cfdi:` y eliminando los caracteres especiales de atributos `@_`. Este formato es útil para mostrar o consumir fácilmente los datos desde otras apps.

```json
{
  "Comprobante": {
    "Version": "4.0",
    "Fecha": "2025-06-21T03:18:54",
    "Moneda": "MXN",
    "Emisor": {
      "Rfc": "AAA010101AAA",
      "Nombre": "EMPRESA EJEMPLO SA DE CV"
    },
    "Receptor": {
      "Rfc": "XAXX010101000",
      "Nombre": "PÚBLICO EN GENERAL"
    }
  }
}
```

### ¿Cuál debería usar?

Si solo necesitas leer, mostrar o manipular los datos del CFDI junto al complemento carta porte desde tu aplicación, lo más conveniente es usar el JSON simplificado, ya que resulta más limpio y fácil de interpretar.
En cambio, si necesitas validar el CFDI contra el esquema oficial del SAT, transformarlo nuevamente a XML o enviarlo a un PAC que requiera el formato técnico completo, lo ideal es utilizar el JSON completo, que conserva todos los detalles del XML original, incluyendo los espacios de nombres y atributos con estructura especial.
