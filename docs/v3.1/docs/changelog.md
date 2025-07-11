# Changelog

Todas las modificaciones realizadas en esta versión se documentarán aquí.

## [v3.1.0] - 2025-07-10

### Nuevas caracteristicas

- Soporte para Complemento de Pagos 2.0.
- Nueva documentación separada por versiones.
- Clase FacturaCfdi ahora acepta el tipo `P` (**pagos**) en `TipoDeComprobante`.

### Cambios

- La subpropiedad `unidad` dentro de la propiedad `concepto` en el método `createNodeConcepto` de la clase `FacturaCfdi` ahora es opcional.
