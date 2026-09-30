# Handoff — Landing MAFLO Comercializadora

Especificación para quien continúe el sitio. Los tokens están en
`assets/css/styles.css`; este documento explica el *porqué* y los casos borde.

---

## 1. Qué es esta pantalla

Página única de captación B2B. El objetivo de conversión es **una solicitud de
cotización**, no una venta en línea. El visitante típico es una persona de
compras o administración que ya tiene una lista de productos y quiere saber si
puede consolidarla con un solo proveedor.

Por eso la página responde, en orden, a: *¿venden lo que necesito?* →
*¿cómo se pide?* → *¿cuándo llega?* → *¿a quién le escribo?*

---

## 2. Estructura y anclas

| # | Sección | Ancla | Fondo |
|---|---|---|---|
| 1 | Cabecera fija | `#inicio` | blanco translúcido |
| 2 | Hero | — | `--surface` |
| 3 | Barra de confianza | — | blanco |
| 4 | Categorías (4 tarjetas) | `#categorias` | `--surface` |
| 5 | Soluciones | `#soluciones` | blanco |
| 6 | Beneficios | `#beneficios` | `--ink-800` |
| 7 | Proceso (4 pasos) | `#proceso` | blanco |
| 8 | Logística | `#logistica` | `--surface` |
| 9 | Métricas | — | blanco |
| 10 | Compromiso | — | blanco |
| 11 | CTA | — | `--green-600` |
| 12 | Contacto + formulario | `#contacto` / `#formulario` | blanco |
| 13 | Pie | — | `--ink-900` |

`scroll-margin-top: 104px` en todos los `[id]` para que la cabecera fija no
tape el destino de un ancla.

---

## 3. Retícula

- Contenedor `.shell`: `max-width: 1200px`, padding lateral fluido de 16 a 40 px
  con `max(..., env(safe-area-inset-*))` para pantallas con muesca.
- Todas las columnas usan `minmax(0, Nfr)`, nunca `1fr` a secas: sin el `0` los
  textos largos revientan la retícula en lugar de romper de línea.
- Ritmo vertical por sección: `--sec-y` (60 → 112 px).

Cortes: ver `design-system/MASTER.md` §3.

---

## 4. Estados e interacciones

| Elemento | Disparo | Comportamiento |
|---|---|---|
| Cabecera | scroll > 8 px | `data-stuck="true"` → borde inferior y sombra de 1 px |
| Menú móvil | clic/Enter en hamburguesa | `aria-expanded` cambia, `hidden` se quita, icono pasa a X |
| Menú móvil | Escape | Se cierra y el foco vuelve al botón |
| Menú móvil | clic en un enlace | Se cierra solo por debajo de 900 px |
| Menú móvil | cruzar 900 px | Se sincroniza solo: en escritorio se quita `hidden` |
| Tarjeta de categoría | clic en **cualquier parte** de la tarjeta | Dispara el mismo desplegable. Se ignora si el clic cae en un enlace o control, o si hay texto seleccionado |
| Tarjeta de categoría | clic/Enter/Espacio en el disparador | Panel `hidden` ↔ visible, etiqueta «Ver los N productos» ↔ «Ocultar productos», chevron gira 180°. El botón hace `stopPropagation` para no disparar dos veces |
| Enlace de navegación | sección en pantalla | `aria-current="true"` + subrayado verde |
| Hero | carga de la página | Secuencia focal: barrido `clip-path` de la foto (700 ms) + subida escalonada del texto + aterrizaje de la tarjeta. Una vez, en CSS puro |
| Panel de categoría | abrir / cerrar | Altura real con `grid-template-rows 0fr ↔ 1fr`. 300 ms al abrir, 200 ms al cerrar |
| Menú móvil | abrir / cerrar | Baja 8 px desde la cabecera con desvanecido |
| Cualquier control | `:active` | Se hunde: `scale(.97)` botones, `.99` tarjetas, `.94` hamburguesa, `.92` flotante |
| Enlace de navegación | hover | El subrayado crece desde la izquierda (`scaleX`) |
| Campo de formulario | blur | Valida y muestra error si aplica |
| Campo de formulario | input | Revalida **solo** si ya estaba en error |
| Envío | submit | Valida todo, enfoca el primer error; si todo está bien compone un `mailto:` y publica un aviso en `role="status"` |

### 4.1 Por qué no hay revelado al hacer scroll

Lo hubo y se retiró. Aplicaba la misma subida con desvanecido a 27 bloques,
sección tras sección: no explicaba ningún estado, retrasaba la lectura y, por
depender de un listener, podía dejar contenido invisible si el navegador no
repintaba (pestaña en segundo plano, motor embebido, extensión que bloquea).

La regla que queda: **ningún bloque de esta página arranca en `opacity: 0`
esperando a que corra JavaScript.** La única entrada animada es la del hero, y
está declarada en CSS, así que ocurre aunque el script no cargue.

Ver la tesis de movimiento completa en `design-system/MASTER.md` §1.8.

---

## 5. Formulario de cotización

### 5.1 Campos

| Campo | Tipo | `autocomplete` | Obligatorio | Regla |
|---|---|---|---|---|
| Empresa | text | `organization` | Sí | ≥ 2 caracteres |
| Nombre de contacto | text | `name` | Sí | ≥ 2 caracteres |
| Correo corporativo | email | `email` | Sí | `algo@algo.dominio`, `spellcheck="false"` |
| Teléfono | tel | `tel` | No | `inputmode="tel"` |
| Categorías | checkbox ×4 | — | No | El `<label>` envuelve al control: un solo blanco de 44 px |
| Requerimiento | textarea | — | Sí | ≥ 10 caracteres |

### 5.2 Envío

Hoy el sitio es estático: al enviar se compone un `mailto:` a
`alejandracortesp91@gmail.com` con copia a `saul.0490@hotmail.com`, asunto
`Solicitud de cotización — <empresa>` y el cuerpo formateado.

**Para conectar un backend real** basta con sustituir el bloque final de
`form.addEventListener('submit', …)` en `assets/js/main.js` por un `fetch()` a
Formspree, Netlify Forms, Basin o un endpoint propio. La validación, el manejo
de errores y el aviso en `role="status"` ya están y se reutilizan tal cual.

### 5.3 Estados pendientes de implementar si se añade backend

- **Enviando**: deshabilitar el botón *después* de que arranque la petición y
  cambiar la etiqueta a «Enviando…» (con puntos suspensivos reales, `…`).
- **Éxito**: mensaje en `[data-status]` y limpieza del formulario.
- **Fallo de red**: mensaje con salida alterna (teléfono y WhatsApp), sin
  perder lo que la persona ya escribió.

---

## 6. Casos borde previstos

| Caso | Cómo responde |
|---|---|
| Nombre de categoría muy largo | `overflow-wrap: break-word` en título, resumen y grupos de la tarjeta |
| Correo largo en el pie y en contacto | `overflow-wrap: break-word`; la columna es `minmax(0,1fr)` |
| Sin JavaScript | Todo el contenido es visible; las tarjetas muestran el resumen; el formulario cae al `required` nativo del navegador |
| Imagen que no carga | El `alt` describe la escena; la caja no colapsa porque `width`/`height` reservan la proporción |
| Conexión lenta | Solo el hero es `fetchpriority="high"`; las otras dos fotos son `loading="lazy"` |
| Zoom al 200 % | La escala es fluida y los contenedores son `minmax(0,…)`: no hay scroll horizontal |
| `prefers-reduced-motion` | Se anulan transiciones y animaciones; el contenido se muestra directamente |
| Impresión | Se ocultan cabecera, CTA, botón flotante y enlace de salto |

---

## 7. Accesibilidad — puntos a no romper

- Un solo `<h1>`; jerarquía `h1 → h2 → h3` sin saltos (verificado).
- Landmarks: `header`, `nav` (×2, etiquetados), `main`, `footer`.
- Enlace de salto al contenido, visible al enfocarlo.
- Todo icono decorativo lleva `aria-hidden="true"` y `focusable="false"`.
- El botón de WhatsApp y la hamburguesa llevan `aria-label` (no tienen texto).
- Anillo de foco visible en **todo** lo interactivo, incluidos los campos: el
  `box-shadow` de foco **no sustituye** al contorno; ambos conviven.
- `role="status"` + `aria-live="polite"` en el aviso del formulario.
- El logotipo lleva `translate="no"` para que no lo traduzcan los navegadores.

Auditoría medida: `docs/ACCESIBILIDAD.md`.

---

## 8. Rendimiento

- 3 fotografías, 1.4 MB en total. **Antes de publicar**, convertir a WebP o AVIF
  y añadir `srcset` con anchos de 800/1200/1600 px. Es la mejora de mayor
  impacto pendiente.
- Tipografías: `preconnect` a Google Fonts + `preload` de la hoja + `display=swap`.
  Si se quiere quitar la dependencia externa, descargar los `.woff2` a
  `assets/fonts/` y declararlos con `@font-face`.
- CSS y JS sin dependencias ni build. El JS son ~8 KB sin minificar y va `defer`.
- El logotipo es SVG con trazados propios: no depende de que cargue una fuente.

---

## 9. Archivos

```
index.html                      página completa
assets/css/styles.css           sistema de estilos (22 bloques numerados)
assets/js/main.js               interacciones, sin dependencias
assets/img/maflo-logo.svg       lockup horizontal, texto en tinta
assets/img/maflo-logo-blanco.svg lockup para fondo oscuro
assets/img/maflo-isotipo.svg    solo los anillos
assets/img/favicon.svg          isotipo sobre cuadro navy
design-system/MASTER.md         tokens y componentes
docs/                           handoff, accesibilidad, contenido
```
