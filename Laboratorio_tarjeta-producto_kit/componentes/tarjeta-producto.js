// componentes/tarjeta-producto.js
// Práctica de laboratorio · Construye <tarjeta-producto> (Actividad 8 de las diapositivas)
// Completa cada PASO. Los números son los mismos de la diapositiva y de la tarea en Moodle.

// ───────── PASO 2 · Plantilla con Shadow DOM y slots ─────────
// Una sola plantilla, declarada fuera de la clase.
const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    :host {
      display: block;
      border: 1px solid var(--borde, #ccc);
      padding: 16px;
      margin-bottom: 16px;
      border-radius: 8px;
      background-color: #fff;
      font-family: sans-serif;
    }
    
    /* Reto extra opcional: Cambia el borde si tiene el atributo 'destacado' */
    :host([destacado]) {
      border: 2px solid var(--color-marca, #d2691e);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .precio-etiqueta {
      /* Lee el color de marca, o usa #d2691e como respaldo */
      color: var(--color-marca, #d2691e); 
      font-size: 1.25rem;
      font-weight: bold;
      margin-top: 10px;
    }

    ::slotted(img) {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }
  </style>

  <!-- PASO 2 · Escribe aquí:
  - un slot con nombre "foto"
  - un slot con nombre "nombre"
  - un slot sin nombre, con un texto de respaldo
  - un lugar donde se vea el precio (por ejemplo un <span id="precio">) -->
  <slot name="foto"></slot>
  <slot name="nombre"></slot>
  <slot>Sin descripción del producto</slot>
  <div class="precio-etiqueta">Precio: $<span id="precio-display">0.00</span></div>
`;

export class TarjetaProducto extends HTMLElement {

  // PASO 3 · Indica qué atributos observa el componente.
  static get observedAttributes() {
    return ["precio"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // PASO 2 · Crea el Shadow DOM en modo "open".
    // Recuerda: aquí no se leen atributos ni se dibuja HTML.
  }

  connectedCallback() {
    // PASO 2 · Agrega al Shadow DOM una COPIA de la plantilla con cloneNode(true).
    // PASO 3 · Muestra el precio inicial.
    this.shadowRoot.append(plantilla.content.cloneNode(true));
    this.actualizarVistaPrecio();
  }

  attributeChangedCallback(nombre, anterior, valor) {
    // PASO 3 · Cuando cambie "precio", actualiza lo que se ve en pantalla.
    // Ojo: si el atributo ya viene escrito en el HTML, este método se ejecuta
    // ANTES que connectedCallback; comprueba que la plantilla ya esté clonada.
    if (nombre === "precio" && anterior !== valor) {
      this.actualizarVistaPrecio();
    }
  }

  // PASO 3 · La propiedad lee y escribe el atributo, así quedan sincronizados.
  get precio() { return Number(this.getAttribute("precio")); }
  set precio(v) { this.setAttribute("precio", v); }
  
  actualizarVistaPrecio() {
    const display = this.shadowRoot.querySelector("#precio-display");
    if (display) {
      display.textContent = this.precio.toFixed(2);
    }
  }
}

// ───────── PASO 1 · Registra el componente ─────────
// Escribe aquí customElements.define(...) con una etiqueta que tenga guion.
customElements.define("tarjeta-producto", TarjetaProducto);