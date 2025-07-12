# generateUuid

Genera un UUID válido en formato estándar RFC 4122 v4.

Este identificador es comúnmente utilizado en comprobantes fiscales digitales (CFDI), especialmente cuando se requiere simular o construir nodos como `CfdiRelacionados`.

```ts
const uuid = Utils.generateUuid();
```

## Ejemplo de uso

```ts
const uuid = Utils.generateUuid();
console.log(uuid);
// Resultado: "9d0e1f50-b1a2-4e9a-9a10-79e0b7e80156"
```

## ¿Para qué se puede usar?

- Para pruebas automatizadas de CFDI sin depender de UUIDs reales.
- En entornos de desarrollo para simular documentos relacionados.
- Como identificador único en registros propios del sistema.

## Consideraciones

- El valor generado **no está registrado en el SAT**, por lo tanto **no es válido para timbrado**.
- Solo debe usarse con fines de desarrollo, documentación, pruebas o simulación.
