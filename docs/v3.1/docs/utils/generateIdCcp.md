# generateIdCcp

Genera un **identificador válido** para el atributo IdCCP del nodo `cartaporte31:CartaPorte`.

Este ID se utiliza como un identificador único para la carta porte y cumple con ciertas reglas del SAT:

- Longitud máxima de 40 caracteres.
- Sólo letras, números y guiones.
- Sin espacios, símbolos especiales ni tildes.

```ts
const idCcp = Utils.generateIdCcp();
```

## Ejemplo de uso

```ts{2}
cartaporte.setAttributes({
  idCcp: Utils.generateIdCcp(),
  transpInternac: "No",
  // otros atributos...
});
```

## ¿Para qué sirve?

El atributo `IdCCP` es requerido por el SAT en el nodo raíz del complemento Carta Porte (`cartaporte31:CartaPorte`) y funciona como un folio de control único para identificar el documento en los procesos de logística y fiscalización.

## Consideraciones

- Aunque el método genera un valor válido, no valida unicidad contra el SAT.
