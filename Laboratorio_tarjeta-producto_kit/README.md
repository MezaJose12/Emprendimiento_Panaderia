# Práctica de laboratorio · `<tarjeta-producto>`

Programación Integrativa de Componentes Web · Unidad 1: Web Components

| Dato | Completa |
|---|---|
| Emprendimiento | Panadería "El Trigo Dorado". |
| Estudiantes (Apellido Nombre) | Meza José, Tonato Sebastian, Morales Anthony, Melany Torres|
| NRC | 36642 |
| Fecha | 13/10/2026 |
| Enlace del repositorio | [Pega tu enlace de GitHub aquí] |

## Propuesta del emprendimiento

- Nombre del emprendimiento: Panadería "El Trigo Dorado" (Aplicación para reserva de pan)
- Problema que resuelve: 
Los clientes no tienen forma de conocer los productos horneados del día ni sus precios actualizados de forma digital, lo que les obliga a acercarse físicamente al local para consultar la disponibilidad.
- Cliente al que se dirige: 
Familias del sector y trabajadores cercanos (oficinistas) que desean verificar rápidamente las opciones de pan fresco y postres artesanales desde sus dispositivos.

## Cómo abrir el proyecto

1. Abre la carpeta en Visual Studio Code.
2. Clic derecho sobre `index.html` → **Open with Live Server**. Los módulos no cargan con `file://`.
3. Abre las herramientas del navegador (F12) y deja visible la pestaña **Consola**.

## Registro de los pasos

### Paso 1 · index.html y el módulo

- Etiqueta que registramos: `<tarjeta-producto>`
- ¿Por qué el nombre debe llevar guion?: El estándar de Web Components exige que los elementos personalizados incluyan un guion para evitar que choquen con las etiquetas estándar actuales o futuras de HTML.
- Ruta del módulo y cómo lo importa la página: Ruta `./componentes/tarjeta-producto.js`, se importa usando `<script type="module" src="./componentes/tarjeta-producto.js"></script>` dentro del `<head>`.

### Paso 2 · Plantilla, Shadow DOM y slots

- Slots con nombre que tiene la plantilla: `"foto"` y `"nombre"`.
- Texto de respaldo del slot sin nombre: `"Sin descripción del producto"`.
- ¿Qué pasaría si no usáramos `cloneNode(true)`?: Al agregar la plantilla al Shadow DOM, el navegador extraería (movería) su contenido original a la primera tarjeta. Las siguientes tarjetas quedarían completamente vacías porque la plantilla ya no tendría HTML guardado en memoria.

### Paso 3 · Atributo precio y estilos

- Método que reacciona cuando cambia `precio`: `attributeChangedCallback`
- Color de marca (`--color-marca`) y dónde lo definimos: `#8B4513`, lo definimos en el selector de etiqueta `tarjeta-producto` dentro del archivo `estilos.css`.
- Valor de respaldo que usa el componente si la página no define la variable: `#d2691e`

### Paso 4 · Tres productos del emprendimiento

| # | Producto | Precio |
|---|---|---|
| 1 | Pan Francés | 0.50 |
| 2 | Croissant de Mantequilla | 1.50 |
| 3 | Torta de Chocolate | 12.00 |

### Paso 5 · Repositorio del equipo

| Integrante | Qué hizo en este laboratorio |
|---|---|
| Meza José | Estructuración inicial, registro del componente en JS y configuración de la plantilla. |
| Tonato Sebastian | Configuración de slots, CSS del Shadow DOM y sincronización de atributos. |
| Morales Anthony | Implementación del index.html, inserción de datos reales del negocio y documentación. |

## Verificación

Marca con una `x` lo que ya comprobaste en el navegador.

- [x] La etiqueta tiene guion.
- [x] La página solo cambia lo que el componente expone con `var()`.
- [x] `setAttribute` cambia el precio en pantalla.
- [x] La consola no muestra errores.

Prueba que usamos en la consola:

```js
document.querySelector("tarjeta-producto").setAttribute("precio", "25");