# createNodeAddenda

El método createNodeAddenda() permite agregar información adicional en el nodo `<cfdi:Addenda>` del comprobante fiscal.
Este nodo es utilizado cuando un cliente o empresa requiere que se incluya información personalizada o no fiscal, como datos logísticos, referencias comerciales, códigos internos, instrucciones especiales, etc.

El contenido del nodo Addenda no es validado por el SAT, pero debe cumplir con una estructura XML válida.

```ts
factura.createNodeAddenda({
  nodeBase: "Addenda",
  attributes: {
    "xmlns:Addenda": "http://www.addenda.com/",
    schemaLocation: "http://www.addenda.xsd",
  },
  content: "contenido",
  nodes: [
    {
      nodeName: "Addenda:Grupo",
      content: "contenido",
      nodes: [{ nodeName: "Amazon:Nombre", content: "contenido" }],
    },
  ],
});
```

## Parámetros disponibles

A continuación se muestra una tabla con las propiedades que acepta este método:

| Propiedad  | Tipo   | Descripción                                                                                     |
| ---------- | ------ | ----------------------------------------------------------------------------------------------- |
| nodeBase   | string | Nombre del nodo raíz del bloque Addenda.                                                        |
| attributes | object | Define los atributos que acompañan al nodo raíz.                                                |
| content    | string | (opcional) Coloca el contenido relacionado y de relevancia en texto plano dentro del nodo raíz. |
| nodes      | Array  | (opcional) Coloca nodos hijos dentro del nodo base. Puede colocar mas nodos dentro de este.     |

## Estructura de los subnodos (nodes)

Cada objeto dentro del arreglo **nodes[]** representa un nodo hijo del nodo principal. A su vez, estos nodos pueden contener sus propios subnodos, permitiendo una estructura jerárquica y recursiva.

::: warning ADVERTENCIA
No se permite usar `content` y `nodes` simultáneamente en un mismo nodo. Si se incluyen ambos —ya sea por error o descuido— el paquete ignorará ambos campos para evitar ambigüedades en la estructura XML.
:::

<!-- ## Lista de errores

Vaya a la seccion <a href="/docs/v3.0/validador/lista-de-errores#addenda">`Lista de errores:Addenda`</a> para tener la lista de errores que se puede generar.
 -->
