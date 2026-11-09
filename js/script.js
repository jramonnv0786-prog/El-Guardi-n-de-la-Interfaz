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
