// componentes/tarjeta-producto.js
// Práctica de laboratorio · Construye <tarjeta-producto> (Actividad 8 de las diapositivas)
// Completa cada PASO. Los números son los mismos de la diapositiva y de la tarea en Moodle.

// ───────── PASO 2 · Plantilla con Shadow DOM y slots ─────────
// Una sola plantilla, declarada fuera de la clase.
const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      background: #FFFFFF; /* Fondo blanco para que contraste con los elementos oscuros */
      border: 2px solid #3E2723; /* Borde fuerte color café espresso */
      border-radius: 16px;
      padding: 18px;
      box-sizing: border-box;
      font-family: system-ui, -apple-system, sans-serif;
      overflow: hidden;
      box-shadow: 0 6px 16px rgba(62, 39, 35, 0.1); /* Sombra más marcada */
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    :host(:hover) {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(62, 39, 35, 0.18);
    }
    
    /* 🌟 RETO EXTRA: Estilos bien potentes para el producto destacado */
    :host([destacado]) {
      border: 3px solid #D35400; /* Borde naranja tostado grueso */
      background: #FFF5EE; /* Fondo sutilmente cálido */
    }

    /* Contenedor de la foto con un borde interno definido */
    .contenedor-foto {
      width: 100%;
      height: 180px;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid #3E2723;
    }

    ::slotted(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Títulos y textos con tipografía e intensidades fuertes */
    ::slotted(h3) {
      margin: 16px 0 6px 0 !important;
      font-size: 1.35rem !important;
      color: #211512 !important; /* Texto del título casi negro */
      font-weight: 800 !important;
    }

    ::slotted(p) {
      margin: 0 0 20px 0 !important;
      font-size: 0.92rem !important;
      color: #4E342E; /* Café oscuro legible para la descripción */
      line-height: 1.45 !important;
    }

    /* Fila inferior de alto impacto */
    .pie-tarjeta {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 2px solid #3E2723; /* Línea divisoria fuerte */
      padding-top: 14px;
    }

    .precio-contenedor {
      font-size: 1.5rem;
      font-weight: 900;
      color: #D35400; /* Color fuego/caramelo muy fuerte para el precio */
    }

    /* Botón oscuro sólido y llamativo */
    .btn-comprar {
      background: #211512; /* Fondo casi negro */
      color: #FFFFFF;
      border: none;
      padding: 10px 20px;
      font-size: 0.85rem;
      font-weight: 700;
      border-radius: 8px;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      transition: background 0.2s;
    }

    .btn-comprar:hover {
      background: #D35400; /* Al pasar el cursor cambia al naranja fuerte */
    }
  </style>

  <div class="contenedor-foto">
    <slot name="foto"></slot>
  </div>
  <slot name="nombre"></slot>
  <slot>Sin descripción del producto</slot>
  <div class="pie-tarjeta">
    <div class="precio-contenedor">$<span id="precio-display">0.00</span></div>
    <button class="btn-comprar">Añadir</button>
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