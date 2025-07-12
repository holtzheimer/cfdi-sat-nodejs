# dateCurrent

Devuelve la fecha y hora actual del sistema en formato compatible con los requisitos del SAT:
AAAA-MM-DDTHH:mm:ss.

Este formato es usado en múltiples nodos del CFDI como `Fecha`, `fechaPago`, `fechaHoraSalidaLlegada`, entre otros.

```ts
const dateCurrent = Utils.dateCurrent();
```

## Ejemplo de uso

```ts{4}
const fecha = Utils.dateCurrent();

fac.createNodeComprobante({
  fecha: fecha,
  // otros atributos...
});
```

## Consideraciones

- El valor devuelto está basado en la hora local del sistema.
- El formato no incluye zona horaria, como requiere el estándar CFDI 4.0.
