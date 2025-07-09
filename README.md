# PAQUETE CFDI SAT PARA NODEJS

### Herramienta para generar y manejar CFDI 4.0. Incluye utilidades para trabajar con certificados digitales, generar XML o JSON sellados y sin sellar, consultar catálogos del SAT, convertir XML a JSON, complementos Carta Porte y Pagos. Ideal para desarrolladores que necesitan generar facturas electrónicas válidas para el SAT.

Consulte la documentación completa en: [https://luisjossam.github.io/cfdi-sat-nodejs/](https://luisjossam.github.io/cfdi-sat-nodejs/)

## **Instalación**

Puede instalar mediante NPM

```bash
npm install cfdi-sat-nodejs --save
```

## **Importación**

Para empezar a usar cfdi-sat-nodejs primero importa la clase ConfigCfdi

```javascript
const { ConfigCfdi } = require("cfdi-sat-nodejs"); // Si usas CommonJS
import { ConfigCfdi } from "cfdi-sat-nodejs"; // si usas ESM

const config = new ConfigCfdi();
```
