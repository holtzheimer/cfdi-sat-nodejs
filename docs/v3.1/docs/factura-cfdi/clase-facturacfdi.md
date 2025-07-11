# Clase `FacturaCfdi`

La clase `FacturaCfdi` es la encargada de generar los Comprobantes Fiscales Digitales por Internet (CFDI) en formatos **XML** y **JSON**, cumpliendo con los lineamientos del SAT.

Esta clase permite crear CFDI de los siguientes tipos:

- **Ingreso**
- **Egreso**
- **Traslado**

Además, puedes generar comprobantes **sellados** (listos para timbrar) o **sin sellar**, dependiendo de tus necesidades.

---

## Requisitos para su uso

Para utilizar `FacturaCfdi`, primero debes contar con una instancia válida de la clase `ConfigCfdi`, la cual proporciona los datos necesarios del certificado y la llave para el proceso de firma digital.

## Ejemplo básico de creación:

```ts
import { FacturaCfdi, ConfigCfdi } from "cfdi-sat-nodejs";

const configCfdi = new ConfigCfdi({...});

const factura = new FacturaCfdi(configCfdi);
```

Una vez instanciada, puedes usar esta clase para construir los nodos del CFDI, agregar complementos, y generar tanto la representación en JSON como el XML final.
