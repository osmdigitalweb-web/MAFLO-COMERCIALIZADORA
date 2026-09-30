# Auditoría de accesibilidad — Landing MAFLO

**Estándar:** WCAG 2.1 AA · **Fecha:** 2026-09-30
**Método:** medición automatizada sobre la página renderizada (Chromium headless,
1440×900 y 390×844) más recorrido manual por teclado.

---

## Resumen

| | |
|---|---|
| Fallos de contraste | **0** (de 118 nodos de texto evaluados, en ambos anchos) |
| Encabezados | 1 `<h1>`, jerarquía sin saltos |
| Campos sin etiqueta | **0** |
| Imágenes sin `alt` | **0** |
| Landmarks | `header` 1 · `nav` 2 (ambos etiquetados) · `main` 1 · `footer` 1 |
| Scroll horizontal | Ninguno a 390 px ni a 1440 px |
| Errores de consola | 0 · Peticiones fallidas: 0 |

**Críticos: 0 · Mayores: 0 · Menores: 1** (ver §5).

---

## 1. Perceptible

| # | Criterio | Resultado |
|---|---|---|
| 1.1.1 | Contenido no textual | ✅ Las 3 fotografías tienen `alt` descriptivo; los 24 iconos decorativos llevan `aria-hidden="true"` |
| 1.3.1 | Información y estructura | ✅ Secciones con `aria-labelledby`, listas reales, `<figure>/<figcaption>`, `<blockquote>` |
| 1.4.3 | Contraste de texto | ✅ 0 fallos medidos |
| 1.4.11 | Contraste de componentes | ✅ Bordes de campo `#D5DDDF` sobre blanco y anillo de foco `#05865F` superan 3:1 |
| 1.4.4 | Redimensionar texto | ✅ Escala fluida con `clamp`; sin `maximum-scale` ni `user-scalable=no` |
| 1.4.10 | Reajuste (320 px) | ✅ Verificado a 390 px sin desbordes |

### Contraste — pares principales medidos

| Elemento | Frente | Fondo | Ratio | Mínimo | |
|---|---|---|---|---|---|
| Texto corrido | `#1E1E1E` | `#FFFFFF` | 16.1:1 | 4.5 | ✅ |
| Texto secundario | `#46606D` | `#FFFFFF` | 6.65:1 | 4.5 | ✅ |
| Títulos | `#092B3D` | `#FFFFFF` | 14.7:1 | 4.5 | ✅ |
| Antetítulo verde | `#046B4E` | `#F2F7F6` | 6.2:1 | 4.5 | ✅ |
| Botón principal | `#FFFFFF` | `#05865F` | 4.58:1 | 4.5 | ✅ |
| Botón oscuro | `#FFFFFF` | `#092B3D` | 14.7:1 | 4.5 | ✅ |
| Texto sobre sección oscura | `#A9BFC9` | `#092B3D` | 7.3:1 | 4.5 | ✅ |
| Acento verde sobre oscuro | `#00A87B` | `#092B3D` | 4.84:1 | 4.5 | ✅ |
| Error de formulario | `#B3261E` | `#FFFFFF` | 6.4:1 | 4.5 | ✅ |

> **Decisión de diseño registrada.** El verde del mockup, `#00A87B`, da 3.05:1
> sobre blanco: no sirve para texto ni para botón con texto blanco. Se conservó
> como acento decorativo (`--green-400`) y se crearon `--green-600` (4.58:1) para
> rellenos con texto y `--green-700` (6.52:1) para texto verde. Visualmente el
> cambio es casi imperceptible; en cumplimiento es la diferencia entre pasar y no.

---

## 2. Operable

| # | Criterio | Resultado |
|---|---|---|
| 2.1.1 | Teclado | ✅ Verificado: hamburguesa abre con Enter, cierra con Escape y devuelve el foco; las 4 tarjetas expanden con Enter/Espacio |
| 2.1.2 | Sin trampas de foco | ✅ No hay modales ni capturas de foco |
| 2.4.1 | Saltar bloques | ✅ Enlace «Saltar al contenido principal», visible al enfocar |
| 2.4.3 | Orden del foco | ✅ El orden del DOM coincide con el visual; no se usa `tabindex` positivo |
| 2.4.7 | Foco visible | ✅ Contorno sólido de 3 px con 3 px de separación en todo lo interactivo, campos incluidos |
| 2.5.3 | Etiqueta en el nombre | ✅ El texto visible del botón coincide con su nombre accesible |

### Recorrido por teclado verificado

| Elemento | Tab | Enter / Espacio | Escape |
|---|---|---|---|
| Enlace de salto | 1.º, aparece al enfocar | Va a `#contenido` | — |
| Logotipo | 2.º | Va a `#inicio` | — |
| Enlaces de navegación | 3.º–7.º | Navegan al ancla | — |
| Hamburguesa (móvil) | tras el logotipo | Abre/cierra, `aria-expanded` cambia | Cierra y devuelve el foco |
| Disparador de tarjeta | en orden de lectura | Expande/colapsa, la etiqueta cambia | — |
| Campos del formulario | en orden visual | — | — |
| Enviar | último del formulario | Valida y enfoca el primer error | — |

---

## 3. Comprensible

| # | Criterio | Resultado |
|---|---|---|
| 3.1.1 | Idioma de la página | ✅ `lang="es-MX"` |
| 3.2.1 | Al recibir el foco | ✅ Enfocar no dispara ningún cambio de contexto |
| 3.2.2 | Al introducir datos | ✅ Escribir no envía ni navega |
| 3.3.1 | Identificación de errores | ✅ Mensaje en texto junto al campo + `aria-invalid="true"` + `aria-describedby` |
| 3.3.2 | Etiquetas e instrucciones | ✅ Todo campo con `<label for>`; los opcionales lo dicen; los ejemplos van en `placeholder`, nunca como etiqueta |
| 3.3.3 | Sugerencia ante error | ✅ Los mensajes dicen qué hacer, no solo qué falló («Revisa el formato del correo. Ejemplo: compras@empresa.com») |

---

## 4. Robusto

| # | Criterio | Resultado |
|---|---|---|
| 4.1.2 | Nombre, rol, valor | ✅ `<button>` para acciones y `<a>` para navegación; `aria-expanded` + `aria-controls` en los desplegables; `aria-label` en los dos controles sin texto |
| 4.1.3 | Mensajes de estado | ✅ El aviso del formulario usa `role="status"` con `aria-live="polite"` |

---

## 5. Hallazgo menor abierto

| Severidad | Hallazgo | Estado |
|---|---|---|
| 🟢 Menor | Los enlaces de teléfono y correo del bloque de contacto y del pie medían 20 px de alto | **Corregido**: pasan a `inline-block` con 8 px de relleno vertical (≈ 36 px). Los enlaces dentro de un párrafo (p. ej. «escríbenos por WhatsApp») se dejaron como están: el criterio de tamaño de objetivo exceptúa expresamente los enlaces en línea dentro de un bloque de texto. |

El tamaño de objetivo táctil (2.5.5) es **AAA** en WCAG 2.1, no AA, así que
nada de lo anterior era un incumplimiento del estándar declarado. Se ajustó
por usabilidad en móvil.

---

## 6. Qué falta por probar (no automatizable)

1. **Lector de pantalla real** — NVDA en Windows y VoiceOver en iOS. La
   medición cubre la estructura, pero no cómo suena de corrido.
2. **Navegación por voz** — comprobar que «hacer clic en Cotizar Ahora»
   funciona con Voice Control / Dragon.
3. **Zoom al 400 %** con reflow, en un equipo real.
4. **Contraste percibido bajo luz directa** — el `--muted` (6.65:1) es correcto
   en la norma, pero conviene confirmarlo en un teléfono a pleno sol, que es
   donde se va a ver el sitio en obra o en almacén.

---

## 7. Cómo repetir la medición

Con el sitio servido en `http://127.0.0.1:5178`:

```bash
node ~/.claude/skills/browser-automation/browser.mjs http://127.0.0.1:5178/ --script ./audit.mjs
```

El guion mide contraste real de cada nodo de texto contra su fondo pintado,
tamaños de objetivo, jerarquía de encabezados, etiquetas de formulario y
landmarks, en escritorio y en móvil.
