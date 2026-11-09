<div align="center">

# El Guardián de la Interfaz

Elige tu nombre, un color de fondo y un tema claro u oscuro. Al volver, la interfaz seguirá como la dejaste.

[Ver la app](https://jramonnv0786-prog.github.io/El-Guardian-De-La-Interfaz/) · [Documentación](https://jramonnv0786-prog.github.io/El-Guardian-De-La-Interfaz/docs/)

</div>

---

## Sobre el proyecto

Práctica del módulo **Desarrollo Web en Entorno Cliente** (2.º DAW, ILERNA): manipulación del DOM, estilos dinámicos y cookies nativas, sin frameworks ni librerías. Estética de fantasía medieval: pergamino en modo claro, piedra y oro en modo oscuro.

## Funcionalidades

| Acción | Resultado |
|---|---|
| Cambiar el **color** | El fondo se actualiza en tiempo real |
| Elegir **Modo Claro / Oscuro** | El tema cambia al instante |
| **Guardar Preferencias** | Se guardan nombre, color y tema en cookies |
| **Recargar** la página | Se restaura todo y aparece una bienvenida |
| **Restablecer Interfaz** | Se borran las cookies y vuelve el aspecto original |

Nombre y color se guardan 7 días; el tema es una cookie de sesión.

## Implementación

| Parte | Técnica |
|---|---|
| **1 · DOM dinámico** | `createElement`, `textContent` y `appendChild` (sin `document.write`) |
| **2 · Aspecto** | `style.backgroundColor` para el color; `classList` con `.tema-oscuro` para el tema |
| **3 · Persistencia** | Caducidad calculada con `Date`; valores con `encodeURIComponent` |
| **4 · Restablecer** | `expires` en el pasado, estilos por defecto y `remove()` de la bienvenida |
| **5 · Documentación** | JSDoc en el código y documentación generada en `docs/` |

### Decisiones de diseño

- **El tema no modifica el fondo del `body`:** el color se aplica en línea y ganaría siempre a la clase.
- **Funciones con parámetro:** `aplicarColorFondo()` y `aplicarTema()` se reutilizan en el formulario, al restaurar y al restablecer.
- **`textContent` en lugar de `innerHTML`:** evita inyección de código (XSS).
- **`path=/` en todas las cookies:** necesario para poder borrarlas.

## Uso en local

```bash
git clone https://github.com/jramonnv0786-prog/El-Guardian-De-La-Interfaz.git
```

Abrir `index.html` con **Live Server**. Con `file://` el navegador no guarda cookies.

## Documentación

```bash
npx jsdoc js/script.js -d docs
```

## Estructura

```
El-Guardian-De-La-Interfaz/
├── index.html
├── css/styles.css
├── js/script.js
├── docs/            documentación generada (JSDoc)
└── README.md
```

---

<div align="center">

**Jose Ramon Neira Vega** · 2.º DAW · ILERNA

</div>
