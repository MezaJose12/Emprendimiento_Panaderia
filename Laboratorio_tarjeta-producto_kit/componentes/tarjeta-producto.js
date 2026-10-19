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
      border: 2px solid var(--borde, #ffccd5);
      padding: 16px;
      margin-bottom: 16px;
      border-radius: 16px;
      background-color: #fff9fb;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      box-shadow: 0 6px 15px rgba(255, 182, 193, 0.2);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    :host(:hover) {
      transform: translateY(-6px);
      box-shadow: 0 10px 20px rgba(255, 105, 180, 0.25);
      border-color: var(--color-marca, #d81b60);
    }

    :host([destacado]) {
      border: 2px solid var(--color-marca, #ff1493);
      background: linear-gradient(135deg, #fff9fb 0%, #ffe4e1 100%);
    }

    ::slotted(img) {
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: 12px;
    }

    ::slotted([slot="nombre"]) {
      font-size: 1.25rem;
      color: #883955;
      margin: 12px 0 8px 0;
      font-weight: 700;
    }

    ::slotted(p) {
      font-size: 0.95rem;
      color: #7a5c65;
      margin: 0 0 16px 0;
      line-height: 1.4;
    }

    .pie-tarjeta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 8px;
      border-top: 1px dashed #ffd1dc;
    }

    .precio-etiqueta {
      color: var(--color-marca, #d81b60); 
      font-size: 1.25rem;
      font-weight: bold;
    }

    ::slotted([slot="accion"]) {
      background-color: #d81b60;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 600;
      transition: background 0.2s ease, transform 0.1s ease;
    }

    ::slotted([slot="accion"]:hover) {
      background-color: #ad1457;
      transform: scale(1.03);
    }
  </style>

  <div>
    <slot name="foto"></slot>
    <slot name="nombre"></slot>
    <slot>Delicia recién horneada.</slot>
  </div>
  
  <div class="pie-tarjeta">
    <div class="precio-etiqueta">$<span id="precio-display">0.00</span></div>
    <slot name="accion"></slot>
  </div>
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