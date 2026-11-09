/**
 * @file Personaliza la interfaz (color de fondo y tema claro/oscuro), guarda las preferencias
 * del usuario en cookies nativas, las restaura al recargar y genera una bienvenida dinámica en el DOM.
 * @author Jose Ramon Neira Vega
 */

// Variables globales (Referencias del DOM).
const username = document.getElementById("username");
const color = document.getElementById("color");
const contenedordeBienvenida = document.getElementById("contenedor-bienvenida");
const theme = document.getElementById("theme");

// Botones de guardar y resetear.
const saveButton = document.getElementById("btn-save");
const resetButton = document.getElementById("btn-reset");


/**
 * Aplica el color recibido como fondo de la página mediante un estilo en línea
 * (document.body.style.backgroundColor). Se ejecuta en cada evento "input" del selector de color.
 * @param {string} color - Color en formato hexadecimal, por ejemplo "#ffffff".
 * @returns {void}
 */
function aplicarColorFondo(color) {
  document.body.style.backgroundColor = color;
}

// Eventos para aplicar el color de fondo cuando el usuario cambia la selección en el <input> de color.
color.addEventListener("input", function () {
  const selectedColor = color.value;
  aplicarColorFondo(selectedColor);
});

/**
 * Activa o desactiva el tema oscuro añadiendo o quitando la clase CSS "tema-oscuro" del <body>
 * mediante classList. Los estilos del tema están predefinidos en styles.css (nunca en línea).
 * @param {string} tema - Tema elegido: "claro" u "oscuro".
 * @returns {void}
 */
function aplicarTema(tema) {
  if (tema === "oscuro") {
    document.body.classList.add("tema-oscuro");
  } else {
    document.body.classList.remove("tema-oscuro");
  }
}

// Eventos para aplicar el tema cuando el usuario cambia la selección en el <select> de temas.
theme.addEventListener("change", function () {
  aplicarTema(theme.value);
});

// COOKIES
/**
 * Crea o actualiza una cookie. Si se indican días, caduca en esa fecha (calculada con Date);
 * si no, es una cookie de sesión (sin expires ni max-age).
 * @param {string} nombre - Nombre de la cookie.
 * @param {string} valor - Valor a guardar (se codifica con encodeURIComponent).
 * @param {number} [dias] - Días hasta la caducidad. Si se omite, la cookie es de sesión.
 * @returns {void}
 */
function crearCookie(nombre, valor, dias) {
  if (dias) {
    // Cookie persistente: caduca dentro de "dias" días (fecha calculada con Date).
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
    const expira = "; expires=" + fecha.toUTCString();

    // Guardar la cookie con el nombre, valor y fecha de expiración.
    document.cookie = encodeURIComponent(nombre) + "=" + encodeURIComponent(valor) + expira + "; path=/";
  } else {
    // Cookie de sesión: sin expires ni max-age, se borra al cerrar el navegador.
    document.cookie = encodeURIComponent(nombre) + "=" + encodeURIComponent(valor) + "; path=/";
  }
}

/**
 * Lee el valor de una cookie por su nombre.
 * @param {string} nombre - Nombre de la cookie.
 * @returns {string|null} - Valor de la cookie si existe, null en caso contrario.
 */
function leerCookie(nombre) {
  // document.cookie devuelve todas las cookies en una sola cadena: "a=1; b=2; c=3".
  const pares = document.cookie.split("; ");

  for (const par of pares) {
    // Desestructuración: separa cada par "clave=valor" en dos variables.
    const [clave, valor] = par.split("=");

    // Se compara con el nombre codificado, igual que se guardó en crearCookie.
    if (clave === encodeURIComponent(nombre)) {
      return decodeURIComponent(valor);
    }
  }

  return null; // No encontrada.
}

// Botón "Guardar Preferencias": guarda nombre y color durante 7 días y el tema como cookie de sesión.
saveButton.addEventListener("click", function () {
  crearCookie("username", username.value, 7);
  crearCookie("color", color.value, 7);
  crearCookie("theme", theme.value);
});

/**
 * Crea dinámicamente el bloque de bienvenida (section > h2 + p) con createElement y textContent,
 * y lo inserta en #contenedor-bienvenida con appendChild. No usa document.write ni innerHTML.
 * @returns {void}
 */
function mostrarBienvenida() {
  // 1. Crear: los elementos se fabrican en memoria (aún no son visibles).
  const seccion = document.createElement("section");
  const titulo = document.createElement("h2");
  const parrafo = document.createElement("p");

  // 2. Configurar: textContent inserta texto plano (seguro frente a XSS).
  titulo.textContent = "Bienvenido";
  parrafo.textContent = "Tus preferencias se han restaurado desde la última visita.";

  // 3. Insertar: primero h2 y p dentro de la section, después la section en el contenedor.
  seccion.appendChild(titulo);
  seccion.appendChild(parrafo);
  contenedordeBienvenida.appendChild(seccion);
}

/**
 * Lee las cookies guardadas y, si existen, restaura la interfaz: aplica el color de fondo y el tema,
 * rellena los campos del formulario y, si el usuario ya se registró, muestra la bienvenida.
 * @returns {void}
 */
function restaurarPreferencias() {
  const colorGuardado = leerCookie("color");
  if (colorGuardado) {
    aplicarColorFondo(colorGuardado); // Aplica el fondo guardado.
    color.value = colorGuardado;      // Rellena el selector de color.
  }

  const temaGuardado = leerCookie("theme");
  if (temaGuardado) {
    aplicarTema(temaGuardado);        // Activa o quita la clase .tema-oscuro.
    theme.value = temaGuardado;       // Rellena el select del tema.
  }

  const nombreGuardado = leerCookie("username");
  if (nombreGuardado) {
    username.value = nombreGuardado;  // Rellena el input del nombre.
    mostrarBienvenida();              // Parte 1: solo si el usuario ya se había registrado.
  }
}

// Botón "Restablecer Interfaz": borra las cookies, devuelve el aspecto por defecto y elimina la bienvenida.
resetButton.addEventListener("click", function () {
  // Días negativos → fecha de caducidad en el pasado → el navegador borra la cookie.
  crearCookie("username", "", -1);
  crearCookie("color", "", -1);
  crearCookie("theme", "", -1);

  // Aspecto por defecto: sin color en línea y sin tema oscuro.
  document.body.style.backgroundColor = "";
  aplicarTema("claro");

  // Formulario a su estado inicial.
  username.value = "";
  color.value = "#ffffff";
  theme.value = "claro";

  // Eliminar del DOM el bloque de bienvenida.
  const seccion = contenedordeBienvenida.querySelector("section");
  if (seccion) {
    seccion.remove();
  }
});

// Al cargar la página (el script usa defer, así que el DOM ya existe), se restauran las preferencias.
restaurarPreferencias();
