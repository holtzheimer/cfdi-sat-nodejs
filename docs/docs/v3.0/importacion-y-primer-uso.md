# Importación y primer uso

Una vez instalado, puedes importar el paquete en tu proyecto y comenzar a utilizar sus funcionalidades. A continuación te mostramos un ejemplo básico:

```ts
// index.ts
import { CatalogoSat } from "cfdi-sat-nodejs";

// Crear una instancia de un catálogo SAT (por ejemplo, régimen fiscal)
const regimen = new CatalogoSat("RegimenFiscal");

// Buscar un régimen por clave
const resultado = regimen.search("clave", 601);

console.log(resultado);
/*
[
  {
    clave: "601",
    descripcion: "General de Ley Personas Morales",
    // ...
  }
]
*/
```

::: info
Conozca más sobre los catalogos en la sección: `Catalogos`
:::

Este es solo un ejemplo básico. En las siguientes secciones encontrarás guías detalladas la generación de nodos, validaciones y más.
