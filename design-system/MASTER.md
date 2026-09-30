# Sistema de diseño — MAFLO Comercializadora

Fuente de verdad del sitio. Todo lo que se agregue después debe salir de aquí.
Los valores viven en `assets/css/styles.css` como custom properties: **no se
escriben hex sueltos en el markup**.

- Patrón base: *Enterprise Gateway* (B2B, contacto comercial como conversión).
- Estilo: corporativo sobrio, apoyado en prueba de servicio y catálogo real.
- Paleta: derivada del mockup aprobado; los tres colores de marca vienen
  medidos del logotipo original.

---

## 1. Tokens

### 1.1 Color de marca (anillos del logotipo)

| Token | Hex | Uso |
|---|---|---|
| `--brand-cyan` | `#2FB3D2` | Solo dentro del logotipo |
| `--brand-gold` | `#F0D178` | Solo dentro del logotipo |
| `--brand-rose` | `#C63F66` | Solo dentro del logotipo |

> Estos tres colores **no se usan en la interfaz**. Son identidad, no UI.
> Mantenerlos exclusivos del logotipo es lo que hace que la marca se lea
> como marca y no como decoración.

### 1.2 Verde corporativo

| Token | Hex | Contraste sobre blanco | Uso permitido |
|---|---|---|---|
| `--green-400` | `#00A87B` | 3.05:1 ❌ | **Decorativo**: guiones de antetítulo, bordes, iconos sobre fondo oscuro. Nunca texto sobre claro. |
| `--green-600` | `#05865F` | 4.58:1 ✅ | Relleno de botones con texto blanco, acentos sólidos, anillo de foco |
| `--green-700` | `#046B4E` | 6.52:1 ✅ | Texto verde sobre claro, enlaces, hover de botón |

El verde del mockup (`#00A87B`) no alcanza 4.5:1 con texto blanco encima. Se
conserva como color de acento y se oscurece para todo lo que lleve texto.

### 1.3 Tinta y neutros

| Token | Hex | Uso |
|---|---|---|
| `--ink-900` | `#061E2B` | Fondo del pie |
| `--ink-800` | `#092B3D` | Sección oscura, botón primario, títulos |
| `--ink-700` | `#163647` | Tarjetas sobre sección oscura |
| `--text` | `#1E1E1E` | Texto corrido |
| `--muted` | `#46606D` | Texto secundario sobre claro (6.65:1) |
| `--muted-dark` | `#A9BFC9` | Texto secundario sobre oscuro (7.3:1) |
| `--line` | `#D5DDDF` | Bordes de campo de formulario |
| `--line-soft` | `#E6ECEC` | Bordes de tarjeta y separadores |
| `--line-dark` | `#22475A` | Bordes sobre oscuro |

### 1.4 Superficies

| Token | Hex | Uso |
|---|---|---|
| `--white` | `#FFFFFF` | Fondo base, tarjetas |
| `--surface` | `#F2F7F6` | Hero, secciones alternas, pasos |
| `--mint` | `#E8F7F2` | Fichas de icono, distintivos, estado del formulario |

### 1.5 Tipografía

| Token | Valor | Uso |
|---|---|---|
| `--font-display` | Lexend 300/400/500/600 | Títulos, botones, antetítulos, cifras |
| `--font-body` | Source Sans 3 400/600 | Texto corrido, formularios |

Escala fluida (`clamp`, sin media queries):

| Token | Rango | Peso | Interlineado |
|---|---|---|---|
| `--fs-display` | 40 → 68 px | 300 | 1.04 |
| `--fs-h2` | 29.6 → 46.4 px | 400 | 1.12 |
| `--fs-h3` | 17 px | 500 | 1.35 |
| `--fs-body` | 17 px (16 en móvil) | 400 | 1.65 |
| `--fs-sm` | 15 px | 400 | 1.55 |
| `--fs-xs` | 13 px | 400 | 1.6 |

Reglas: `text-wrap: balance` en títulos, `text-pretty` en párrafos guía,
`font-variant-numeric: tabular-nums` en cifras, ancho máximo de 56 ch en
párrafos guía y 44 ch en los textos de apoyo laterales.

### 1.6 Ritmo y forma

| Token | Valor |
|---|---|
| `--shell` | 1200 px |
| `--gutter` | 16 → 40 px |
| `--sec-y` | 60 → 112 px |
| `--radius` | 12 px (tarjetas, medios) |
| `--radius-sm` | 8 px (botones, campos, minitarjetas) |

### 1.7 Elevación

| Token | Uso |
|---|---|
| `--shadow-sm` | Reposo de tarjeta |
| `--shadow-md` | Hover de tarjeta, distintivos flotantes, botones |
| `--shadow-lg` | Imagen del hero, botón flotante de WhatsApp |

### 1.8 Movimiento

| Token | Valor | Para qué |
|---|---|---|
| `--dur-press` | 120 ms | Acuse de recibo de un clic |
| `--dur` | 200 ms | Cambio de estado rutinario |
| `--dur-state` | 300 ms | Apertura de un panel |
| `--dur-focal` | 700 ms | La entrada del hero, y nada más |
| `--ease-out` | `cubic-bezier(.16, 1, .3, 1)` | Salida exponencial: por defecto |
| `--ease` | `cubic-bezier(.32,.72,.28,1)` | Curva suave heredada, para casos con recorrido largo |

**Tesis de movimiento.** La página tiene **un solo momento con autoría**: la
entrada del hero. El resto del movimiento es respuesta al tacto y explicación
de estado. Nada se anima por decorar.

1. **Momento focal (una vez, al cargar).** La foto del almacén se descubre con
   `clip-path` de izquierda a derecha, siguiendo la dirección de lectura, como
   una cortina de nave que se abre. El texto sube escalonado cada 60 ms y la
   tarjeta flotante aterriza al final. Termina a los 860 ms. Es CSS puro: si el
   JavaScript falla, la entrada ocurre igual.
2. **Continuidad.** El panel de productos abre y cierra su altura real con
   `grid-template-rows: 0fr → 1fr`. Entra en 300 ms y sale en 200 ms: abrir es
   descubrir, cerrar es despachar. El menú móvil baja desde la cabecera.
3. **Retroalimentación.** Todo control se hunde al presionarse
   (`scale(.97)` en botones, `.99` en tarjetas, `.92` en el flotante).
   Sin eso la interfaz no confirma que escuchó.

**Lo que no hay, a propósito:** revelado al hacer scroll. Antes existía y
aplicaba la misma subida con desvanecido a 27 bloques en todas las secciones.
Eso no explicaba nada, retrasaba la lectura y arriesgaba dejar contenido
invisible si el listener no corría. Si alguien lo vuelve a proponer, la
pregunta es qué comunica; si la respuesta es «se ve bien», no entra.

Solo se animan `transform`, `opacity`, `clip-path` y `grid-template-rows`, más
color, borde y sombra en microinteracciones. Nunca `transition: all`.

Bajo `prefers-reduced-motion: reduce` se quita el desplazamiento pero **no la
señal**: el color, la opacidad y el hundido al presionar siguen vivos, porque
son información. La secuencia del hero ni siquiera se declara en ese modo.

### 1.9 Capas

`--z-skip: 60` › `--z-nav: 50` › `--z-float: 40`. No se usan valores fuera de
esta escala.

---

## 2. Componentes

### 2.1 `.btn`

| Variante | Fondo | Texto | Uso |
|---|---|---|---|
| `.btn--ink` | `--ink-800` | blanco | Acción de cabecera y sobre fondo verde |
| `.btn--green` | `--green-600` | blanco | Acción principal del hero y del formulario |
| `.btn--lg` | — | — | Modificador de tamaño (52 px de alto) |

| Estado | Comportamiento |
|---|---|
| Reposo | Altura mínima 44 px (52 en `--lg`), icono de flecha a la derecha |
| Hover | Fondo un escalón más oscuro + `--shadow-md`, sin desplazamiento |
| Foco | Contorno sólido 3 px `--green-600`, separación 3 px |
| Deshabilitado | `opacity: .55`, cursor `not-allowed`, sin sombra |

Accesibilidad: elemento `<a>` cuando navega, `<button>` cuando actúa. Los
iconos llevan `aria-hidden="true"` y `focusable="false"`.

### 2.2 `.card` (categoría)

Composición: ficha de icono + distintivo opcional → título → filete →
resumen de productos → panel desplegable → disparador.

| Estado | Comportamiento |
|---|---|
| Reposo | Borde `--line-soft`, `--shadow-sm` |
| Hover | Borde `--green-400` + `--shadow-md` (sin `scale`, no desplaza el layout) |
| Destacada | `.card--featured`: borde `--green-600` + distintivo «Más solicitada» |
| Expandida | `aria-expanded="true"`, panel visible, etiqueta pasa a «Ocultar productos» |
| Sobre oscuro | `.card--dark`: fondo `--ink-700`, borde `--line-dark` |

**Blanco de clic:** toda la tarjeta acciona el desplegable, no solo el
disparador. La tarjeta ya se ve pulsable por su estado hover, así que ese es el
blanco que la gente intenta primero — confirmado con uso real. El `<button>`
sigue siendo el control real para teclado y lector de pantalla; el clic en la
tarjeta simplemente lo dispara, respetando enlaces internos y selección de
texto. La clase `.is-clickable` (y con ella el `cursor: pointer`) la pone
`main.js`: sin JS no se anuncia un cursor que no lleva a ninguna parte.

Teclado: el disparador es un `<button>` real con `aria-expanded` y
`aria-controls`; responde a Enter y Espacio. El panel usa el atributo `hidden`
y **`.card__more[hidden] { display: none }`** — sin esa regla el `display: grid`
del autor gana al `hidden` del navegador y el panel nunca se cierra.

### 2.3 `.chip` (ficha de icono)

34 px (40 en `--lg`), fondo `--mint`, trazo `--green-700` de 1.7 px sobre una
retícula de 24×24. Variante `--dark` para sección oscura: fondo verde al 14 %,
trazo `--green-400`. Siempre `aria-hidden`: nunca carga información única.

### 2.4 `.field` (campo de formulario)

| Estado | Visual |
|---|---|
| Reposo | Borde `--line`, alto mínimo 48 px |
| Hover | Borde `#B9C6C9` |
| Foco | Borde `--green-600` + halo de 3 px al 16 % |
| Foco por teclado | Además contorno sólido de 3 px (`:focus-visible`) |
| Error | Borde `#B3261E` + mensaje de 13 px debajo, `aria-invalid="true"` |

El mensaje de error se enlaza con `aria-describedby`. Al enviar, el foco salta
al primer campo inválido. La validación se relaja en `input` solo si el campo
ya estaba marcado como inválido, para no regañar mientras se escribe.

### 2.5 `.step`, `.stat`, `.minicard`, `.quote`

Piezas de una sola variante. Comparten `--radius`, `--line-soft` y la escala
tipográfica; no tienen estados interactivos.

---

## 3. Retícula y cortes responsivos

| Corte | Cambios |
|---|---|
| > 1080 px | 4 columnas en tarjetas y pasos; `split` a 2 columnas; cabecera horizontal |
| ≤ 1080 px | Tarjetas y pasos a 2 columnas; pie a 2 columnas |
| ≤ 900 px | Menú hamburguesa; `split` y `section__head` a 1 columna; barra de confianza apilada; métricas 2×2 |
| ≤ 640 px | Todo a 1 columna; cuerpo a 16 px; tarjeta del hero pasa a flujo normal; botón del CTA a ancho completo |

Ningún ancho produce scroll horizontal (verificado a 390 px y 1440 px).

---

## 4. Antipatrones — no hacer

| ❌ | ✅ |
|---|---|
| `#00A87B` con texto blanco encima | `--green-600` |
| Emoji como icono | SVG de 24×24 con trazo de 1.7–2 px |
| `transform: scale()` en hover de tarjeta | Cambio de borde y sombra |
| Hex sueltos en el markup | Tokens de `:root` |
| Contenido que solo aparece si dispara un observador | Revelado con red de seguridad (ver `main.js`) |
| Barra fija pegada a `top: 0` sin estado | Cabecera con `data-stuck` al pasar de 8 px |
| Testimonios inventados | Compromiso de servicio textual del folleto |

---

## 5. Contenido que no se inventa

Cifras, productos y datos de contacto salen del folleto original de la empresa.
Antes de publicar una cifra nueva (años de operación, número de clientes,
porcentaje de entregas completas) debe confirmarla MAFLO. Ver `docs/CONTENIDO.md`.
